import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CourseCard from "../shared/CourseCard.jsx";

/** 이미지 매핑 */
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

/** 데모 데이터(기존 UI 유지용) */
const ALL = [
  { slug:"cloud-sec", title:"클라우드 보안 엔지니어 실무과정", org:"한동대학교", teacher:"김OO",
    badge:["보안","클라우드"], img:"cloud", rating:4.9, votes:"1.2만+", period:"14주", category:"컴퓨터과학", level:"중급" },
  { slug:"human-under", title:"인류학의 이해", org:"전북대학교", teacher:"김OO",
    badge:["인문학"], img:"human", rating:4.6, votes:"9.8천+", period:"14주", category:"인문학", level:"입문" },
  { slug:"battery-sys", title:"전기자동차 배터리 시스템", org:"한국폴리텍", teacher:"정OO",
    badge:["전기","배터리"], img:"battery", rating:4.7, votes:"6.5천+", period:"14주", category:"공학", level:"중급" },
  { slug:"pandas-basic", title:"Python 및 Pandas 활용 데이터 분석 기초 과정", org:"부산대학교", teacher:"박OO",
    badge:["데이터 과학"], img:"pandas", rating:4.6, votes:"5.2천+", period:"14주", category:"컴퓨터과학", level:"입문" },
  { slug:"react-advanced", title:"리액트 고급 개발", org:"서울대학교", teacher:"이OO",
    badge:["웹 · 프론트"], img:"react", rating:4.8, votes:"9.8천+", period:"14주", category:"컴퓨터과학", level:"고급" },
  { slug:"dataviz-master", title:"데이터 시각화 마스터클래스", org:"연세대학교", teacher:"박OO",
    badge:["데이터분석"], img:"data", rating:4.7, votes:"6.5천+", period:"14주", category:"자연과학", level:"중급" },
  { slug:"block-basic", title:"블록체인 기초부터 실무", org:"한양대학교", teacher:"최OO",
    badge:["블록체인"], img:"block", rating:4.6, votes:"5.2천+", period:"14주", category:"컴퓨터과학", level:"입문" },
  { slug:"dl-nn", title:"신경망 및 딥러닝", org:"고려대학교", teacher:"김OO",
    badge:["딥러닝"], img:"deep", rating:4.9, votes:"12.4천+", period:"14주", category:"컴퓨터과학", level:"고급" },
  { slug:"bio-ai", title:"생체데이터와 인공지능의 이해", org:"중앙대학교", teacher:"유OO",
    badge:["바이오 · AI"], img:"seed", rating:4.6, votes:"5.9천+", period:"14주", category:"자연과학", level:"중급" },
];

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
  const qParam = (sp.get("q") || "").trim();       // ← 홈에서 넘어온 검색어
  const page = Number(sp.get("page") || 1);
  const size = Number(sp.get("size") || 12);
  const sort = sp.get("sort") || "latest";

  // 필터 폼 상태 (UI 유지용)
  const [q, setQ] = useState(qParam);
  const [category, setCategory] = useState(sp.get("category") || "");
  const [org, setOrg] = useState(sp.get("uni") || "");
  const [level, setLevel] = useState(sp.get("level") || "");
  const [language, setLanguage] = useState(sp.get("lang") || "");
  const [teacher, setTeacher] = useState(sp.get("teacher") || "");
  const [freeOnly, setFreeOnly] = useState(sp.get("free") === "1");
  const [certOnly, setCertOnly] = useState(sp.get("cert") === "1");

  // 실제 필터링
  const filtered = useMemo(() => {
    const kw = (qParam || q || "").toLowerCase();
    let arr = ALL;

    // 폼 조건
    arr = arr.filter((c) => {
      if (kw && !(`${c.title} ${c.org} ${c.teacher} ${c.category}`.toLowerCase().includes(kw)))
        return false;
      if (category && c.category !== category) return false;
      if (org && !c.org.includes(org)) return false;
      if (level && c.level !== level) return false;
      if (teacher && !c.teacher.includes(teacher)) return false;
      // language/freeOnly/certOnly 는 데모라 생략
      return true;
    });

    // 정렬 데모(최신/인기/평점) – 실제 API 연결 시 서버정렬 권장
    if (sort === "rating") arr = [...arr].sort((a, b) => b.rating - a.rating);

    return arr;
  }, [qParam, q, category, org, level, teacher, sort]);

  // ❗ q 가 있으면 “검색 결과만” 보여주기 → 페이지네이션 size 무시
  const visible = useMemo(() => {
    if (qParam) return filtered;               // 검색어가 있으면 전부(=필터된 것만) 노출
    const start = (page - 1) * size;
    return filtered.slice(start, start + size);
  }, [filtered, qParam, page, size]);

  // 총합 표시도 검색어가 있으면 “필터된 개수”
  const totalCount = filtered.length;

  const apply = () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (org) params.set("uni", org);
    if (level) params.set("level", level);
    if (language) params.set("lang", language);
    if (teacher) params.set("teacher", teacher);
    if (freeOnly) params.set("free", "1");
    if (certOnly) params.set("cert", "1");
    params.set("page", "1");
    params.set("sort", sort);
    nav(`/search?${params.toString()}`);
  };

  const reset = () => {
    setQ("");
    setCategory("");
    setOrg("");
    setLevel("");
    setLanguage("");
    setTeacher("");
    setFreeOnly(false);
    setCertOnly(false);
    nav(`/search`); // 전체 보기
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="max-w-[1120px] mx-auto px-5 pt-6">
        <div className="text-[13px] text-[#8B95A1] flex items-center gap-2">
          <Link to="/" className="hover:underline">돌아가기</Link>
          <span>›</span>
          <span className="text-[#111827]">'강좌'에 대한 검색 결과</span>
        </div>

        <div className="mt-2 text-sm text-[#6B7280]">
          총 <b className="text-[#111827]">{totalCount}</b>개의 강좌
        </div>
      </div>

      {/* 정렬 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-2 flex justify-end">
        <select
          value={sort}
          onChange={(e) => setSp((prev) => {
            const p = new URLSearchParams(prev);
            p.set("sort", e.target.value);
            p.set("page", "1");
            return p;
          })}
          className="h-9 rounded-lg border border-[#E5E7EB] px-2 text-sm text-[#374151]"
        >
          <option value="latest">최신순</option>
          <option value="rating">평점순</option>
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
                <img src="/img/dot_icon.png"
                     className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="찾고 싶은 강좌를 검색해보세요"
                  onKeyDown={(e)=>{ if(e.key==='Enter') apply(); }}
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

          <div className="flex items-center gap-3 mt-5">
            <button onClick={reset}
              className="px-4 h-10 rounded-lg border border-[#E5E7EB] text-[#374151] text-sm hover:bg-[#F3F4F6]">
              초기화
            </button>
            <button onClick={apply}
              className="px-5 h-10 rounded-lg bg-[#121417] text-white text-sm shadow hover:brightness-110">
              세부 검색 실행
            </button>
          </div>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-8 pb-16">
        {visible.length === 0 ? (
          <div className="py-16 text-center text-[#6B7280]">검색 조건에 맞는 강좌가 없습니다.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((c) => (
              <CourseCard
                key={c.slug}
                slug={c.slug}
                image={IMG[c.img]}
                title={c.title}
                teacher={`${c.teacher || ""} · ${c.org}`}
                tag={c.badge?.[0]}
                field={c.category}
                level={c.level}
                rating={c.rating}
                people={c.votes}
                weeks={c.period}
                badges={c.badge}
              />
            ))}
          </div>
        )}

        {/* 페이지네이션: 검색어가 있을 땐 감춤 */}
        {!qParam && visible.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-1 text-[13px]">
            <button
              className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]"
              onClick={() => setSp((prev) => {
                const p = new URLSearchParams(prev);
                p.set("page", String(Math.max(1, page - 1)));
                return p;
              })}
            >‹</button>
            {[1,2,3,4,5].map(n => (
              <button key={n}
                onClick={() => setSp((prev) => { const p = new URLSearchParams(prev); p.set("page", String(n)); return p; })}
                className={`w-8 h-8 rounded-md ${n===page ? "bg-[#121417] text-white" : "hover:bg-[#EEF2F7]"}`}>
                {n}
              </button>
            ))}
            <button
              className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]"
              onClick={() => setSp((prev) => {
                const p = new URLSearchParams(prev);
                p.set("page", String(page + 1));
                return p;
              })}
            >›</button>
          </div>
        )}
      </div>
    </div>
  );
}
