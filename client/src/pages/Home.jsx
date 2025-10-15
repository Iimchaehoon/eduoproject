import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { AI } from '../services/ai'
import CourseCard from '../components/CourseCard'
import { resolveImg } from '../utils/imgUtil'

export default function Home(){
  const [list, setList] = useState([])

  useEffect(()=>{ api.get('/courses').then(r=>setList(r.data)) }, [])

  return (
    <div>
      <section
        className="mt-6 mb-10 container-6xl text-white rounded-2xl p-10 bg-center bg-cover shadow"
        style={{ backgroundImage: `url(${resolveImg('head_section')})` }}
      >
        <div className="max-w-xl">
          <h1 className="text-4xl font-extrabold drop-shadow">EDUO — AI 기반 평생교육</h1>
          <p className="mt-3 text-white/90">개인화 추천, 학습 코치, 요약/퀴즈까지 한 곳에서.</p>
          <div className="mt-6 flex gap-2 flex-wrap">
            {['인기 강좌 보기','데이터 사이언스','머신러닝','파이썬','블록체인'].map((t,i)=>(
              <button key={i} className="rounded-lg bg-white/90 text-gray-900 hover:bg-white px-3 py-1.5 text-sm shadow">
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">인기 강좌</h2>
          <button
            onClick={async()=>{
              const profile = { level:'초급', interests:['파이썬','데이터','딥러닝'] }
              const { courses=[] } = await AI.recommend(profile)
              if (courses.length) setList(courses)
            }}
            className="btn btn-primary"
          >
            AI 추천 새로고침
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map(c => <CourseCard key={c.id} c={c} />)}
        </div>
      </div>
    </div>
  )
}
