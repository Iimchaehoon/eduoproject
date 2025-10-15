import { Link } from 'react-router-dom'
import { pickCourseThumb } from '../utils/imgUtil'

export default function CourseCard({ c }){
  return (
    <div className="card overflow-hidden">
      <div className="h-48 w-full bg-gray-100">
        <img src={pickCourseThumb(c)} alt={c.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-1">{c.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{c.provider} · {c.duration}</p>
        <div className="flex gap-2 mt-2">
          {c.tags?.slice(0,3).map((t,i)=>(<span key={i} className="badge">{t}</span>))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm">⭐ <span className="font-medium">{c.rating}</span></div>
          <Link to={`/course/${c.id}`} className="btn btn-primary">강좌 보기</Link>
        </div>
      </div>
    </div>
  )
}
