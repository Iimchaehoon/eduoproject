import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  const { slug, title, uni, teacher, image } = course;
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_8px_28px_rgba(16,24,40,0.08)]">
      <Link to={`/course/${slug}`}>
        <div className="aspect-[16/9] bg-slate-50">
          <img
            src={`/img/${image}.png`}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.opacity = .2; }}
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="text-xs text-slate-500">{uni} · {teacher}</div>
        <h3 className="mt-1 font-semibold text-[16px] text-slate-900 line-clamp-2">{title}</h3>
        <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
          <span>📘 14주</span><span>👥 12.4만</span><span>⭐ 4.6</span>
        </div>
        <div className="mt-3 flex gap-2">
          <Link to={`/course/${slug}`} className="px-3 h-9 rounded-lg bg-slate-900 text-white text-sm grid place-items-center">강좌 보기</Link>
          <button className="px-3 h-9 rounded-lg bg-[#2C6BFF] text-white text-sm">수강신청</button>
        </div>
      </div>
    </article>
  );
}
