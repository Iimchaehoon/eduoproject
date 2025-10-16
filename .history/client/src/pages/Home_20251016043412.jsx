
import Header from "../shared/Header";
import Footer from "../shared/Footer";
import CourseCard from "../shared/CourseCard";
import { Link, useNavigate } from "react-router-dom";

const categories = [
  { name:"인문학", icon:"/img/com.png" },
  { name:"사회과학", icon:"/img/data.png" },
  { name:"자연과학", icon:"/img/cloud.png" },
  { name:"공학", icon:"/img/react.png" },
  { name:"의학", icon:"/img/kyung.png" },
  { name:"예체능", icon:"/img/ye.png" },
  { name:"교육학", icon:"/img/ui.png" },
  { name:"컴퓨터과학", icon:"/img/python.png" },
  { name:"경영학", icon:"/img/block.png" },
  { name:"법학", icon:"/img/gong.png" },
];

const popular = [
  {
    title:"머신러닝 심화 과정",
    univ:"KAIST",
    weeks:"14주",
    rating:4.9,
    tags:["AI·머신러닝","95% 매칭"],
    img:"/img/alfago.png",
  },
  {
    title:"React 고급 개발 과정",
    univ:"서울대학교",
    weeks:"8주",
    rating:4.8,
    tags:["웹개발","88% 매칭"],
    img:"/img/react.png",
  },
  {
    title:"데이터 시각화 마스터클래스",
    univ:"연세대학교",
    weeks:"8주",
    rating:4.7,
    tags:["데이터과학","82% 매칭"],
    img:"/img/data.png",
  },
  {
    title:"블록체인 실무",
    univ:"명지대학교",
    weeks:"14주",
    rating:4.6,
    tags:["최신기술"],
    img:"/img/block.png",
  },
  {
    title:"전기자동차 배터리 시스템",
    univ:"한양대학교",
    weeks:"14주",
    rating:4.6,
    tags:["공학"],
    img:"/img/battery.png",
  },
  {
    title:"파이썬 & 판다스 분석",
    univ:"부산대학교",
    weeks:"14주",
    rating:4.6,
    tags:["데이터","파이썬"],
    img:"/img/pandas.png",
  },
];

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-xl py-10 md:py-14">
          <div className="relative overflow-hidden rounded-xl2 shadow-card border border-gray-100">
            <img src="/img/head_section.png" className="w-full h-[320px] md:h-[420px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-black/10" />
            <div className="absolute left-8 top-10 md:left-14 md:top-16 text-white">
              <div className="text-4xl md:text-6xl font-extrabold tracking-tight">EDUO</div>
              <p className="mt-3 text-white/90 max-w-xl">
                누구나, 어디서나, 무료로 들을 수 있는 온라인 강좌
              </p>

              {/* 큰 검색 바 */}
              <div className="mt-8">
                <div className="bg-white/95 backdrop-blur rounded-full shadow-card flex items-center p-2 w-[90vw] max-w-[740px]">
                  <input
                    className="flex-1 bg-transparent px-4 h-12 outline-none text-ink-900"
                    placeholder="보고 싶은 강좌를 검색해보세요"
                    onKeyDown={(e)=>{ if(e.key==="Enter"){ nav(`/search?q=${encodeURIComponent(e.currentTarget.value)}`);} }}
                  />
                  <button
                    onClick={(e)=>{
                      const input = (e.currentTarget.previousSibling);
                      nav(`/search?q=${encodeURIComponent(input.value || "")}`);
                    }}
                    className="btn-primary rounded-full px-6"
                  >검색</button>
                </div>
              </div>
            </div>
          </div>

          {/* 카테고리 아이콘 바 */}
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 mt-6">
            {categories.map((c)=>(
              <button key={c.name} className="flex flex-col items-center justify-center gap-2 bg-white border border-gray-100 rounded-xl p-3 shadow-soft hover:shadow-card transition">
                <img src={c.icon} className="h-8" />
                <span className="text-xs text-ink-700">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 인기 강좌 */}
      <section className="container-xl py-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">인기 강좌</h2>
            <p className="text-ink-500 mt-1">가장 매력적인 AI 기반 학습 경험을 발견하세요</p>
          </div>
          <Link to="/search" className="btn-ghost">더 많은 추천 강좌 보기</Link>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {popular.map((c, i)=>(
            <CourseCard key={i} {...c} />
          ))}
        </div>
      </section>

      {/* AI 추천 컨텐츠 */}
      <section className="container-xl py-8">
        <div className="flex items-center gap-2">
          <span className="text-brand-600">✨</span>
          <h3 className="text-xl font-semibold">AI 추천 콘텐츠</h3>
          <button className="ml-auto text-sm text-brand-600 hover:underline">추천 새로 고침 ↻</button>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          <CourseCard title="고급 파이썬 및 알고리즘" univ="온라인" weeks="14주" rating={4.9} tags={["AI 일치: 95%"]} img="/img/python.png" />
          <CourseCard title="파이썬으로 데이터 과학" univ="온라인" weeks="14주" rating={4.8} tags={["AI 일치: 89%"]} img="/img/pyton_data.png" />
          <CourseCard title="신경망 및 딥러닝" univ="온라인" weeks="14주" rating={4.7} tags={["AI 일치: 87%"]} img="/img/deep.png" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
