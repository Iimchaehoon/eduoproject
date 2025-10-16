import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard.jsx'
const courses = [
  {id:'py-obj', title:'파이썬 객체지향 프로그래밍', univ:'서울대학교', weeks:'14주', img:'/img/python.png', tags:['개발','파이썬','AI추천']},
  {id:'viz', title:'데이터 시각화 마스터클래스', univ:'연세대학교', weeks:'8주', img:'/img/data.png', tags:['데이터','시각화']},
  {id:'dl', title:'신경망 및 딥러닝', univ:'한양대학교', weeks:'14주', img:'/img/deep.png', tags:['AI','딥러닝']},
]
export default function Home(){
  return (<div>
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-5 pt-8">
        <div className="rounded-2xl overflow-hidden relative h-[340px] md:h-[420px] shadow-card">
          <img src="/img/head_section.png" className="absolute inset-0 w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 p-10 text-white">
            <h1 className="text-5xl font-extrabold tracking-tight">EDUO</h1>
            <p className="mt-4 text-lg leading-7">누구나, 어디서나, 무료로 들을 수 있는 온라인 강좌</p>
            <div className="mt-10 flex gap-2 overflow-x-auto">
              {['인문학','사회과학','자연과학','공학','의학','예체능','교육학','컴퓨터과학','경영학','법학'].map((x,i)=>(
                <button key={i} className="pill hover:scale-[1.03] transition">{x}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="max-w-6xl mx-auto px-5 py-8">
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 rounded-full bg-white border border-skin-ring px-4 py-3 shadow-soft">
          <img src="/img/search.png" className="w-5 h-5 opacity-60" alt="" />
          <input placeholder="찾고 싶은 강좌를 검색해보세요" className="bg-transparent outline-none w-full"/>
        </div>
        <button className="btn btn-ghost">강좌 검색</button>
        <button className="btn btn-ghost">고급 검색</button>
      </div>
    </section>
    <section className="max-w-6xl mx-auto px-5 py-6">
      <h2 className="text-2xl font-bold mb-4">인기 강좌</h2>
      <div className="grid md:grid-cols-3 gap-6">{courses.map(c => <CourseCard key={c.id} {...c} />)}</div>
      <div className="flex justify-center mt-6"><Link to="/search" className="btn btn-ghost">더 많은 추천 강좌 보기</Link></div>
    </section>
    <section className="max-w-6xl mx-auto px-5 py-6">
      <div className="flex items-center gap-2 mb-3"><img src="/img/ai.png" className="w-5 h-5" alt=""/><h2 className="text-2xl font-bold">AI 추천 콘텐츠</h2></div>
      <div className="grid md:grid-cols-3 gap-6">
        <CourseCard id="alg" title="고급 파이썬 및 알고리즘" univ="이과대학" weeks="14주" img="/img/python.png" tags={['고급','프로그래밍']} />
        <CourseCard id="ds" title="파이썬으로 데이터 과학" univ="데이터과학" weeks="14주" img="/img/pytan_data.png" tags={['데이터','AI']} />
        <CourseCard id="nn" title="신경망 및 딥러닝" univ="인공지능" weeks="14주" img="/img/deep.png" tags={['딥러닝']} />
      </div>
    </section>
    <section className="max-w-6xl mx-auto px-5">
      <div className="rounded-2xl bg-primary text-white p-10 text-center shadow-card">
        <h3 className="text-2xl font-semibold">혁신적인 학습의 준비가 되셨나요?</h3>
        <p className="opacity-90 mt-2">이미 AI 기반 학습으로 교육의 미래를 경험하고 있는 수백만 명의 학습자와 함께하세요.</p>
        <div className="mt-6 flex justify-center"><Link className="btn bg-white text-primary hover:scale-[1.05]" to="/register">무료로 시작하기</Link></div>
      </div>
    </section>
  </div>)
}
