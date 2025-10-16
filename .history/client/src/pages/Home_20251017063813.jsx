import { useMemo } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../shared/CourseCard";
import courseData from "../shared/courseData";

// 배너 카테고리(색상/아이콘/레이블)
const CATEGORIES = [
  { key: "human",  label: "인문학",     color: "from-rose-500 to-red-500",    icon: "/img/bong.png" },
  { key: "social", label: "사회과학",   color: "from-orange-500 to-amber-500",icon: "/img/clock.png" },
  { key: "nature", label: "자연과학",   color: "from-yellow-500 to-lime-500", icon: "/img/bup.png" },
  { key: "eng",    label: "공학",       color: "from-emerald-500 to-teal-500", icon: "/img/house.png" },
  { key: "med",    label: "의학",       color: "from-cyan-500 to-sky-500",    icon: "/img/ja.png" },
  { key: "art",    label: "예체능",     color: "from-indigo-500 to-blue-500", icon: "/img/gong.png" },
  { key: "edu",    label: "교육학",     color: "from-violet-500 to-purple-500",icon: "/img/grap.png" },
  { key: "cs",     label: "컴퓨터과학", color: "from-fuchsia-500 to-pink-500", icon: "/img/dot_icon.png" },
  { key: "biz",    label: "경영학",     color: "from-rose-500 to-pink-500",   icon: "/img/kyung.png" },
  { key: "law",    label: "법학",       color: "from-slate-500 to-gray-600",  icon: "/img/robot.png" },
];

export default function Home() {
  // 인기 강좌 4개 + AI 추천 3개 (기존 데이터 그대로 활용)
  const popular = useMemo(() => courseData.slice(0, 4), []);
  const aiPicks = useMemo(() => courseData.slice(4, 7), []);

  return (
    <div className="min-h-screen bg-skin-base text-skin-ink">
      {/* ===== Hero 헤더 (배경 + 필름 오버레이) ===== */}
      <section className="relative hero-wrap">
        {/* 배경 이미지 */}
        <img
          src="/img/head_section.png"
          alt="헤더 배경"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* 필름(어둡게) */}
        <div className="absolute inset-0 bg-black/45" />
        {/* 컨텐츠 */}
        <div className="relative mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <div className="flex items-center justify-between gap-8">
            <div className="text-white">
              <h1 className="text-4xl font-extrabold tracking-tight">EDUO</h1>
              <p className="mt-3 text-[15px] opacity-90">
                누구나, 어디서나, 무료로 들을 수 있는 온라인 강좌<br />
                대한민국 최고의 교육기관들이 제공하는 양질의 강의를 만나보세요.
              </p>

              <div className="mt-8 flex gap-8 text-white/90">
                <Stat label="강좌" value="1,200+" />
                <Stat label="교육기관" value="50+" />
                <Stat label="수강생" value="100만+" />
              </div>
            </div>

            {/* 배너 우측 이미지 (살짝 둥글게) */}
            <div className="hidden w-[460px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10 md:block">
              <img src="/img/deep.png" alt="배너 썸네일" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* === 카테고리 그리드 === */}
          <div className="mt-10 grid grid-cols-5 gap-4 sm:grid-cols-10">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                className={`group category-tile bg-gradient-to-br ${c.color}`}
                type="button"
                aria-label={c.label}
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 shadow-sm ring-1 ring-black/5">
                  <img src={c.icon} alt="" className="h-5 w-5" />
                </span>
                <span className="mt-1.5 text-[13px] font-semibold text-white drop-shadow">
                  {c.label}
                </span>
              </button>
            ))}
          </div>

          {/* === 검색 바 === */}
          <div className="mt-5 flex items-center gap-3">
            <div className="searchbar">
              <span className="i-magnify" />
              <input
                className="flex-1 bg-transparent text-[14px] placeholder-white/80 outline-none"
                placeholder="찾고 싶은 강좌를 검색해보세요"
              />
              <button className="chip">검색</button>
            </div>

            <div className="hidden gap-2 sm:flex">
              <button className="chip-ghost">인기 검색어</button>
              <button className="chip-ghost">데이터 사이언스</button>
              <button className="chip-ghost">머신러닝</button>
              <button className="chip-ghost">웹 개발</button>
              <button className="chip-ghost">AI</button>
            </div>

            <div className="hidden sm:block">
              <button className="btn-solid">고급 검색</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 인기 강좌 ===== */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <Header title="인기 강좌" subtitle="가장 매력적인 AI 기반 학습 경험을 발견하세요" />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {/* ===== AI 추천 콘텐츠 ===== */}
      <section className="mx-auto max-w-6xl px-6 pb-10">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
            <h3 className="text-lg font-semibold">AI 추천 콘텐츠</h3>
          </div>
          <button className="text-sm text-sky-600 hover:underline">추천 새로 고침</button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiPicks.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {/* ===== CTA: 혁신적인 학습의 준비가 되셨나요? ===== */}
      <section className="bg-gradient-to-r from-indigo-600 to-violet-600 py-14 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h3 className="text-2xl font-extrabold tracking-tight">
            혁신적인 학습의 준비가 되셨나요?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-white/85">
            이미 AI 기반 학습으로 교육의 미래를 경험하고 있는 수많은 학습자와 함께하세요.
          </p>
          <button className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[15px] font-semibold text-indigo-700 shadow-sm hover:bg-white/90">
            무료로 시작하기
            <span className="i-arrow" />
          </button>
        </div>
      </section>
    </div>
  );
}

/* — 작은 컴포넌트 — */
function Stat({ label, value }) {
  return (
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm opacity-85">{label}</div>
    </div>
  );
}

function Header({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <p className="mt-1 text-[15px] text-skin-muted">{subtitle}</p>
    </div>
  );
}
