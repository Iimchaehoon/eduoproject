import { Link } from "react-router-dom";

export default function CourseCard({
  cover,              // 예: "seed.png"
  tag = "데이터",
  title,
  uni = "서울대학교",
  teacher = "OOO",
  weeks = 14,
  students = "12.4만",
  rating = 4.6,
  slug,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition">
      <div className="relative overflow-hidden">
        <img
          src={`/img/${cover}`}
          alt={title}
          className="w-full aspect-[16/9] object-cover transition-transform duration-300 hover:scale-[1.05]"
          loading="lazy"
          draggable={false}
        />
        <div className="absolute left-3 top-3 text-[11px] px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm">
          ✚ {tag}
        </div>
      </div>

      <div className="p-4">
        <div className="text-xs text-slate-500">{uni} · {teacher}</div>
        <h3 className="mt-1 font-semibold text-slate-900 line-clamp-2">{title}</h3>

        <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
          <span>📘 {weeks}주</span>
          <span>👥 {students}명 학습</span>
          <span>⭐ {rating}</span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link to={`/course/${slug}`} className="btn btn-ghost">강좌 보기</Link>
          <button className="btn btn-primary">수강신청</button>
        </div>
      </div>
    </div>
  );
}
