
import { useEffect, useState } from 'react'
import { api } from '../utils/api'
export default function Search(){
  const [list,setList] = useState([])
  useEffect(()=>{ api.get('/courses').then(r=>setList(r.data.courses)) },[])
  return (<main className="container-6xl py-8">
    <div className="flex items-center gap-2 mb-6">
      <input className="h-10 flex-1 border rounded-md px-3" placeholder="검색어를 입력하세요"/>
      <button className="btn-primary h-10">검색</button>
    </div>
    <div className="grid sm:grid-cols-3 gap-6">
      {list.map(c=>(<div key={c.id} className="card p-4">
        <img src={c.thumb} className="h-40 w-full object-cover rounded-md"/>
        <div className="mt-3 font-semibold">{c.title}</div>
        <div className="text-sm text-gray-500">{c.org} · {c.weeks}주</div>
        <div className="mt-2 flex gap-2">{c.tags.map(t=><span key={t} className="pill">{t}</span>)}</div>
        <div className="mt-3 flex gap-2">
          <a href={`/course/${c.id}`} className="btn-primary flex-1">강좌 보기</a>
          <a href={`/course/${c.id}/eval`} className="btn border flex-1">평가기</a>
        </div></div>))}
    </div></main>)
}
