// client/src/pages/Search.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { searchCourses } from "../utils/api.js";
import CourseCard from "../shared/CourseCard.jsx";

const ICON = { search: "/img/dot_icon.png" };

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

  // 화면 상태 (UI 그대로)
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [org, setOrg] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [teacher, setTeacher] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);
  const [certOnly, setCertOnly] = useState(false);

  // 결과
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const size = 12;
  const [loading, setLoading] = useState(false);

  // URL -> 상태 복원
  useEffect(() => {
    const p = new URLSearchParams(loc.search);
    setQ(p.get("q") || "");
    setCategory(p.get("category") || "");
    setOrg(p.get("uni") || "");
    setLevel(p.get("level") || "");
    setLanguage(p.get("lang") || "");
    setPage(Number(p.get("page") || 1));
  }, [loc.search]);

  // 상태 -> URL
  const pushQuery = (nextPage = 1) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (category) p.set("category", category); // UI용으로만 보존
    if (org) p.set("uni", org);
    if (level) p.set("level", level);
    if (language) p.set("lang", language);
    p.set("page", String(nextPage));
    p.set("size", String(size));
    p.set("sort", "latest");
    nav({ pathname: "/search", search: p.toString() }, { replace: true });
  };

  // 서버 검색 (오직 서버 응답만 사용, 패딩 없음)
  const runSearch = async (nextPage) => {
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

      // 🔎 클라이언트 보정 필터: 검색어가 있으면 제목/강사/설명에서 한 번 더 필터
      //  → “인류학” 입력 시 "인류학의 이해" 카드 1개만 남도록 보장
      const key = (q || "").trim().toLowerCase();
      const strictFiltered = key
        ? data.items.filter((it) =>
            `${it.title || ""} ${it.teacher || ""} ${it.desc || ""}`
              .toLowerCase()
              .includes(key)
          )
        : data.items;

      setItems(strictFiltered);
      setTotal(strictFiltered.length);
    } catch (e) {
      console.error(e);
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // URL 바뀔 때마다 서버 재조회
  useEffect(() => {
    const p = new URLSearchParams(loc.search);
    const cur = Number(p.get("page") || 1);
    runSearch(cur);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc.search]);

  const reset = () => {
    setQ(""); setCategory(""); setOrg(""); setLevel(""); setLanguage(""); setTeacher("");
    setFreeOnly(false); setCertOnly(false);
    pushQuery(1);
  };

  const run = () => pushQuery(1);

  const handleEnter = (e) => {
    if (e.key === "Enter") run();
  };

  // 서버 응답 -> 카드 props 매핑
  const toCardProps = (it) => ({
    slug: it.slug || "course",
    image: it.image || "/img/seed.png",
    title: it.title || "강좌",
    teacher: it.teacher || "",          // "강사 · 기관" 포맷 사용
    rating: Number(it.rating || 4.6),
    people: it.students || "12.4k명",
    // 검색 목록에서는 tag/match/desc 숨김 (원래 UI 그대로)
  });

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* 브레드크럼/카운트 */}
      <div className="max-w-[1120px] mx-auto px-5 pt-6">
        <div className="text-[13px] text-[#8B95A1] flex items-center gap-2">
          <Link to="/" className="hover:underline">돌아가기</Link>
          <span>›</span>
          <span className="text-[#111827]">'강좌'에 대한 검색 결과</span>
        </div>
        <div className="mt-2 text-sm text-[#6B7280]">
          총 <b className="text-[#111827]">{total}</b>개의 강좌
        </div>
      </div>

      {/* 정렬 드롭다운 (모양만 유지) */}
      <div className="max-w-[1120px] mx-auto px-5 mt-2 flex justify-end">
        <select className="h-9 rounded-lg border border-[#E5E7EB] px-2 text-sm text-[#374151]">
          <option>최신순</option>
          <option>인기순</option>
          <option>평점순</option>
        </select>
      </div>

      {/* 필터 패널 (UI 그대로) */}
      <div className="max-w-[1120px] mx-auto px-5 mt-4">
        <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(16,24,40,.06)] p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FilterBox label="카테고리">
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
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
                     className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3" />
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
                <img src={ICON.search}
                     className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70" alt="" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={handleEnter}
                  placeholder="찾고 싶은 강좌를 검색해보세요"
                  className="w-full h-10 pl-9 rounded-lg border border-[#E5E7EB] px-3"
                />
              </div>
            </FilterBox>

            <div className="flex items-center gap-4 mt-2 md:mt-8">
              <label className="inline-flex items-center gap-2 text-[13px]">
                <input type="checkbox" checked={freeOnly} onChange={(e)=>setFreeOnly(e.target.checked)} />
                무료 강좌
              </label>
              <label className="inline-flex items-center gap-2 text-[13px]">
                <input type="checkbox" checked={certOnly} onChange={(e)=>setCertOnly(e.target.checked)} />
                수료증 제공
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <button onClick={reset}
              className="px-4 h-10 rounded-lg border border-[#E5E7EB] text-[#374151] text-sm hover:bg-[#F3F4F6]">
              초기화
            </button>
            <button onClick={run}
              className="px-5 h-10 rounded-lg bg-[#121417] text-white text-sm shadow hover:brightness-110">
              세부 검색 실행
            </button>
          </div>
        </div>
      </div>

      {/* 결과 카드: 검색 결과만 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-8 pb-16">
        <div id="results" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && (
            <div className="col-span-full text-center text-sm text-[#6B7280]">불러오는 중…</div>
          )}
          {!loading && items.length === 0 && (
            <div className="col-span-full text-center text-sm text-[#6B7280]">
              조건에 맞는 강좌가 없습니다.
            </div>
          )}
          {!loading && items.map((it) => (
            <CourseCard key={it.slug} {...toCardProps(it)} />
          ))}
        </div>
      </div>
    </div>
  );
}
