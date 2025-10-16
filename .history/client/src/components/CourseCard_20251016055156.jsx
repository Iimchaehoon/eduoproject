import { Link } from 'react-router-dom'
export default function CourseCard({id, title, univ, weeks, img, tags=[]}){
  return (
    <div className="card overflow-hidden hover:shadow-soft hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-200 ease-pleasant">
      <img src={img} alt={title} className="h-44 w-full object-cover"/>
      <div className="p-4 space-y-3">
        <div className="text-sm text-slate-500">{univ} · <span>{weeks}</span></div>
        <h3 className="font-semibold line-clamp-2">{title}</h3>
        <div className="flex gap-2 flex-wrap">
          {tags.map(t => <span key={t} className="badge">#{t}</span>)}
        </div>
        <div className="flex gap-2 pt-2">
          <Link to={`/course/${id}`} className="btn btn-ghost flex-1">강좌 보기</Link>
          <Link to={`/course-eval/${id}`} className="btn btn-primary flex-1">평가기</Link>
        </div>
      </div>
    </div>
  )
}
