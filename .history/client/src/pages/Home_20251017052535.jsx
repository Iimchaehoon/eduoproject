// src/pages/Home.jsx
import { useMemo, useState } from "react";
 import CourseCard from "../shared/CourseCard";
 import { getCourses, searchCourses } from "../utils/api";

export default function Home() {
  const [q, setQ] = useState("");
  const [merged, setMerged] = useState(false); // 고급 검색 버튼 시각 효과만

  const list = useMemo(() => {
    return q ? searchCourses(q) : getCourses();
  }, [q]);

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* Hero */}
      <section className="mx-auto max-w-[1180px] px-5 pt-10">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 p-8 md:p-10">
          <div className="max-w-[560px] text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold">EDUO</h1>
            <p className="mt-3 text-[15px] md:text-[16px] opacity-90 leading-relaxed">
              누구나, 어디서나, 무료로 들을 수 있는 온라인 강좌. <br />
              대한민국 최고의 교육기관들이 제공하는 양질의 강의를 만나보세요.
            </p>
            <div className="mt-6 flex gap-8 text-white/90 text-sm">
              <div><b className="text-2xl md:text-3xl">1,200+</b><div>강좌</div></div>
              <div><b className="text-2xl md:text-3xl">50+</b><div>교육기관</div></div>
              <div><b className="text-2xl md:text-3xl">100만+</b><div>학습생</div></div>
            </div>
          </div>

          <div className="pointer-events-none absolute right-6 top-6 hidden h-[220px] w-[420px] overflow-hidden rounded-2xl bg-white/10 p-2 backdrop-blur md:block">
            <img
              src="/img/edu_pro2.png"
              alt="banner"
              className="h-full w-full rounded-xl object-cover opacity-95"
            />
          </div>
        </div>
      </section>

      {/* 카테고리 + 검색 바 */}
      <section className="mx-auto max-w-[1180px] px-5 pt-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap gap-3">
            <button className="btn-chip">인문학</button>
            <button className="btn-chip">자연과학</button>
            <button className="btn-chip">컴퓨터과학</button>
            <button className="btn-chip">예체능</button>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1">
              <div className="relative">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="찾고 싶은 강좌를 검색해보세요"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-11 text-[15px] outline-none ring-2 ring-transparent focus:border-indigo-300 focus:ring-indigo-100"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              </div>
            </div>

            <button className="btn-white">강좌 검색</button>
            <button
              onClick={() => setMerged((v) => !v)}
              className={`h-12 rounded-xl px-4 text-[14px] font-semibold ${
                merged ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-700"
              }`}
            >
              고급 검색
            </button>
            <button className="btn-white">AI추천</button>
            <button className="btn-white">최근 본</button>
          </div>
        </div>
      </section>

      {/* 인기 강좌 */}
      <section className="mx-auto max-w-[1180px] px-5 pt-10 pb-16">
        <h2 className="text-[20px] font-extrabold text-slate-900">인기 강좌</h2>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
          {list.length === 0 && (
            <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* --- 조금 더 예쁜 칩/버튼 유틸 클래스 (tailwind 사용) --- */
/* 아래 내용은 글로벌 어디든 한 번만 추가하면 됨: styles/index.css 가장 아래 추천 */
