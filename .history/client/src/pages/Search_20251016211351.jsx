// client/src/pages/Search.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { searchCourses } from "../utils/api.js";

/** 로컬 이미지 매핑(썸네일이 없을 때 대체) */
const IMG = {
  cloud: "/img/cloud.png",
  human: "/img/human.png",
  battery: "/img/battery.png",
  pandas: "/img/pandas.png",
  react: "/img/react.png",
  data: "/img/data.png",
  block: "/img/block.png",
  deep: "/img/deep.png",
  seed: "/img/seed.png",
  alfago: "/img/alfago.png",
  pyton_data: "/img/pyton_data.png",
};

/** 카드용 작은 아이콘 */
const ICON = {
  week: "/img/clock.png",
  people: "/img/jobs.png",
  search: "/img/dot_icon.png",
};

/** 더미(디자인 유지용) – API 실패/빈결과 시만 사용 */
const FALLBACK = [
  { slug: "cloud-sec", title: "클라우드 보안 엔지니어 실무과정", org: "한동대학교", badge: ["보안", "클라우드"], period: "14주", peopleText: "23,000명", rating: 4.9, votes: "1.2만+", img: "cloud" },
  { slug: "human-under", title: "인류학의 이해", org: "전북대학교", badge: ["인문학"], period: "14주", peopleText: "23,000명", rating: 4.6, votes: "9.8천+", img: "human" },
  { slug: "battery-sys", title: "전기자동차 배터리 시스템", org: "한국폴리텍", badge: ["전기", "배터리"], period: "14주", peopleText: "23,000명", rating: 4.7, votes: "6.5천+", img: "battery" },
  { slug: "pandas-basic", title: "Python 및 Pandas 활용 데이터 분석 기초 과정", org: "부산대학교", badge: ["데이터 과학"], period: "14주", peopleText: "23,000명", rating: 4.6, votes: "5.2천+", img: "pandas" },
  { slug: "react-advanced", title: "리액트 고급 개발", org: "서울대학교", badge: ["웹 · 프론트"], period: "14주", peopleText: "23,000명", rating: 4.8, votes: "9.8천+", img: "react" },
  { slug: "dataviz-master", title: "데이터 시각화 마스터클래스", org: "연세대학교", badge: ["데이터분석"], period: "14주", peopleText: "23,000명", rating: 4.7, votes: "6.5천+", img: "data" },
  { slug: "block-basic", title: "블록체인 기초부터 실무", org: "한양대학교", badge: ["블록체인"], period: "14주", peopleText: "23,000명", rating: 4.6, votes: "5.2천+", img: "block" },
  { slug: "dl-nn", title: "신경망 및 딥러닝", org: "고려대학교", badge: ["딥러닝"], period: "14주", peopleText: "23,000명", rating: 4.9, votes: "12.4천+", img: "deep" },
  { slug: "bio-ai", title: "생체데이터와 인공지능의 이해", org: "중앙대학교", badge: ["바이오 · AI"], period: "14주", peopleText: "23,000명", rating: 4.6, votes: "5.9천+", img: "seed" },
];

/** 제목에 따라 대체 이미지 추측 */
function guessImage(title = "") {
  const t = title.toLowerCase();
  if (t.includes("react")) return IMG.react;
  if (t.includes("pandas")) return IMG.pandas;
  if (t.includes("데이터") || t.includes("data")) return IMG.data;
  if (t.includes("딥러닝") || t.includes("deep")) return IMG.deep;
  if (t.includes("클라우드")) return IMG.cloud;
  if (t.includes("블록체인")) return IMG.block;
  if (t.includes("배터리")) return IMG.battery;
  return IMG.alfago;
}

/* 공통 필터 라벨 */
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
  const [sp, setSp] = useSearchParams();

  // URL → 상태 초기화
  const [q, setQ] = useState(sp.get("q") || "");
  const [category, setCategory] = useState(sp.get("category") || "");
  const [org, setOrg] = useState(sp.get("uni") || "");
  const [level, setLevel] = useState(sp.get("level") || "");
  const [language, setLanguage] = useState(sp.get("lang") || "");
  const [teacher, setTeacher] = useState(sp.get("teacher") || "");
  const [freeOnly, setFreeOnly] = useState(sp.get("free") === "1");
  const [certOnly, setCertOnly] = useState(sp.get("cert") === "1");
  const page = Number(sp.get("page") || 1);
  const size = Number(sp.get("size") || 12);
  const sort = sp.get("sort") || "latest";

  // 결과 상태
  const [items, setItems] = useState([]); // API 결과
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // URL 변경 시 자동 fetch
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { items, total } = await searchCourses({
          q: sp.get("q") || "",
          category: sp.get("category") || "",
          uni: sp.get("uni") || "",
          level: sp.get("level") || "",
          lang: sp.get("lang") || "",
          page: Number(sp.get("page") || 1),
          size: Number(sp.get("size") || 12),
          sort: sp.get("sort") || "latest",
        });
        setItems(items || []);
        setTotal(total || 0);
      } catch (e) {
        console.warn("API 실패 – 더미 데이터 사용", e);
        setItems([]);   // API 실패시 FALLBACK로 렌더
        setTotal(FALLBACK.length);
      } finally {
        setLoading(false);
      }
    })();
  }, [sp]);

  const dataToShow = items.length ? items : FALLBACK;

  // “세부 검색 실행” → URL 업데이트(= 자동 fetch 트리거)
  const applySearch = () => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (category) p.set("category", category);
    if (org) p.set("uni", org);
    if (level) p.set("level", level);
    if (language) p.set("lang", language);
    if (teacher) p.set("teacher", teacher);
    if (freeOnly) p.set("free", "1");
    if (certOnly) p.set("cert", "1");
    p.set("sort", sort);
    p.set("page", "1");
    p.set("size", String(size));
    setSp(p, { replace: false });
  };

  const reset = () => {
    setQ(""); setCategory(""); setOrg(""); setLevel(""); setLanguage("");
    setTeacher(""); setFreeOnly(false); setCertOnly(false);
    setSp(new URLSearchParams({ sort: "latest", page: "1", size: String(size) }));
  };

  const goPage = (n) => {
    const p = new URLSearchParams(sp);
    p.set("page", String(n));
    setSp(p, { replace: false });
  };

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
          총 <b className="text-[#111827]">{items.length ? total : FALLBACK.length}</b>개의 강좌
        </div>
      </div>

      {/* 정렬 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-2 flex justify-end">
        <select
          value={sort}
          onChange={(e) => {
            const p = new URLSearchParams(sp);
            p.set("sort", e.target.value);
            setSp(p, { replace: false });
          }}
          className="h-9 rounded-lg border border-[#E5E7EB] px-2 text-sm text-[#374151]"
        >
          <option value="latest">최신순</option>
          <option value="popular">인기순</option>
          <option value="rating">평점순</option>
        </select>
      </div>

      {/* 필터 패널 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-4">
        <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(16,24,40,.06)] p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FilterBox label="카테고리">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option value="">카테고리 선택</option>
                <option>인문학</option><option>자연과학</option><option>공학</option><option>컴퓨터과학</option>
              </select>
            </FilterBox>

            <FilterBox label="교육기관">
              <input value={org} onChange={(e) => setOrg(e.target.value)} placeholder="교육기관명"
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3" />
            </FilterBox>

            <FilterBox label="난이도">
              <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option value="">난이도 선택</option>
                <option>입문</option><option>중급</option><option>고급</option>
              </select>
            </FilterBox>

            <FilterBox label="강좌 기간">
              <select className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option>기간 선택</option><option>4~8주</option><option>9~16주</option>
              </select>
            </FilterBox>

            <FilterBox label="강의 언어">
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option value="">언어 선택</option><option>한국어</option><option>영어</option>
              </select>
            </FilterBox>

            <FilterBox label="강사명">
              <input value={teacher} onChange={(e) => setTeacher(e.target.value)} placeholder="강사명"
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3" />
            </FilterBox>

            <FilterBox label="검색어">
              <div className="relative">
                <img src={ICON.search} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70" alt="" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="찾고 싶은 강좌를 검색해보세요"
                  className="w-full h-10 pl-9 rounded-lg border border-[#E5E7EB] px-3" />
              </div>
            </FilterBox>

            <div className="flex items-center gap-4 mt-2 md:mt-8">
              <label className="inline-flex items-center gap-2 text-[13px]">
                <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} /> 무료 강좌
              </label>
              <label className="inline-flex items-center gap-2 text-[13px]">
                <input type="checkbox" checked={certOnly} onChange={(e) => setCertOnly(e.target.checked)} /> 수료증 제공
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <button onClick={reset} className="px-4 h-10 rounded-lg border border-[#E5E7EB] text-[#374151] text-sm hover:bg-[#F3F4F6]">초기화</button>
            <button onClick={applySearch} className="px-5 h-10 rounded-lg bg-[#121417] text-white text-sm shadow hover:brightness-110">세부 검색 실행</button>
          </div>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-8 pb-16">
        {loading && <div className="text-center text-[#6B7280]">검색 중…</div>}

        <div id="results" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataToShow.map((c, idx) => (
            <CourseCard
              key={c.slug || idx}
              course={{
                title: c.title,
                org: c.university || c.org || (c.teacher?.split("·")[1]?.trim() ?? "기관미상"),
                badge: c.badge || [],
                rating: Number(c.rating || 4.6),
                votes: c.votes || "1.2만+",
                period: c.weeks || c.period || "14주",
                peopleText: (c.students || c.peopleText || "23,000명").replace("명", ""),
                img: c.image ? c.image : guessImage(c.title),
              }}
              onClick={() => nav(`/course/${c.slug || "kocw-" + idx}`)}
            />
          ))}
        </div>

        {/* 페이지네이션 (모양 + 동작) */}
        <div className="mt-10 flex items-center justify-center gap-1 text-[13px]">
          <button className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]" onClick={() => goPage(Math.max(1, page - 1))}>‹</button>
          {[page - 1, page, page + 1].filter((n) => n > 0).map((n) => (
            <button key={n} onClick={() => goPage(n)}
              className={`w-8 h-8 rounded-md ${n === page ? "bg-[#121417] text-white" : "hover:bg-[#EEF2F7]"}`}>
              {n}
            </button>
          ))}
          <button className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]" onClick={() => goPage(page + 1)}>›</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- 카드 ---------- */
function CourseCard({ course, onClick }) {
  const { title, org, badge, rating, votes, period, peopleText, img } = course;
  const thumb = img?.startsWith("/img/") || img?.startsWith("data:")
    ? img
    : (img || guessImage(title));

  return (
    <div
      onClick={onClick}
      role="button"
      aria-label={`${title} 상세 보기`}
      className="group cursor-pointer rounded-2xl bg-white shadow-[0_10px_26px_rgba(16,24,40,.08)] transition-transform duration-300 hover:scale-[1.05] will-change-transform"
    >
      <div className="relative rounded-2xl rounded-b-none overflow-hidden aspect-[16/9] bg-[#F2F4F8]">
        <img src={thumb} alt="" loading="lazy" className="w-full h-full object-cover" />
        {badge?.[0] && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#6A56FF] text-white text-[12px] font-semibold h-7 px-3 shadow-[0_6px_16px_rgba(16,24,40,.18)]">
            {badge[0]}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="text-[15px] text-[#8B95A1]">{org || "기관미상"}</div>
        <div className="mt-1 text-[18px] font-bold text-[#101828] leading-snug">{title}</div>

        <div className="mt-3 flex items-center gap-6 text-[13px] text-[#6B7686]">
          <span className="inline-flex items-center gap-1">
            <img src={ICON.week} className="w-[14px] h-[14px] opacity-70" alt="" />{period}
          </span>
          <span className="inline-flex items-center gap-1">
            <img src={ICON.people} className="w-[14px] h-[14px] opacity-70" alt="" />{peopleText} 학생
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1 text-[13px] text-[#6B7686]">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="#F8B84A" aria-hidden="true">
            <path d="M10 15.27l-5.18 3.05 1.58-5.36L1.82 8.9l5.47-.4L10 3.5l2.71 4.99 5.47.4-4.58 4.06 1.58 5.36z" />
          </svg>
          <span className="font-semibold text-[#374151]">{Number(rating || 4.6).toFixed(1)}</span>
          <span className="text-[#9CA3AF]">· {votes || "1.2만+"}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1">
            {badge?.slice(0, 3).map((b) => (
              <span key={b} className="px-2 h-7 rounded-md bg-[#F3F6FF] text-[#4450FF] text-[12px] inline-flex items-center">{b}</span>
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
