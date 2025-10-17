// src/components/shard/CourseCard.jsx
import { Link } from "react-router-dom";

export default function CourseCard({
  slug,
  title,
  teacher,
  org = "",
  weeks = 14,
  students = "12.4만",
  rating = 4.6,
  badge = "",
  img = "/img/edu_pro2.png",
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all hover:shadow-lg">
      {/* 배지 */}
      {badge && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-indigo-600/90 px-3 py-1 text-xs font-semibold text-white shadow">
          {badge}
        </span>
      )}

      {/* 이미지 */}
      <Link to={`/course/${slug}`} className="block">
        <img
          src={img}
          alt={title}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
          loading="lazy"
        />
      </Link>

      {/* 본문 */}
      <div className="p-4">
        <div className="text-xs text-slate-500">{org} · {teacher}</div>
        <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold text-slate-900">
          {title}
        </h3>

        {/* 메타 */}
        <div className="mt-3 flex items-center gap-3 text-[13px] text-slate-600">
          <span className="inline-flex items-center gap-1">
            <span className="i">📘</span>{weeks}주
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="i">👥</span>{students} 학습
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="i">⭐</span>{rating}
          </span>
        </div>

        {/* 버튼 */}
        <div className="mt-4 flex gap-2">
          <Link
            to={`/course/${slug}`}
            className="inline-flex h-9 flex-1 items-center justify-center rounded-xl border border-slate-200 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            강좌 보기
          </Link>
          <Link
            to={`/course/${slug}`}
            className="inline-flex h-9 flex-1 items-center justify-center rounded-xl bg-indigo-600 text-[13px] font-medium text-white hover:bg-indigo-700"
          >
            수강신청
          </Link>
        </div>
      </div>
    </article>
  );
}
