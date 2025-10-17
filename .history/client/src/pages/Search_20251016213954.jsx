// client/src/pages/Search.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { searchCourses } from "../utils/api.js";

/** (아이콘만 필요) */
const ICON = {
  search: "/img/dot_icon.png",
  week: "/img/clock.png",
  people: "/img/jobs.png",
};

/* 공통 필터 박스 */
function FilterBox({ label, children }) {
  return (
    <label className="text-[13px]">
      <div className="mb-1 text-[#7A8292]">{label}</div>
      {children}
    </label>
  );
}

export default function Search() {
  const nav = useNavigate();
  const loc = useLocation();

  // 필터 상태
  const [q, setQ] = useState("");
  const [category, setCategory] = useState(""); // 서버에는 보내지 않지만 URL 보존용
  const [org, setOrg] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [teacher, setTeacher] = useState(""); // UI 유지용
  const [freeOnly, setFreeOnly] = useState(false);
  const [certOnly, setCertOnly] = useState(false);

  // 서버 결과
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const size = 12;
  const [loading, setLoading] = useState(false);

  /** URL → 상태 복원 */
  useEffect(() => {
    const p = new URLSearchParams(loc.search);
    setQ(p.get("q") || "");
    setCategory(p.get("category") || "");
    setOrg(p.get("uni") || "");
    setLevel(p.get("level") || "");
    setLanguage(p.get("lang") || "");
    setPage(Number(p.get("page") || 1));
  }, [loc.search]);

  /** 상태 → URL 동기화 */
  const pushQuery = (nextPage = 1) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (category) p.set("category", category);
    if (org) p.set("uni", org);
    if (level) p.set("level", level);
    if (language) p.set("lang", language);
    p.set("page", String(nextPage));
    p.set("size", String(size));
    p.set("sort", "latest");
    nav({ pathname: "/search", search: p.toString() }, { replace: true });
  };

  /** 서버 검색 실행 */
  const runSearch = async (nextPage = 1) => {
    setLoading(true);
    try {
      const data = await searchCourses({
        q,
        page: nextPage,
        size,
        lang: language,
        level,
        uni: org,
        sort: "latest",
      });
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (e) {
      console.error(e);
      setItems([]); setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  /** URL이 바뀔 때마다 서버 호출 */
  useEffect(() => {
    const p = new URLSearchParams(loc.search);
    const curPage = Number(p.get("page") || 1);
    runSearch(curPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc.search]);

  const reset = () => {
    setQ(""); setCategory(""); setOrg(""); setLevel(""); setLanguage(""); setTeacher("");
    setFreeOnly(false); setCertOnly(false);
    pushQuery(1);
  };

  const goResult = () => pushQuery(1);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* 브레드크럼 & 카운트 */}
      <div className="max-w-[1120px] mx-auto px-5 pt-6">
        <div className="text-[13px] text-[#8B95A1] flex items-center gap-2">
          <Link to="/" className="hover:underline">돌아가기</Link>
          <span>›</span>
          <span className="text-[#111827]">'강좌'에 대한 검색 결과</span>
        </div>

        <div className="mt-2 text-sm text-[#6B7280]">
          총 <b className="text-[#111827]">{total || items.length}</b>개의 강좌
        </div>
      </div>

      {/* 정렬 (모양) */}
      <div className="max-w-[1120px] mx-auto px-5 mt-2 flex justify-end">
        <select className="h-9 rounded-lg border border-[#E5E7EB] px-2 text-sm text-[#374151]">
          <option>최신순</option>
          <option>인기순</option>
          <option>평점순</option>
        </select>
      </div>

      {/* 필터 패널 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-4">
        <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(16,24,40,.06)] p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FilterBox label="카테고리">
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3 focus:outline-none">
                <option value="">카테고리 선택</option>
                <option>인문학</option>
                <option>자연과학</option>
                <option>공학</option>
                <option>컴퓨터과학</option>
              </select>
            </FilterBox>

            <FilterBox label="교육기관">
              <input value={org} onChange={(e) => setOrg(e.target.value)}
                placeholder="교육기관명"
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3 focus:outline-none" />
            </FilterBox>

            <FilterBox label="난이도">
              <select value={level} onChange={(e) => setLevel(e.target.value)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option value="">난이도 선택</option>
                <option>입문</option>
                <option>중급</option>
                <option>고급</option>
              </select>
            </FilterBox>

            <FilterBox label="강좌 기간">
              <select className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option>기간 선택</option>
                <option>4~8주</option>
                <option>9~16주</option>
              </select>
            </FilterBox>

            <FilterBox label="강의 언어">
              <select value={language} onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option value="">언어 선택</option>
                <option>한국어</option>
                <option>영어</option>
              </select>
            </FilterBox>

            <FilterBox label="강사명">
              <input value={teacher} onChange={(e) => setTeacher(e.target.value)}
                placeholder="강사명"
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3" />
            </FilterBox>

            <FilterBox label="검색어">
              <div className="relative">
                <img
                  src={ICON.search}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70"
                  alt=""
                />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="찾고 싶은 강좌를 검색해보세요"
                  className="w-full h-10 pl-9 rounded-lg border border-[#E5E7EB] px-3"
                />
              </div>
            </FilterBox>

            <div className="flex items-center gap-4 mt-2 md:mt-8">
              <label className="inline-flex items-center gap-2 text-[13px]">
                <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} />
                무료 강좌
              </label>
              <label className="inline-flex items-center gap-2 text-[13px]">
                <input type="checkbox" checked={certOnly} onChange={(e) => setCertOnly(e.target.checked)} />
                수료증 제공
              </label>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={reset}
              className="px-4 h-10 rounded-lg border border-[#E5E7EB] text-[#374151] text-sm hover:bg-[#F3F4F6]"
            >
              초기화
            </button>
            <button
              onClick={goResult}
              className="px-5 h-10 rounded-lg bg-[#121417] text-white text-sm shadow hover:brightness-110"
            >
              세부 검색 실행
            </button>
          </div>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-8 pb-16">
        <div id="results" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && <div className="col-span-full text-center text-sm text-[#6B7280]">불러오는 중…</div>}

          {!loading && items.map((c) => (
            <CourseCard
              key={c.slug}
              course={{
                title: c.title,
                org: (c.teacher && c.teacher.includes(" · ")) ? c.teacher.split(" · ")[1] : c.teacher || "",
                badge: [],
                rating: Number(c.rating || 4.6),
                votes: "1.2만+",
                period: c.weeks || "14주",
                peopleText: (c.students || "23,000명").replace("명",""),
                imageUrl: c.image,
              }}
              onClick={() => nav(`/course/${c.slug}`)}
            />
          ))}
        </div>

        {/* 페이지네이션(모양) */}
        <div className="mt-10 flex items-center justify-center gap-1 text-[13px]">
          <button
            className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]"
            onClick={() => pushQuery(Math.max(1, page - 1))}
          >‹</button>
          {[page - 1, page, page + 1].filter(n => n >= 1).map((n) => (
            <button
              key={n}
              onClick={() => pushQuery(n)}
              className={`w-8 h-8 rounded-md ${n === page ? "bg-[#121417] text-white" : "hover:bg-[#EEF2F7]"}`}
            >
              {n}
            </button>
          ))}
          <button
            className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]"
            onClick={() => pushQuery(page + 1)}
          >›</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- 카드 (UI는 유지, imageUrl 지원) ---------- */
function CourseCard({ course, onClick }) {
  const { title, org, badge, rating, votes, period, peopleText, imageUrl } = course;

  return (
    <div
      onClick={onClick}
      role="button"
      aria-label={`${title} 상세 보기`}
      className="group cursor-pointer rounded-2xl bg-white shadow-[0_10px_26px_rgba(16,24,40,.08)]
                 transition-transform duration-300 hover:scale-[1.05] will-change-transform"
    >
      {/* 썸네일 */}
      <div className="relative rounded-2xl rounded-b-none overflow-hidden aspect-[16/9] bg-[#F2F4F8]">
        <img
          src={imageUrl || "/img/seed.png"}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {/* 좌측 상단 보라 배지(필요 시 사용) */}
        {badge?.[0] && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#6A56FF] text-white text-[12px] font-semibold h-7 px-3 shadow-[0_6px_16px_rgba(16,24,40,.18)]">
            {badge[0]}
          </div>
        )}
      </div>

      {/* 본문 */}
      <div className="p-5">
        <div className="text-[15px] text-[#8B95A1]">{org}</div>
        <div className="mt-1 text-[18px] font-bold text-[#101828] leading-snug">
          {title}
        </div>

        <div className="mt-3 flex items-center gap-6 text-[13px] text-[#6B7686]">
          <span className="inline-flex items-center gap-1">
            <img src={ICON.week} className="w-[14px] h-[14px] opacity-70" alt="" />
            {period}
          </span>
          <span className="inline-flex items-center gap-1">
            <img src={ICON.people} className="w-[14px] h-[14px] opacity-70" alt="" />
            {peopleText} 학생
          </span>
        </div>

        {/* 평점 */}
        <div className="mt-3 flex items-center gap-1 text-[13px] text-[#6B7686]">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="#F8B84A" aria-hidden="true">
            <path d="M10 15.27l-5.18 3.05 1.58-5.36L1.82 8.9l5.47-.4L10 3.5l2.71 4.99 5.47.4-4.58 4.06 1.58 5.36z" />
          </svg>
          <span className="font-semibold text-[#374151]">{rating.toFixed(1)}</span>
          <span className="text-[#9CA3AF]">· {votes}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1">
            {badge?.slice(0, 3).map((b) => (
              <span
                key={b}
                className="px-2 h-7 rounded-md bg-[#F3F6FF] text-[#4450FF] text-[12px] inline-flex items-center"
              >
                {b}
              </span>
            ))}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="px-4 h-10 rounded-lg bg-[#2C6BFF] text-white text-sm font-semibold hover:brightness-110"
          >
            수강신청
          </button>
        </div>
      </div>
    </div>
  );
}
