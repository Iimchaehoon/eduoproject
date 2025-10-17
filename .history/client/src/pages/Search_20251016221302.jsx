// src/pages/Search.jsx
import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CourseCard from "../shared/CourseCard.jsx";

/** 썸네일 매핑 */
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

/** 페이지에서 사용할 더미 12개 (UI 틀) */
const ALL = [
  {
    slug: "cloud-sec",
    title: "클라우드 보안 엔지니어 실무과정",
    org: "한동대학교",
    badge: ["보안", "클라우드"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.9,
    votes: "1.2만+",
    img: "cloud",
    level: "중급",
    category: "컴퓨터과학",
    teacher: "최시윤",
    language: "한국어",
    paid: true,
  },
  {
    slug: "human-under",
    title: "인류학의 이해",
    org: "전북대학교",
    badge: ["인문학"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.6,
    votes: "9.8천+",
    img: "human",
    level: "입문",
    category: "인문학",
    teacher: "김OO",
    language: "한국어",
    paid: false,
  },
  {
    slug: "battery-sys",
    title: "전기자동차 배터리 시스템",
    org: "한국폴리텍",
    badge: ["전기", "배터리"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.7,
    votes: "6.5천+",
    img: "battery",
    level: "중급",
    category: "공학",
    teacher: "박OO",
    language: "한국어",
    paid: true,
  },
  {
    slug: "pandas-basic",
    title: "Python 및 Pandas 활용 데이터 분석 기초 과정",
    org: "부산대학교",
    badge: ["데이터 과학"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.6,
    votes: "5.2천+",
    img: "pandas",
    level: "입문",
    category: "컴퓨터과학",
    teacher: "박OO",
    language: "한국어",
    paid: false,
  },
  {
    slug: "react-advanced",
    title: "리액트 고급 개발",
    org: "서울대학교",
    badge: ["웹 · 프론트"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.8,
    votes: "9.8천+",
    img: "react",
    level: "고급",
    category: "컴퓨터과학",
    teacher: "이OO",
    language: "한국어",
    paid: true,
  },
  {
    slug: "dataviz-master",
    title: "데이터 시각화 마스터클래스",
    org: "연세대학교",
    badge: ["데이터분석"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.7,
    votes: "6.5천+",
    img: "data",
    level: "중급",
    category: "자연과학",
    teacher: "연OO",
    language: "한국어",
    paid: true,
  },
  {
    slug: "block-basic",
    title: "블록체인 기초부터 실무",
    org: "한양대학교",
    badge: ["블록체인"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.6,
    votes: "5.2천+",
    img: "block",
    level: "입문",
    category: "컴퓨터과학",
    teacher: "최OO",
    language: "한국어",
    paid: false,
  },
  {
    slug: "dl-nn",
    title: "신경망 및 딥러닝",
    org: "고려대학교",
    badge: ["딥러닝"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.9,
    votes: "12.4천+",
    img: "deep",
    level: "고급",
    category: "컴퓨터과학",
    teacher: "김OO",
    language: "한국어",
    paid: true,
  },
  {
    slug: "bio-ai",
    title: "생체데이터와 인공지능의 이해",
    org: "중앙대학교",
    badge: ["바이오 · AI"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.6,
    votes: "5.9천+",
    img: "seed",
    level: "중급",
    category: "자연과학",
    teacher: "유OO",
    language: "한국어",
    paid: true,
  },
  // 필요 시 3개 더 복제
  {
    slug: "pandas-2",
    title: "파이썬으로 데이터 과학",
    org: "부산대학교",
    badge: ["데이터 과학"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.6,
    votes: "1.2만+",
    img: "pyton_data",
    level: "중급",
    category: "컴퓨터과학",
    teacher: "박OO",
    language: "한국어",
    paid: false,
  },
  {
    slug: "react-basic",
    title: "리액트 기초",
    org: "서울대학교",
    badge: ["웹 · 프론트"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.6,
    votes: "1.2만+",
    img: "react",
    level: "입문",
    category: "컴퓨터과학",
    teacher: "이OO",
    language: "한국어",
    paid: false,
  },
  {
    slug: "viz-basic",
    title: "데이터 시각화 입문",
    org: "연세대학교",
    badge: ["데이터분석"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.6,
    votes: "1.2만+",
    img: "data",
    level: "입문",
    category: "자연과학",
    teacher: "연OO",
    language: "한국어",
    paid: false,
  },
];

/* 공통 Filter 래퍼 */
function FilterBox({ label, children }) {
  return (
    <label className="text-[13px]">
      <div className="mb-1 text-[#7A8292]">{label}</div>
      {children}
    </label>
  );
}

export default function Search() {
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

  // URL 변하면 입력칸도 동기화
  useEffect(() => {
    setQ(sp.get("q") || "");
    setCategory(sp.get("category") || "");
    setOrg(sp.get("uni") || "");
    setLevel(sp.get("level") || "");
    setLanguage(sp.get("lang") || "");
    setTeacher(sp.get("teacher") || "");
    setFreeOnly(sp.get("free") === "1");
    setCertOnly(sp.get("cert") === "1");
  }, [sp]);

  // 필터링: **q가 있으면 해당 결과만 보여줌**
  const filtered = useMemo(() => {
    const base = ALL.filter((c) => {
      if (q) {
        const hay = `${c.title} ${c.org} ${c.teacher}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      if (category && c.category !== category) return false;
      if (org && !c.org.includes(org)) return false;
      if (level && c.level !== level) return false;
      if (language && c.language !== language) return false;
      if (teacher && !c.teacher.includes(teacher)) return false;
      if (freeOnly && c.paid) return false;
      if (certOnly) {
        /* 데모: 모두 수료증 제공이라고 가정/통과 */
      }
      return true;
    });
    return base;
  }, [q, category, org, level, language, teacher, freeOnly, certOnly]);

  // “세부 검색 실행” → URL 반영
  const applySearch = () => {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (category) next.set("category", category);
    if (org) next.set("uni", org);
    if (level) next.set("level", level);
    if (language) next.set("lang", language);
    if (teacher) next.set("teacher", teacher);
    if (freeOnly) next.set("free", "1");
    if (certOnly) next.set("cert", "1");
    next.set("page", "1");
    next.set("size", String(Math.max(filtered.length, 1))); // ✅ 결과 개수만큼만
    next.set("sort", "latest");
    setSp(next, { replace: false });

    // 결과 위치로 스크롤
    setTimeout(() => {
      document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
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
    setSp(new URLSearchParams(), { replace: false });
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
          총 <b className="text-[#111827]">{filtered.length}</b>개의 강좌
        </div>
      </div>

      {/* 정렬(모양) */}
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
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3 focus:outline-none"
              >
                <option value="">카테고리 선택</option>
                <option>인문학</option>
                <option>자연과학</option>
                <option>공학</option>
                <option>컴퓨터과학</option>
              </select>
            </FilterBox>

            <FilterBox label="교육기관">
              <input
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                placeholder="교육기관명"
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3 focus:outline-none"
              />
            </FilterBox>

            <FilterBox label="난이도">
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3"
              >
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
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3"
              >
                <option value="">언어 선택</option>
                <option>한국어</option>
                <option>영어</option>
              </select>
            </FilterBox>

            <FilterBox label="강사명">
              <input
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                placeholder="강사명"
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3"
              />
            </FilterBox>

            <FilterBox label="검색어">
              <div className="relative">
                <img
                  src="/img/dot_icon.png"
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
                <input
                  type="checkbox"
                  checked={freeOnly}
                  onChange={(e) => setFreeOnly(e.target.checked)}
                />
                무료 강좌
              </label>
              <label className="inline-flex items-center gap-2 text-[13px]">
                <input
                  type="checkbox"
                  checked={certOnly}
                  onChange={(e) => setCertOnly(e.target.checked)}
                />
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
              onClick={applySearch}
              className="px-5 h-10 rounded-lg bg-[#121417] text-white text-sm shadow hover:brightness-110"
            >
              세부 검색 실행
            </button>
          </div>
        </div>
      </div>

      {/* 카드 그리드 (검색어 있으면 해당 결과만) */}
      <div className="max-w-[1120px] mx-auto px-5 mt-8 pb-16">
        <div id="results" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <CourseCard
              key={c.slug}
              slug={c.slug}
              image={IMG[c.img]}
              title={c.title}
              teacher={`${c.teacher} · ${c.org}`}
              tag={c.badge?.[0]}
              match={undefined}
              desc={undefined}
              rating={c.rating}
              people={c.votes}
            />
          ))}
        </div>

        {/* 페이지네이션(검색어 없을 때만 표시) */}
        {!q && filtered.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-1 text-[13px]">
            <button className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]">‹</button>
            {[1, 2].map((n) => (
              <button
                key={n}
                className={`w-8 h-8 rounded-md ${
                  n === 1 ? "bg-[#121417] text-white" : "hover:bg-[#EEF2F7]"
                }`}
              >
                {n}
              </button>
            ))}
            <button className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]">›</button>
          </div>
        )}
      </div>
    </div>
  );
}
