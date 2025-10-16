// src/pages/Search.jsx
import { useMemo, useState } from "react";
import CourseCard from "../components/shard/CourseCard.jsx";

const COURSES = [
  {
    slug: "intro-humanities",
    title: "인류학의 이해",
    teacher: "김○○",
    org: "전북대학교",
    img: "/img/seed.png",
    badge: "입문",
  },
  {
    slug: "data-with-python",
    title: "파이썬으로 데이터 과학",
    teacher: "박○○",
    org: "부산대학교",
    img: "/img/data.png",
    badge: "데이터",
  },
  {
    slug: "react-advanced",
    title: "리액트 고급 개발",
    teacher: "이○○",
    org: "서울대학교",
    img: "/img/react.png",
    badge: "프로젝트",
  },
  {
    slug: "vision-master",
    title: "데이터 시각화 마스터클래스",
    teacher: "박○○",
    org: "연세대학교",
    img: "/img/python_data.png",
    badge: "시각화",
  },
  {
    slug: "blockchain-practice",
    title: "블록체인 기초부터 실무",
    teacher: "최○○",
    org: "한양대학교",
    img: "/img/block.png",
    badge: "핀테크",
  },
  {
    slug: "dl-intro",
    title: "신경망 및 딥러닝",
    teacher: "김○○",
    org: "고려대학교",
    img: "/img/deep.png",
    badge: "AI",
  },
  {
    slug: "ai-college",
    title: "AI 혁신 캡스톤",
    teacher: "공동운영",
    org: "EDUO",
    img: "/img/edu_pro2.png",
    badge: "프로젝트",
  },
  {
    slug: "python-beginner",
    title: "파이썬 입문 · 실습",
    teacher: "이○○",
    org: "EDUO",
    img: "/img/python.png",
    badge: "입문",
  },
  {
    slug: "frontend-boot",
    title: "프론트엔드 부트캠프",
    teacher: "오○○",
    org: "EDUO",
    img: "/img/dot_icon.png",
    badge: "웹",
  },
];

export default function Search() {
  const [filters, setFilters] = useState({
    category: "",
    org: "",
    difficulty: "",
    period: "",
    lang: "",
    teacher: "",
    start: "",
    end: "",
    free: false,
    certificate: false,
    credit: false,
    design: false,
    coop: false,
  });

  const filtered = useMemo(() => {
    // 간단한 필터 (이름/강사/기관 텍스트 매칭 정도만)
    return COURSES.filter((c) => {
      if (filters.org && !c.org.includes(filters.org)) return false;
      if (filters.teacher && !c.teacher.includes(filters.teacher)) return false;
      if (filters.category && !c.title.includes(filters.category)) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      {/* 상단: 총 개수 + 정렬 */}
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[15px] font-semibold text-slate-800">
          총 {filtered.length}개의 강좌
        </div>
        <select className="rounded-lg border border-slate-200 px-3 py-2 text-[13px]">
          <option>최신순</option>
          <option>평점순</option>
          <option>수강생순</option>
        </select>
      </div>

      {/* 필터 그리드 */}
      <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <select
            className="h-10 rounded-xl border border-slate-200 px-3 text-[13px]"
            value={filters.category}
            onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value }))}
          >
            <option value="">카테고리 선택</option>
            <option>데이터</option>
            <option>웹/프론트엔드</option>
            <option>인문/사회</option>
          </select>

          <input
            className="h-10 rounded-xl border border-slate-200 px-3 text-[13px]"
            placeholder="교육기관명"
            value={filters.org}
            onChange={(e) => setFilters((p) => ({ ...p, org: e.target.value }))}
          />

          <select
            className="h-10 rounded-xl border border-slate-200 px-3 text-[13px]"
            value={filters.difficulty}
            onChange={(e) => setFilters((p) => ({ ...p, difficulty: e.target.value }))}
          >
            <option value="">난이도 선택</option>
            <option>입문</option>
            <option>중급</option>
            <option>고급</option>
          </select>

          <select
            className="h-10 rounded-xl border border-slate-200 px-3 text-[13px]"
            value={filters.period}
            onChange={(e) => setFilters((p) => ({ ...p, period: e.target.value }))}
          >
            <option value="">기간 선택</option>
            <option>8주</option>
            <option>12주</option>
            <option>14주</option>
          </select>

          <select
            className="h-10 rounded-xl border border-slate-200 px-3 text-[13px]"
            value={filters.lang}
            onChange={(e) => setFilters((p) => ({ ...p, lang: e.target.value }))}
          >
            <option value="">언어 선택</option>
            <option>한국어</option>
            <option>영어</option>
          </select>

          <input
            className="h-10 rounded-xl border border-slate-200 px-3 text-[13px]"
            placeholder="강사명"
            value={filters.teacher}
            onChange={(e) => setFilters((p) => ({ ...p, teacher: e.target.value }))}
          />

          <div className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-[13px]">
            <span className="text-slate-500">시작</span>
            <input
              type="date"
              className="flex-1 bg-transparent outline-none"
              value={filters.start}
              onChange={(e) => setFilters((p) => ({ ...p, start: e.target.value }))}
            />
          </div>

          <div className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-[13px]">
            <span className="text-slate-500">종료</span>
            <input
              type="date"
              className="flex-1 bg-transparent outline-none"
              value={filters.end}
              onChange={(e) => setFilters((p) => ({ ...p, end: e.target.value }))}
            />
          </div>
        </div>

        {/* 추가 옵션 */}
        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
          {[
            ["free", "무료 강좌"],
            ["certificate", "수료증 제공"],
            ["credit", "학점은행과정"],
            ["design", "디자인"],
            ["coop", "캡스톤"],
          ].map(([key, label]) => (
            <label key={key} className="inline-flex items-center gap-2 text-[13px]">
              <input
                type="checkbox"
                checked={filters[key]}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, [key]: e.target.checked }))
                }
              />
              {label}
            </label>
          ))}
        </div>

        {/* 액션 */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() =>
              setFilters({
                category: "",
                org: "",
                difficulty: "",
                period: "",
                lang: "",
                teacher: "",
                start: "",
                end: "",
                free: false,
                certificate: false,
                credit: false,
                design: false,
                coop: false,
              })
            }
            className="h-10 rounded-xl border border-slate-200 px-4 text-[13px]"
          >
            초기화
          </button>
          <button
            className="h-10 rounded-xl bg-indigo-600 px-4 text-[13px] font-semibold text-white hover:bg-indigo-700"
            onClick={() => {/* 서버 검색 훅 연결 지점 */}}
          >
            세부 검색 실행
          </button>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <CourseCard key={c.slug} {...c} />
        ))}
      </div>
    </div>
  );
}
