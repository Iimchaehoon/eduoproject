// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { COURSES } from "../shared/courseData.js";
import CourseCard from "../components/shard/CourseCard.jsx";

export default function Home() {
  // 다양한 썸네일을 가진 코스들에서 인기/추천 분리
  const popular = COURSES.slice(0, 4);
  const aiReco = COURSES.slice(4, 7);

  return (
    <div className="bg-slate-50">
      {/* ===== Hero ===== */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 pt-10 pb-14">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 text-white">
            <div className="p-10 lg:p-14 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight">EDUO</h1>
                <p className="mt-4 text-white/90 leading-relaxed">
                  누구나, 어디서나, 무료로 들을 수 있는 온라인 강좌.
                  <br />대한민국 최고의 교육기관들이 제공하는 양질의 강의를 만나보세요.
                </p>

                <div className="mt-8 flex gap-6 text-white/90">
                  <Stat label="강좌" value="1,200+" />
                  <Stat label="교육기관" value="50+" />
                  <Stat label="학습생" value="100만+" />
                </div>
              </div>

              {/* 배경 썸네일 영역(가벼운 장식) */}
              <div className="hidden lg:block">
                <img
                  src="/img/edu_pro2.png"
                  alt="hero"
                  onError={(e) => (e.currentTarget.src = "/img/main_logo.png")}
                  className="w-full h-[260px] object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 카테고리/검색바 ===== */}
      <section className="mx-auto max-w-6xl px-5 -mt-8">
        <div className="rounded-2xl bg-white shadow-soft border border-slate-100 p-5">
          <div className="grid md:grid-cols-4 gap-3">
            <CategoryChip icon="📚" label="인문학" />
            <CategoryChip icon="🧪" label="자연과학" />
            <CategoryChip icon="💻" label="컴퓨터과학" />
            <CategoryChip icon="🎨" label="예체능" />
          </div>

          <div className="mt-5 flex flex-col md:flex-row gap-3 items-stretch">
            <div className="relative flex-1">
              <input
                placeholder="찾고 싶은 강좌를 검색해보세요"
                className="w-full h-12 rounded-xl border px-4 pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            </div>
            <div className="grid grid-cols-4 gap-2 md:w-[320px]">
              <button className="h-12 rounded-xl border hover:bg-slate-50">강좌 검색</button>
              <button className="h-12 rounded-xl border hover:bg-slate-50">고급 검색</button>
              <button className="h-12 rounded-xl border hover:bg-slate-50">AI추천</button>
              <button className="h-12 rounded-xl border hover:bg-slate-50">최근 본</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 인기 강좌 ===== */}
      <section className="mx-auto max-w-6xl px-5 py-10">
        <SectionTitle title="인기 강좌" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popular.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {/* ===== AI 추천 콘텐츠 ===== */}
      <section className="mx-auto max-w-6xl px-5 pb-12">
        <div className="flex items-center justify-between">
          <SectionTitle title="AI 추천 콘텐츠" />
          <Link
            to="/search"
            className="text-sm text-indigo-700 hover:underline font-medium"
          >
            추천 새로 고침 ↻
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiReco.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white p-10 text-center">
          <h3 className="text-2xl font-bold">혁신적인 학습의 준비가 되셨나요?</h3>
          <p className="mt-2 text-white/90">
            AI 기반 학습으로 교육의 미래를 경험하세요.
          </p>
          <Link
            to="/search"
            className="inline-block mt-6 px-5 h-11 rounded-xl bg-white text-indigo-600 font-semibold hover:brightness-95"
          >
            무료로 시작하기
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ——— sub components ——— */
function Stat({ label, value }) {
  return (
    <div>
      <div className="text-2xl font-extrabold">{value}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}

function CategoryChip({ icon, label }) {
  return (
    <button className="h-12 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 text-left flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function SectionTitle({ title }) {
  return <h2 className="text-xl font-bold mb-4">{title}</h2>;
}
