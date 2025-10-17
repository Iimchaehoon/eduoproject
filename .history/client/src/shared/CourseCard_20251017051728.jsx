// src/shared/CourseCard.jsx
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course }) {
  const nav = useNavigate();

  // Vite의 public/img 경로 사용 (이미 /client/public/img 안에 png 존재)
  const cover = `/img/${course.image}.png`;

  return (
    <div
      className="group rounded-2xl bg-white shadow-[0_6px_24px_rgba(14,31,53,.08)] overflow-hidden transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="h-[210px] w-full overflow-hidden bg-slate-100">
        <img
          src={cover}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>

      <div className="px-6 pt-4 pb-5">
        <div className="text-[12px] text-slate-500 flex items-center gap-1">
          <span className="truncate">{course.instructor} · {course.org}</span>
        </div>

        <h3 className="mt-1 text-[15px] font-semibold text-slate-900 line-clamp-2">
          {course.title}
        </h3>

        <div className="mt-3 flex items-center gap-4 text-[12px] text-slate-500">
          <span className="relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-2 before:w-2 before:rounded-full before:bg-sky-500">
            {course.weeks}주
          </span>
          <span className="relative pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-2 before:w-2 before:rounded-full before:bg-amber-400">
            {course.learners}명 학습
          </span>
          <span className="flex items-center gap-1">
            ⭐ <b className="text-slate-700">{course.rating}</b>
          </span>
        </div>

        <div className="mt-4 flex gap-8">
          <button
            type="button"
            onClick={() => nav(`/course/${course.slug}`)}
            className="inline-flex h-9 items-center rounded-xl border border-slate-200 px-4 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            강좌 보기
          </button>

          <button
            type="button"
            onClick={() => nav(`/course/${course.slug}`)}
            className="inline-flex h-9 items-center rounded-xl bg-indigo-600 px-4 text-[13px] font-semibold text-white hover:bg-indigo-700"
          >
            수강신청
          </button>
        </div>
      </div>
    </div>
  );
}
