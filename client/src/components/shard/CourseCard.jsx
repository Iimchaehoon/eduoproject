import { Link } from "react-router-dom";

export default function CourseCard({
  slug,
  img,
  title,
  uni,
  teacher,
  weeks,
  students,
  rating,
  tag,
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-all">
      <Link to={`/course/${slug}`} className="block overflow-hidden">
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={img}
            alt={title}
            className="h-full w-full object-cover transform-gpu transition-transform duration-300 ease-out hover:scale-[1.05]"
            loading="lazy"
            onError={(e) => (e.currentTarget.src = "/img/edu_pro1.png")}
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="text-slate-500 text-sm">{uni} · {teacher || "정보없음"}</div>
        <h3 className="font-semibold text-slate-900 mt-1 line-clamp-2">{title}</h3>

        <div className="mt-3 flex items-center gap-3 text-sm text-slate-600">
          <span>📘 {weeks}주</span>
          <span>👥 {students} 학습</span>
          <span>⭐ {rating}</span>
        </div>

        <div className="mt-4 flex gap-2">
          <Link to={`/course/${slug}`} className="btn btn-ghost">강좌 보기</Link>
          <button className="btn btn-primary">수강신청</button>
        </div>

        {tag && (
          <div className="mt-3">
            <span className="px-2 py-1 rounded-full text-xs bg-indigo-50 text-indigo-700 border border-indigo-100">
              #{tag}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
