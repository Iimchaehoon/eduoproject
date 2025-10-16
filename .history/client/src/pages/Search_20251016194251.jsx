// src/pages/Search.jsx
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/** 폼 옵션들 (UI만 채워줌) */
const CATEGORY_OPTIONS = [
  "인문학", "사회과학", "자연과학", "공학", "의학",
  "예체능", "교육학", "컴퓨터과학", "경영학", "법학",
];
const LEVEL_OPTIONS = ["입문", "중급", "고급"];
const PERIOD_OPTIONS = ["4~8주", "9~16주", "그 이상"];
const LANG_OPTIONS = [
  { label: "한국어", value: "ko" },
  { label: "영어", value: "en" },
];

/** API 실패시/빈결과시 안전한 백업 카드들 */
const FALLBACK = [
  { slug:"cloud-sec", title:"클라우드 보안 엔지니어 실무과정", org:"한동대학교", badge:["보안","클라우드"], period:"14주", peopleText:"23,000명", rating:4.9, votes:"1.2만+", img:"/img/cloud.png"  },
  { slug:"human-under", title:"인류학의 이해", org:"전북대학교", badge:["인문학"], period:"14주", peopleText:"23,000명", rating:4.6, votes:"9.8천+", img:"/img/human.png"  },
  { slug:"battery-sys", title:"전기자동차 배터리 시스템", org:"한국폴리텍", badge:["전기","배터리"], period:"14주", peopleText:"23,000명", rating:4.7, votes:"6.5천+", img:"/img/battery.png"  },
  { slug:"pandas-basic", title:"Python 및 Pandas 활용 데이터 분석 기초 과정", org:"부산대학교", badge:["데이터 과학"], period:"14주", peopleText:"23,000명", rating:4.6, votes:"5.2천+", img:"/img/pandas.png"  },
  { slug:"react-advanced", title:"리액트 고급 개발", org:"서울대학교", badge:["웹 · 프론트"], period:"14주", peopleText:"23,000명", rating:4.8, votes:"9.8천+", img:"/img/react.png"  },
  { slug:"dataviz-master", title:"데이터 시각화 마스터클래스", org:"연세대학교", badge:["데이터분석"], period:"14주", peopleText:"23,000명", rating:4.7, votes:"6.5천+", img:"/img/data.png"  },
  { slug:"block-basic", title:"블록체인 기초부터 실무", org:"한양대학교", badge:["블록체인"], period:"14주", peopleText:"23,000명", rating:4.6, votes:"5.2천+", img:"/img/block.png"  },
  { slug:"dl-nn", title:"신경망 및 딥러닝", org:"고려대학교", badge:["딥러닝"], period:"14주", peopleText:"23,000명", rating:4.9, votes:"12.4천+", img:"/img/deep.png"  },
  { slug:"bio-ai", title:"생체데이터와 인공지능의 이해", org:"중앙대학교", badge:["바이오 · AI"], period:"14주", peopleText:"23,000명", rating:4.6, votes:"5.9천+", img:"/img/seed.png"  },
];

/** 작은 아이콘 */
const ICON = {
  search: "/img/dot_icon.png",
  week: "/img/clock.png",
  people: "/img/jobs.png",
};

export default function Search() {
  const nav = useNavigate();
  const { search } = useLocation();
  const qs = new URLSearchParams(search);

  /** URL → 상태(초기값) */
  const [keyword,  setKeyword]  = useState(qs.get("keyword")  || "");
  const [category, setCategory] = useState(qs.get("category") || "");
  const [org,      setOrg]      = useState(qs.get("org")      || "");
  const [level,    setLevel]    = useState(qs.get("level")    || "");
  const [period,   setPeriod]   = useState(qs.get("period")   || "");
  const [language, setLanguage] = useState(qs.get("language") || "");
  const [teacher,  setTeacher]  = useState(qs.get("teacher")  || "");
  const [freeOnly, setFreeOnly] = useState(qs.get("free") === "1");
  const [certOnly, setCertOnly] = useState(qs.get("cert") === "1");

  /** 결과 */
  const [items, setItems]   = useState([]);
  const [total, setTotal]   = useState(0);
  const [loading, setLoading] = useState(false);

  /** URL 쿼리 동기화 */
  const applyQuery = () => {
    const p = new URLSearchParams();
    if (keyword)  p.set("keyword", keyword);
    if (category) p.set("category", category);
    if (org)      p.set("org", org);
    if (level)    p.set("level", level);
    if (period)   p.set("period", period);
    if (language) p.set("language", language);
    if (teacher)  p.set("teacher", teacher);
    if (freeOnly) p.set("free", "1");
    if (certOnly) p.set("cert", "1");
    nav(`/search?${p.toString()}`, { replace: false });
  };

  /** API 호출 */
  const fetchKocw = async () => {
    setLoading(true);
    try {
      const p = new URLSearchParams();
      if (keyword)  p.set("q", keyword);
      if (language) p.set("lang", language); // ko/en
      if (level)    p.set("level", level);   // 입문/중급/고급(서버에서 매핑)
      if (org)      p.set("uni", org);       // 교육기관명

      // 무료/수료증은 공용 API에서 직접 제공 안될 수 있어 제외 (서버가 지원하면 추가)
      const r = await fetch(`/api/kocw/search?${p.toString()}`);
      if (!r.ok) throw new Error(`API ${r.status}`);
      const data = await r.json();

      if (data?.items?.length) {
        setItems(
          data.items.map((it) => ({
            slug: it.slug || it.id,
            title: it.title,
            org: it.teacher?.split("·")[1]?.trim() || "교육기관",
            badge: [category || "추천"],
            period: it.weeks || "14주",
            peopleText: it.students || "23,000명",
            rating: Number(it.rating || 4.6),
            votes: "", // 없으면 생략
            img: it.image || "/img/alfago.png",
          }))
        );
        setTotal(data.total || data.items.length);
      } else {
        setItems(FALLBACK);
        setTotal(FALLBACK.length);
      }
    } catch (e) {
      console.warn("KOCW fetch fail:", e.message);
      setItems(FALLBACK);
      setTotal(FALLBACK.length);
    } finally {
      setLoading(false);
    }
  };

  /** URL이 바뀔 때마다 상태 동기화 + 페치 */
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    setKeyword(q.get("keyword") || "");
    setCategory(q.get("category") || "");
    setOrg(q.get("org") || "");
    setLevel(q.get("level") || "");
    setPeriod(q.get("period") || "");
    setLanguage(q.get("language") || "");
    setTeacher(q.get("teacher") || "");
    setFreeOnly(q.get("free") === "1");
    setCertOnly(q.get("cert") === "1");
    fetchKocw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const reset = () => {
    setKeyword(""); setCategory(""); setOrg(""); setLevel("");
    setPeriod(""); setLanguage(""); setTeacher("");
    setFreeOnly(false); setCertOnly(false);
  };

  const runSearch = () => {
    applyQuery(); // URL 업데이트 → useEffect → fetchKocw
    document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" });
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
          총 <b className="text-[#111827]">{total || items.length}</b>개의 강좌
        </div>
      </div>

      {/* 정렬 (모양만) */}
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
              <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option value="">카테고리 선택</option>
                {CATEGORY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </FilterBox>

            <FilterBox label="교육기관">
              <input value={org} onChange={(e)=>setOrg(e.target.value)} placeholder="교육기관명" className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3" />
            </FilterBox>

            <FilterBox label="난이도">
              <select value={level} onChange={(e)=>setLevel(e.target.value)} className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option value="">난이도 선택</option>
                {LEVEL_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </FilterBox>

            <FilterBox label="강좌 기간">
              <select value={period} onChange={(e)=>setPeriod(e.target.value)} className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option value="">기간 선택</option>
                {PERIOD_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </FilterBox>

            <FilterBox label="강의 언어">
              <select value={language} onChange={(e)=>setLanguage(e.target.value)} className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option value="">언어 선택</option>
                {LANG_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </FilterBox>

            <FilterBox label="강사명">
              <input value={teacher} onChange={(e)=>setTeacher(e.target.value)} placeholder="강사명" className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3" />
            </FilterBox>

            <FilterBox label="검색어">
              <div className="relative">
                <img src={ICON.search} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70" />
                <input value={keyword} onChange={(e)=>setKeyword(e.target.value)} placeholder="찾고 싶은 강좌를 검색해보세요" className="w-full h-10 pl-9 rounded-lg border border-[#E5E7EB] px-3" />
              </div>
            </FilterBox>

            <div className="flex items-center gap-4 mt-2 md:mt-8">
              <label className="inline-flex items-center gap-2 text-[13px]">
                <input type="checkbox" checked={freeOnly} onChange={(e)=>setFreeOnly(e.target.checked)} /> 무료 강좌
              </label>
              <label className="inline-flex items-center gap-2 text-[13px]">
                <input type="checkbox" checked={certOnly} onChange={(e)=>setCertOnly(e.target.checked)} /> 수료증 제공
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <button onClick={reset} className="px-4 h-10 rounded-lg border border-[#E5E7EB] text-[#374151] text-sm hover:bg-[#F3F4F6]">초기화</button>
            <button onClick={runSearch} className="px-5 h-10 rounded-lg bg-[#121417] text-white text-sm shadow hover:brightness-110">세부 검색 실행</button>
          </div>
        </div>
      </div>

      {/* 결과 카드들 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-8 pb-16">
        {loading && <div className="text-center text-[#6B7280]">불러오는 중…</div>}
        <div id="results" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((c) => (
            <CourseCard key={c.slug} course={c} onClick={()=> nav(`/course/${c.slug}`)} />
          ))}
        </div>

        {/* 페이지네이션(모양) */}
        <div className="mt-10 flex items-center justify-center gap-1 text-[13px]">
          <button className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]">‹</button>
          {[1,2,3,4,5].map(n => (
            <button key={n} className={`w-8 h-8 rounded-md ${n===1 ? "bg-[#121417] text-white" : "hover:bg-[#EEF2F7]"}`}>{n}</button>
          ))}
          <button className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]">›</button>
        </div>
      </div>
    </div>
  );
}

/* --- 작은 서브 컴포넌트 --- */
function FilterBox({ label, children }) {
  return (
    <label className="text-[13px]">
      <div className="mb-1 text-[#7A8292]">{label}</div>
      {children}
    </label>
  );
}

function CourseCard({ course, onClick }) {
  const { title, org, badge, rating, votes, period, peopleText, img } = course;
  return (
    <div onClick={onClick} role="button"
      className="group cursor-pointer rounded-2xl bg-white shadow-[0_10px_26px_rgba(16,24,40,.08)] transition-transform duration-300 hover:scale-[1.05] will-change-transform">
      <div className="relative rounded-2xl rounded-b-none overflow-hidden aspect-[16/9] bg-[#F2F4F8]">
        <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#6A56FF] text-white text-[12px] font-semibold h-7 px-3 shadow-[0_6px_16px_rgba(16,24,40,.18)]">
          {badge?.[0] ?? "추천"}
        </div>
      </div>
      <div className="p-5">
        <div className="text-[15px] text-[#8B95A1]">{org}</div>
        <div className="mt-1 text-[18px] font-bold text-[#101828] leading-snug">{title}</div>
        <div className="mt-3 flex items-center gap-6 text-[13px] text-[#6B7686]">
          <span className="inline-flex items-center gap-1"><img src="/img/clock.png" className="w-[14px] h-[14px] opacity-70" />{period}</span>
          <span className="inline-flex items-center gap-1"><img src="/img/jobs.png" className="w-[14px] h-[14px] opacity-70" />{peopleText} 학생</span>
        </div>
        <div className="mt-3 flex items-center gap-1 text-[13px] text-[#6B7686]">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="#F8B84A"><path d="M10 15.27l-5.18 3.05 1.58-5.36L1.82 8.9l5.47-.4L10 3.5l2.71 4.99 5.47.4-4.58 4.06 1.58 5.36z"/></svg>
          <span className="font-semibold text-[#374151]">{Number(rating || 4.6).toFixed(1)}</span>
          {votes && <span className="text-[#9CA3AF]">· {votes}</span>}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1">
            {badge?.slice(0,3).map((b)=>(
              <span key={b} className="px-2 h-7 rounded-md bg-[#F3F6FF] text-[#4450FF] text-[12px] inline-flex items-center">{b}</span>
            ))}
          </div>
          <button onClick={(e)=>{e.stopPropagation(); onClick();}}
            className="px-4 h-10 rounded-lg bg-[#2C6BFF] text-white text-sm font-semibold hover:brightness-110">수강신청</button>
        </div>
      </div>
    </div>
  );
}
