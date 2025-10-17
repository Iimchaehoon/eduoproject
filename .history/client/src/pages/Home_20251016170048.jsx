import { useNavigate } from "react-router-dom";

/* ---------- 데이터 ---------- */
const categories = [
  { label: "인문학",  icon: "/img/inmun.png",  bg: "#FF6A59" },
  { label: "사회과학", icon: "/img/sa.png",     bg: "#FF8A26" },
  { label: "자연과학", icon: "/img/ja.png",     bg: "#FFBE2E" },
  { label: "공학",    icon: "/img/gong.png",   bg: "#20C788" },
  { label: "의학",    icon: "/img/ui.png",     bg: "#1EC7D8" },
  { label: "예체능",   icon: "/img/ye.png",     bg: "#4F7CFF" },
  { label: "교육학",   icon: "/img/gyo.png",    bg: "#7B8CFF" },
  { label: "컴퓨터과학",icon: "/img/com.png",   bg: "#8B65FF" },
  { label: "경영학",   icon: "/img/kyung.png",  bg: "#FF5BA7" },
  { label: "법학",    icon: "/img/bup.png",    bg: "#7B8594" },
];

const topCourses = [
  {
    slug: "ml-advanced",
    badgeLeft: "AI · 머신러닝",
    match: "95% 매칭",
    title: "머신러닝 심화 과정",
    uni: "김세라 · KAIST",
    desc: "데이터 사이언스 수강 이후라면 높은 적합도를 보입니다",
    img: "/img/muchine.png",
  },
  {
    slug: "react-advanced",
    badgeLeft: "웹 · 프론트",
    match: "88% 매칭",
    title: "React 고급 개발 과정",
    uni: "이명환 · 서울대학교",
    desc: "웹 개발 기초 완료 후 다음 단계로 추천됩니다",
    img: "/img/react.png",
  },
  {
    slug: "data-visual",
    badgeLeft: "데이터분석",
    match: "82% 매칭",
    title: "데이터 시각화 마스터클래스",
    uni: "박시경 · 연세대학교",
    desc: "데이터 분석 스킬을 보완한 시각화 전문 과정입니다",
    img: "/img/data.png",
  },
  {
    slug: "blockchain-basic",
    badgeLeft: "블록체인",
    match: "81% 매칭",
    title: "블록체인 기초부터 실무",
    uni: "최필윤희 · 한양대학교",
    desc: "최신 기술 트렌드에 관심이 많다면 추천",
    img: "/img/block.png",
  },
];

const aiRecs = [
  {
    ai: "AI 일치: 95%",
    tag: "고급 프로그래밍",
    title: "고급 파이썬 및 알고리즘",
    img: "/img/python.png",
    weeks: "14주",
    students: "23,000명",
    slug: "py-advanced",
  },
  {
    ai: "AI 일치: 89%",
    tag: "데이터 과학",
    title: "파이썬으로 데이터 과학",
    img: "/img/pyton_data.png", // 요청하신 파일명 그대로
    weeks: "14주",
    students: "23,000명",
    slug: "py-data",
  },
  {
    ai: "AI 일치: 87%",
    tag: "딥러닝",
    title: "신경망 및 딥러닝",
    img: "/img/deep.png",
    weeks: "14주",
    students: "23,000명",
    slug: "dl-nn",
  },
];

/* ---------- 페이지 컴포넌트 ---------- */
export default function Home() {
  const nav = useNavigate();

  // AI 타이틀 아이콘: bong → 없으면 dot_icon
  const aiIcon = new Image();
  aiIcon.src = "/img/bong.png";
  const aiTitleIcon = aiIcon.complete ? "/img/bong.png" : "/img/dot_icon.png";

  return (
    <div className="bg-[#F7F9FC]">
      {/* HERO */}
      <section className="max-w-[1200px] mx-auto px-5 pt-6">
        <div className="relative h-[520px] rounded-3xl overflow-hidden shadow-[0_18px_44px_rgba(23,38,80,0.20)]">
          <img
            src="/img/head_section.png"
            alt="hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* 파란 오버레이 (피그마 느낌) */}
          <div className="absolute inset-0 bg-[rgba(48,73,216,0.52)]" />
          <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
            <h1 className="text-[56px] md:text-[64px] font-extrabold leading-none tracking-tight">
              EDUO
            </h1>
            <p className="mt-4 text-[16px] md:text-[18px] opacity-95">
              누구나, 어디서나, 무료로 들을 수 있는 온라인 강좌
            </p>
            <p className="mt-1 text-[14px] md:text-[16px] opacity-90">
              대한민국 최고의 교육기관들이 제공하는 양질의 강의를 만나보세요
            </p>

            <div className="mt-8 md:mt-10 flex items-center gap-12">
              <Stat number="1,200+" label="강좌" />
              <Stat number="50+" label="대학" />
              <Stat number="100만+" label="수강생" />
            </div>
          </div>
        </div>

        {/* 카테고리 10개 타일 */}
        <div className="grid grid-cols-5 lg:grid-cols-10 gap-4 mt-7">
          {categories.map((c) => (
            <div
              key={c.label}
              className="rounded-xl p-4 aspect-square flex flex-col items-center justify-center shadow-[0_10px_26px_rgba(16,24,40,0.08)] hover:scale-[1.05] transition-transform duration-200 ease-out"
              style={{ backgroundColor: c.bg }}
            >
              <img src={c.icon} alt={c.label} className="w-9 h-9 mb-2" />
              <span className="text-white font-semibold text-[13px]">{c.label}</span>
            </div>
          ))}
        </div>

        {/* 검색바 */}
        <div className="mt-7">
          <div className="relative bg-white rounded-full shadow-[0_16px_36px_rgba(16,24,40,0.10)] h-12 md:h-14 flex items-center px-4 md:px-5">
            <img
              src="/img/dot_icon.png"
              alt=""
              className="w-5 h-5 opacity-70"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <input
              className="ml-2 md:ml-3 flex-1 outline-none text-[13px] md:text-[14px]"
              placeholder="찾고 싶은 강좌를 검색해보세요"
            />
            <button className="ml-2 md:ml-3 px-5 h-9 md:h-10 rounded-full bg-[#E9ECFF] text-[#5B66FF] text-[13px] md:text-sm font-semibold">
              검색
            </button>
          </div>

          {/* 필터 pill + 버튼 */}
          <div className="flex flex-wrap gap-2.5 md:gap-3 items-center justify-center md:justify-start mt-5">
            {["인기 검색어", "데이터 사이언스", "머신러닝", "웹 개발", "AI"].map((t) => (
              <span
                key={t}
                className="px-3.5 h-9 inline-flex items-center rounded-full text-[12px] md:text-[13px] bg-white shadow-[0_6px_16px_rgba(16,24,40,0.06)]"
              >
                {t}
              </span>
            ))}
            <div className="flex gap-2 md:gap-3 ml-1 md:ml-2">
              <button className="px-4 h-9 rounded-full bg-[#EEF1FF] text-[#4450FF] text-[12px] md:text-[13px]">
                강좌 검색
              </button>
              <button className="px-4 h-9 rounded-full bg-[#E6E9EF] text-[#51607B] text-[12px] md:text-[13px]">
                고급 검색
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 인기 강좌 */}
      <section className="max-w-[1200px] mx-auto px-5 mt-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[24px] md:text-[28px] font-extrabold text-[#0F1B2D]">인기 강좌</h2>
            <p className="text-[#6B7686] mt-1 text-[13px] md:text-[14px]">
              가장 매력적인 AI 기반 학습 경험을 발견하세요
            </p>
          </div>
          <button className="px-3.5 h-9 rounded-lg bg-[#EEF1FF] text-[#5B66FF] text-[12px] md:text-[13px] hover:brightness-105">
            더 많은 추천 강좌 보기
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-6">
          {topCourses.map((c) => (
            <CourseCard key={c.slug} {...c} onClick={() => nav(`/course/${c.slug}`)} />
          ))}
        </div>
      </section>

      {/* AI 추천 콘텐츠 */}
      <section className="max-w-[1200px] mx-auto px-5 mt-12 mb-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/img/bong.png"
              alt=""
              className="w-5 h-5"
              onError={(e) => (e.currentTarget.src = "/img/dot_icon.png")}
            />
            <h3 className="text-[18px] md:text-[20px] font-extrabold text-[#0F1B2D]">
              AI 추천 콘텐츠
            </h3>
          </div>
          <button className="text-[#6B70FF] text-[12px] md:text-[13px] hover:underline">
            추천 새로 고침
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-6">
          {aiRecs.map((r) => (
            <div
              key={r.slug}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_12px_28px_rgba(16,24,40,0.08)] hover:shadow-[0_18px_40px_rgba(16,24,40,0.12)] hover:scale-[1.05] transition-transform duration-200 ease-out"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={r.img} className="w-full h-full object-cover" />
                {/* AI 일치 배지(보라) */}
                <span className="absolute left-3 top-3 px-2.5 h-7 rounded-full bg-[#6A56FF] text-white text-[12px] font-semibold inline-flex items-center shadow-[0_6px_16px_rgba(16,24,40,0.18)]">
                  {r.ai}
                </span>
              </div>
              <div className="p-5">
                <span className="inline-block px-2.5 py-1 text-[12px] rounded-md bg-[#EEF2FF] text-[#5560FF]">
                  {r.tag}
                </span>
                <h4 className="mt-2 text-[18px] font-bold text-[#0F1B2D]">{r.title}</h4>
                <div className="mt-3 flex items-center gap-6 text-[13px] text-[#6B7686]">
                  <span>🗓 {r.weeks}</span>
                  <span>👥 {r.students} 학생</span>
                </div>
                <div className="mt-5">
                  <button
                    className="px-4 h-10 rounded-lg bg-[#2C6BFF] text-white text-sm font-semibold hover:brightness-110"
                    onClick={() => nav(`/course/${r.slug}`)}
                  >
                    수강신청
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------- 서브 컴포넌트 ---------- */
function Stat({ number, label }) {
  return (
    <div className="text-left">
      <div className="text-[22px] md:text-[28px] font-extrabold">{number}</div>
      <div className="text-[12px] md:text-sm opacity-90">{label}</div>
    </div>
  );
}

function CourseCard({ img, badgeLeft, match, title, uni, desc, onClick }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_12px_28px_rgba(16,24,40,0.08)] hover:shadow-[0_18px_40px_rgba(16,24,40,0.12)] hover:scale-[1.05] transition-transform duration-200 ease-out">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={img} className="w-full h-full object-cover" />
        {/* 좌측 배지(보라, 불투명) */}
        <span className="absolute left-3 top-3 px-3 h-7 rounded-full bg-[#6A56FF] text-white text-[12px] font-semibold inline-flex items-center shadow-[0_6px_16px_rgba(16,24,40,0.18)]">
          {badgeLeft}
        </span>
        {/* 우측 매칭율(어두운 반투명) */}
        <span className="absolute right-3 top-3 px-3 h-7 rounded-full bg-[#111827CC] text-white text-[12px] font-semibold inline-flex items-center">
          {match}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-[18px] text-[#0F1B2D]">{title}</h3>
        <p className="text-[13px] text-[#6B7686] mt-1">{uni}</p>

        <div className="mt-3 p-3 rounded-lg bg-[#F3F6FF] text-[#334155] text-[13px]">
          {desc}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[#93A0B3] text-[13px]">
            <span>🗓 14주</span>
            <span>👥 23,000명 학생</span>
          </div>
          <button
            onClick={onClick}
            className="px-4 h-10 rounded-lg bg-[#2C6BFF] text-white text-sm font-semibold hover:brightness-110"
          >
            수강신청
          </button>
        </div>
      </div>
    </div>
  );
}
