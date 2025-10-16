
import { useEffect, useState } from 'react'
import { api } from '../utils/api'
function CourseCard({c}){
  return (<div className="card p-4">
    <img src={c.thumb||'/img/react.png'} alt="" className="h-40 w-full object-cover rounded-md"/>
    <div className="mt-3 space-y-1">
      <div className="text-sm text-gray-500">{c.org} · {c.weeks}주</div>
      <div className="font-semibold">{c.title}</div>
      <div className="flex gap-2">{c.tags.map(t=><span key={t} className="pill">{t}</span>)}</div>
      <button className="btn-primary w-full mt-2">수강신청</button>
    </div></div>)
}
export default function Home(){
  const [list,setList] = useState([])
  useEffect(()=>{ api.get('/courses').then(r=>setList(r.data.courses)) },[])
  return (<main>
    <section className="bg-gradient-to-r from-indigo-200 to-purple-200">
      <div className="container-6xl py-16"><h1 className="text-5xl font-extrabold">EDUO</h1>
      <p className="mt-3 text-gray-700">누구나, 어디서나, 무료로 들을 수 있는 온라인 강좌</p></div>
    </section>
    <section className="container-6xl -mt-8"><div className="grid sm:grid-cols-3 gap-6">
      {list.map(c=><CourseCard key={c.id} c={c}/>)}</div></section>
  </main>)
}
