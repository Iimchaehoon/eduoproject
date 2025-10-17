import React from "react";
import CourseCard from "../components/CourseCard";

export default function Home() {
  // 피그마 카테고리: 아이콘 파일명 매핑(전부 /public/img/ 에 존재)
  const categories = [
    { name: "인문학",    icon: "/img/inmun.png",  color: "from-[#FF6A5B] to-[#FFAC6A]" },
    { name: "사회과학",  icon: "/img/sa.png",     color: "from-[#FF8B3D] to-[#FFC05B]" },
    { name: "자연과학",  icon: "/img/ja.png",     color: "from-[#FFC32D] to-[#FFE18A]" },
    { name: "공학",      icon: "/img/gong.png",   color: "from-[#2ED573] to-[#7BED9F]" },
    { name: "의학",      icon: "/img/ui.png",     color: "from-[#38BDF8] to-[#7DD3FC]" },
    { name: "예체능",    icon: "/img/ye.png",     color: "from-[#60A5FA] to-[#A5B4FC]" },
    { name: "교육학",    icon: "/img/gyo.png",    color: "from-[#4F46E5] to-[#818CF8]" },
    { name: "컴퓨터과학",icon: "/img/com.png",    color: "from-[#8B5CF6] to-[#C084FC]" },
    { name: "경영학",    icon: "/img/kyung.png",  color: "from-[#EC4899] to-[#F472B6]" },
    { name: "법학",      icon: "/img/bup.png",    color: "from-[#6B7280] to-[#9CA3AF]" },
  ];

  // 상단 “인기 강좌” 카드 4개
  const topCards = [
    {
      image: "/img/muchine.png",
      badgeLeft: "AI · 머신러닝",
      badgeRight: "95% 매칭",
      title: "머신러닝 심화 과정",
      author: "김세라 · KAIST",
      desc: "데이터 사이언스 수강 이후라면 높은 적합도를 보입니다",
      rating: "4.9",
      reviews: "12.4천",
    },
    {
      image: "/img/react.png",
      badgeLeft: "웹개발",
      badgeRight: "88% 매칭",
      title: "React 고급 개발 과정",
      author: "이명환 · 서울대학교",
      desc: "웹 개발 기초 완료 후 다음 단계로 추천됩니다",
      rating: "4.8",
      reviews: "9.8천",
    },
    {
      image: "/img/data.png",
      badgeLeft: "데이터분석",
      badgeRight: "82% 매칭",
      title: "데이터 시각화 마스터클래스",
      author: "박시경 · 연세대학교",
      desc: "데이터 분석 스킬을 보완한 시각화 전문 과정입니다",
      rating: "4.7",
      reviews: "6.5천",
    },
    {
      image: "/img/block.png",
      badgeLeft: "블록체인",
      title: "블록체인의 기초부터 실무",
      author: "최문희교수 · 한양대학교",
      desc: "최신 기술 트렌드에 관심있는 분께 추천",
      rating: "4.6",
      reviews: "5.2천",
    },
  ];

  // 하단 “AI 추천 콘텐츠” 카드 3개 (요청한 pyton_data 반영)
  const aiCards = [
    {
      image: "/img/python.png",
      badgeLeft: "AI 일치: 95%",
      title: "고급 파이썬 및 알고리즘",
      author: "고급 프로그래밍",
      desc: "복잡한 데이터 구조 및 AI 기반 코드로 알고리즘적 사고",
      rating: "4.9",
      reviews: "1.2만",
    },
    {
      image: "/img/pyton_data.png", // 주신 파일명 그대로(철자 주의)
      badgeLeft: "AI 일치: 89%",
      title: "파이썬으로 데이터 과학",
      author: "데이터 과학",
      desc: "데이터 분석, 시각화 및 핸즈온 프로젝트로 머신러닝.",
      rating: "4.8",
      reviews: "2.5천",
    },
    {
      image: "/img/deep.png",
      badgeLeft: "AI 일치: 87%",
      title: "신경망 및 딥러닝",
      author: "딥러닝",
      desc: "실전 AI 애플리케이션을 위한 신경망 구축 및 훈련.",
      rating: "4.7",
      reviews: "1.8천",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      {/* 히어로 영역 */}
      <section className="relative">
        <img
          src="/img/head_section.png"
          alt="헤드 섹션 배경"
          className="w-full h-[360px] md:h-[420px] object-cover rounded-b-[28px]"
        />

        {/* 중앙 타이틀/카피 - 피그마 스타일 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-[44px] md:text-[56px] font-extrabold tracking-tight drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]">
            EDUO
          </h1>
          <p className="mt-4 text-white/95 text-[16px] md:text-[18px] leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]">
            누구나, 어디서나, 무료로 들을 수 있는 온라인 강좌
            <br />
            대한민국 최고의 교육기관들이 제공하는 양질의 강의를 만나보세요
          </p>

          {/* 상단 지표 */}
          <div className="mt-6 flex gap-10 text-white/90 text-[14px] md:text-[16px]">
            <div><b className="text-[20px] md:text-[22px]">1,200+</b><span className="ml-1">강좌</span></div>
            <div><b className="text-[20px] md:text-[22px]">50+</b><span className="ml-1">대학</span></div>
            <div><b className="text-[20px] md:text-[22px]">100만+</b><span className="ml-1">수강생</span></div>
          </div>
        </div>
      </section>

      {/* 카테고리 바 (히어로 아래, 하얀 바 위에 컬러 박스) */}
      <section className="-mt-12 md:-mt-16">
        <div className="mx-auto max-w-6xl bg-white rounded-3xl shadow-[0_12px_36px_rgba(0,0,0,0.08)] px-5 md:px-8 py-6 md:py-7">
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3 md:gap-4">
            {categories.map((c) => (
              <button
                key={c.name}
                className="group rounded-2xl p-4 text-center hover-grow"
              >
                <div
                  className={`bg-gradient-to-br ${c.color} rounded-2xl w-full h-[84px] md:h-[92px] shadow-[0_8px_22px_rgba(0,0,0,0.08)] flex items-center justify-center`}
                >
                  <img src={c.icon} alt={c.name} className="w-10 h-10" />
                </div>
                <div className="mt-2.5 text-[13px] md:text-[14px] font-semibold text-[#111827]">
                  {c.name}
                </div>
              </button>
            ))}
          </div>

          {/* 검색바 + 태그 + 버튼 */}
          <div className="mt-7 md:mt-8 flex flex-col items-center">
            {/* 검색 입력 */}
            <div className="w-full md:w-[820px] relative">
              <input
                className="w-full h-[52px] md:h-[58px] pl-12 pr-28 rounded-full border border-[#e5e7eb] bg-white/85 shadow-[0_10px_30px_rgba(0,0,0,0.06)] outline-none text-[14px]"
                placeholder="찾고 싶은 강좌를 검색해보세요"
              />
              <img
                src="/img/dot_icon.png"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 opacity-70"
                alt="검색"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-full bg-[#e5e7eb] text-[#111827] text-[14px]">
                검색
              </button>
            </div>

            {/* 키워드 라벨 + 버튼 */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-[13px]">
              <span className="flex items-center gap-1.5 text-[#64748b] mr-2">
                <img src="/img/dot_icon.png" className="w-3.5 h-3.5" />
                인기 검색어
              </span>
              {["데이터 사이언스", "머신러닝", "웹 개발", "AI"].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full bg-[#f1f5f9] text-[#334155]">
                  {t}
                </span>
              ))}
              <button className="ml-3 px-4 py-1.5 rounded-lg border border-[#cbd5e1] text-[#334155]">
                강좌 검색
              </button>
              <button className="px-4 py-1.5 rounded-lg bg-[#e5e7eb] text-[#111827]">
                고급 검색
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 인기 강좌 */}
      <section className="mx-auto max-w-6xl px-4 md:px-0 mt-10 md:mt-14">
        <h2 className="text-[22px] md:text-[26px] font-extrabold text-[#0f172a]">인기 강좌</h2>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topCards.map((c, idx) => (
            <CourseCard key={idx} {...c} />
          ))}
        </div>
      </section>

      {/* AI 추천 콘텐츠 */}
      <section className="mx-auto max-w-6xl px-4 md:px-0 mt-12 md:mt-16 mb-14">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] md:text-[22px] font-extrabold text-[#0f172a] flex items-center gap-2">
            <img src="/img/dot_icon.png" className="w-5 h-5" alt="섹션 아이콘" />
            AI 추천 콘텐츠
          </h2>

          <div className="text-[#6366f1] text-[13px] md:text-[14px] flex items-center gap-2">
            추천 새로 고침
            <img src="/img/dot_icon.png" className="w-3.5 h-3.5 opacity-60" />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          {aiCards.map((c, idx) => (
            <CourseCard key={idx} {...c} />
          ))}
        </div>
      </section>
    </div>
  );
}
