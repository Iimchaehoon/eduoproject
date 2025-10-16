// src/pages/Home.jsx
import { useMemo, useState } from "react";
import CourseCard from "../shared/CourseCard";
import courseData from "../shared/courseData";

export default function Home() {
  const [query, setQuery] = useState("");

  // 검색(제목 부분 일치, 공백이면 전체)
  const filteredPopular = useMemo(() => {
    const base = courseData.slice(0, 4);
    if (!query.trim()) return base;
    return base.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const filteredAI = useMemo(() => {
    const base = courseData.slice(4);
    if (!query.trim()) return base;
    return base.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <div className="pb-24">
      {/* ===== 히어로 ===== */}
      <section className="mx-auto max-w-[1200px] px-5">
        <div className="mt-6 rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 p-1">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-500/90 via-sky-500/90 to-cyan-400/90 p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* 텍스트 */}
              <div className="lg:col-span-7 text-white">
                <h1 className="text-5xl font-extrabold tracking-tight">EDUO</h1>
                <p className="mt-4 text-[15px] lg:text-[16px] opacity-95">
                  누구나, 어디서나, 무료로 들을 수 있는 온라인 강좌.
                  대한민국 최고의 교육기관들이 제공하는 양질의 강의를 만나보세요.
                </p>

                <div className="mt-8 flex gap-8 text-white/90">
                  <Stat label="강좌" value="1,200+" />
                  <Stat label="교육기관" value="50+" />
                  <Stat label="학습생" value="100만+" />
                </div>
              </div>

              {/* 우측 이미지 */}
              <div className="lg:col-span-5">
                <div className="h-[220px] lg:h-[260px] w-full overflow-hidden rounded-2xl ring-1 ring-white/20 shadow-2xl">
                  <img
                    src="/img/head_section.png"
                    alt="hero"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* 카테고리 칩 */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {[
                { txt: "인문학", icon: "/img/com.png" },
                { txt: "사회과학", icon: "/img/comu.png" },
                { txt: "자연과학", icon: "/img/grap.png" },
                { txt: "공학", icon: "/img/house.png" },
                { txt: "의학", icon: "/img/inmun.png" },
                { txt: "예체능", icon: "/img/ja.png" },
                { txt: "컴퓨터과학", icon: "/img/dot_icon.png" },
                { txt: "법학", icon: "/img/gong.png" },
              ].map((c, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-3 text-white backdrop-blur-sm ring-1 ring-white/20"
                >
                  <img src={c.icon} className="h-5 w-5 object-contain" alt="" />
                  <span className="text-[14px]">{c.txt}</span>
                </div>
              ))}
            </div>

            {/* 검색 바 + 버튼 */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 rounded-full bg-white px-4 py-[10px] shadow-lg">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="찾고 싶은 강좌를 검색해보세요"
                    className="w-full outline-none text-slate-700 placeholder:text-slate-400"
                  />
                  <button
                    aria-label="search"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white"
                  >
                    🔍
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-xl bg-white/90 px-4 py-2 text-slate-800 hover:bg-white">
                  강좌 검색
                </button>
                <button className="rounded-xl bg-white/90 px-4 py-2 text-slate-800 hover:bg-white">
                  고급 검색
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 인기 강좌 ===== */}
      <section className="mx-auto mt-12 max-w-[1200px] px-5">
        <h2 className="text-[22px] font-bold text-slate-900">인기 강좌</h2>
        <p className="mt-1 text-[13px] text-slate-500">
          가장 매력적인 AI 기반 학습 경험을 발견하세요
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPopular.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
          {filteredPopular.length === 0 && (
            <div className="col-span-full rounded-2xl bg-white p-10 text-center text-slate-500 shadow">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </section>

      {/* ===== AI 추천 콘텐츠 ===== */}
      <section className="mx-auto mt-12 max-w-[1200px] px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[22px] font-bold text-slate-900">AI 추천 콘텐츠</h2>
          <button className="text-[13px] text-slate-600 hover:text-slate-800">추천 새로 고침</button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAI.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
          {filteredAI.length === 0 && (
            <div className="col-span-full rounded-2xl bg-white p-10 text-center text-slate-500 shadow">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-2xl font-extrabold">{value}</div>
      <div className="text-[12px] opacity-90">{label}</div>
    </div>
  );
}
