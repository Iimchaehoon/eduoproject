import CourseCard from '../components/CourseCard.jsx'
const data = [
  {id:'sec', title:'클라우드 보안 엔지니어 실무과정', univ:'컴퓨터대학', weeks:'14주', img:'/img/cloud.png', tags:['AI','보안']},
  {id:'hr', title:'인체공학의 이해', univ:'컴퓨터대학', weeks:'14주', img:'/img/house.png', tags:['AI','인하우스']},
  {id:'ev', title:'전기자동차 배터리 시스템', univ:'컴퓨터대학', weeks:'14주', img:'/img/battery.png', tags:['AI','전기']},
  {id:'agr', title:'작물재배 전문가 기초', univ:'컴퓨터대학', weeks:'14주', img:'/img/ja.png', tags:['AI','농업']},
  {id:'bio', title:'생체데이터와 인공지능의 이해', univ:'컴퓨터대학', weeks:'14주', img:'/img/human.png', tags:['AI','바이오헬스']},
  {id:'pp', title:'Python 및 Pandas 활용 데이터 분석 기초', univ:'컴퓨터대학', weeks:'14주', img:'/img/pandas.png', tags:['데이터','파이썬']},
]
export default function Search(){
  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <div className="mb-4 text-slate-500">총 92개의 강좌</div>
      <div className="card p-5 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <input className="pill" placeholder="카테고리 선택" />
          <input className="pill" placeholder="교육기관" />
          <input className="pill" placeholder="난이도 선택" />
          <input className="pill" placeholder="강좌 기간" />
          <input className="pill" placeholder="강의 언어" />
          <input className="pill" placeholder="강사명" />
        </div>
        <div className="mt-4 flex gap-3">
          <button className="btn btn-ghost">초기화</button>
          <button className="btn btn-primary">세부 검색 실행</button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">{data.map(c => <CourseCard key={c.id} {...c} />)}</div>
      <div className="flex justify-center gap-2 mt-10">{['1','2','3','...','25'].map(x => <button key={x} className="pill">{x}</button>)}</div>
    </div>
  )
}
