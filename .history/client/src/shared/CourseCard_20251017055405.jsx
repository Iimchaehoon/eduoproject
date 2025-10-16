// src/shared/CourseCard.jsx
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const goDetail = () => navigate(`/course/${course.slug}`);

  return (
    <div className="group rounded-2xl bg-white shadow-[0_6px_24px_rgba(16,24,40,0.06)] overflow-hidden transition-transform duration-200 hover:-translate-y-1">
      {/* 이미지 영역 */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
          loading="lazy"
        />
        {/* 좌측 상단 배지(최대 2개) */}
        <div className="absolute top-3 left-3 flex gap-2">
          {course.badges?.slice(0, 2).map((b, i) => (
            <span
              key={i}
              className="text-[12px] px-2 py-[3px] rounded-full bg-white/90 text-slate-700 border border-slate-200 shadow-sm"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* 텍스트/아이콘 */}
      <div className="p-4">
        <p className="text-[12px] text-slate-500 mb-1">· {course.provider}</p>
        <h3 className="text-[15px] font-semibold text-slate-900 line-clamp-1">{course.title}</h3>

        <div className="mt-10 flex items-center gap-4 text-[12px] text-slate-500">
          <span className="flex items-center gap-1 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-sky-500">
            {course.weeks}주
          </span>
          <span className="flex items-center gap-1 before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-amber-400">
            {course.studentsText}명 학습
          </span>
          <span className="flex items-center gap-1 before:content-['★'] before:mr-1 before:text-amber-400">
            {course.rating}
          </span>
        </div>

        {/* 버튼 */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={goDetail}
            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            강좌 보기
          </button>
          <button
            onClick={goDetail}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
          >
            수강신청
          </button>
        </div>
      </div>
    </div>
  );
}
