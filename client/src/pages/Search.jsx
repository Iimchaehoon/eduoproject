import { useEffect, useState } from 'react'
import { api } from '../services/api'
import CourseCard from '../components/CourseCard'

export default function Search(){
  const [q, setQ] = useState('')
  const [all, setAll] = useState([])
  const [list, setList] = useState([])

  useEffect(()=>{
    api.get('/courses').then(r=>{ setAll(r.data); setList(r.data) })
  }, [])

  const run = ()=>{
    const v = q.trim().toLowerCase()
    if (!v) return setList(all)
    setList(all.filter(c => (c.title+c.tags.join(' ')).toLowerCase().includes(v)))
  }

  return (
    <div className="container-6xl py-6">
      <div className="card p-4 mb-6 flex gap-2 items-center">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="검색어"
          className="flex-1 h-10 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        <button onClick={run} className="btn btn-primary">검색</button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map(c => <CourseCard key={c.id} c={c} />)}
      </div>
    </div>
  )
}
