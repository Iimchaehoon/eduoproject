import Header from "../shared/Header";
import Footer from "../shared/Footer";
import SearchCard from "../shared/SearchCard";
import SearchToolbar from "../shared/SearchToolbar";
import { useMemo, useState } from "react";

const DATA = [
  { title:"클라우드 보안 엔지니어 실무과정", univ:"원티드테크", weeks:"14주", rating:4.6, tags:["보안","클라우드"], img:"/img/cloud.png" },
  { title:"인체공학의 이해",               univ:"원티드테크", weeks:"14주", rating:4.6, tags:["AI","인체공학"], img:"/img/human.png", highlight:"고급" },
  { title:"전기자동차 배터리 시스템",       univ:"원티드테크", weeks:"14주", rating:4.6, tags:["공학","배터리"], img:"/img/battery.png" },
  { title:"작물재배 전문가 기초",           univ:"원티드테크", weeks:"14주", rating:4.6, tags:["농업","실무"], img:"/img/seed.png" },
  { title:"생체데이터와 인공지능의 이해",   univ:"원티드테크", weeks:"14주", rating:4.6, tags:["AI","바이오"], img:"/img/edu_pro2.png" },
  { title:"파이썬 & 판다스로 데이터 분석",   univ:"원티드테크", weeks:"14주", rating:4.6, tags:["데이터","파이썬"], img:"/img/pandas.png" },
  { title:"블록체인 실무",                  univ:"원티드테크", weeks:"14주", rating:4.6, tags:["블록체인"], img:"/img/block.png" },
  { title:"데이터 시각화 마스터클래스",     univ:"연세대학교", weeks:"8주",  rating:4.7, tags:["데이터","시각화"], img:"/img/data.png" },
  { title:"신경망 및 딥러닝",               univ:"한양대학교", weeks:"14주", rating:4.9, tags:["AI","딥러닝"], img:"/img/deep.png" },
  // 필요 시 더 많은 카드 계속 추가 가능 (피그마는 9장/페이지 기준)
];

export default function Search() {
  const [sort, setSort] = useState("최신순");
  const [view, setView] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const items = useMemo(()=>{
    // 정렬 로직은 데모: 평점순만 예시
    if (sort === "평점순") {
      return [...DATA].sort((a,b)=>b.rating - a.rating);
    }
    return DATA;
  }, [sort]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="container-xl py-8 space-y-6">
        {/* 상단 타이틀 & 툴바 */}
        <div className="flex items-center gap-2 text-sm text-ink-500">
          <span className="hover:underline cursor-pointer">돌아가기</span>
          <span>›</span>
          <span className="text-ink-900 font-medium">‘강좌’에 대한 검색 결과</span>
        </div>

        <SearchToolbar
          total={items.length}
          sort={sort}
          onChangeSort={setSort}
          view={view}
          onChangeView={setView}
          onOpenFilters={()=>setShowFilters(true)}
        />

        {/* 필터 그리드 (피그마 2행 x 5~6칸 레이아웃) */}
        <section className="card p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm">
              <option>카테고리 선택</option><option>AI</option><option>데이터</option>
            </select>
            <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm">
              <option>교육기관</option><option>서울대학교</option><option>연세대학교</option>
            </select>
            <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm">
              <option>난이도 선택</option><option>초급</option><option>중급</option><option>고급</option>
            </select>
            <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm">
              <option>기간 선택</option><option>8주</option><option>14주</option>
            </select>
            <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm">
              <option>언어 선택</option><option>한국어</option><option>영어</option>
            </select>
            <input className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm" placeholder="강사명" />

            <input className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm" type="date" placeholder="시작일(이후)" />
            <input className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm" type="date" placeholder="종료일(이전)" />
            <select className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm">
              <option>평점</option><option>4.5+</option><option>4.0+</option>
            </select>
          </div>

          {/* 추가 옵션 */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4 text-sm text-ink-700">
            {["수료증 제공","무료과정","마이크로러닝","학점은행제과정","디지털","해외강의"].map((t)=>(
              <label key={t} className="flex items-center gap-2">
                <input type="checkbox" className="accent-brand-600" /> {t}
              </label>
            ))}
          </div>

          {/* 하단 버튼 */}
          <div className="mt-4 flex items-center gap-2">
            <button className="btn-ghost">초기화</button>
            <button className="btn-primary">세부 검색 실행</button>
          </div>
        </section>

        {/* 카드 그리드 */}
        {view === "grid" ? (
          <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {items.slice(0, 9).map((c, i)=>(
              <SearchCard key={i} {...c} />
            ))}
          </section>
        ) : (
          <section className="space-y-4">
            {items.slice(0, 9).map((c,i)=>(
              <div key={i} className="card p-4 flex gap-4">
                <img src={c.img} className="w-52 h-32 object-cover rounded-lg border" />
                <div className="flex-1">
                  <div className="text-xs text-ink-500">{c.univ} · {c.weeks}</div>
                  <div className="font-semibold text-ink-900">{c.title}</div>
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    {c.tags.map(t=><span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-xs">{t}</span>)}
                  </div>
                  <div className="mt-3 text-sm text-ink-500">★ {c.rating}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-primary">강좌 보기</button>
                  <button className="btn-ghost">평가기</button>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* 페이징 */}
        <nav className="flex items-center justify-center gap-1 mt-2">
          <button className="h-10 w-10 rounded-lg border bg-white">‹</button>
          {[1,2,3, "...", 25].map((n,i)=>(
            <button
              key={i}
              className={`h-10 min-w-10 px-3 rounded-lg border ${n===1 ? "bg-brand-500 text-white border-brand-500" : "bg-white"}`}
            >{n}</button>
          ))}
          <button className="h-10 w-10 rounded-lg border bg-white">›</button>
        </nav>
      </main>

      <Footer />
    </div>
  );
}
