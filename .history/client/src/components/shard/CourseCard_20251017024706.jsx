// src/components/CourseCard.jsx
import { useNavigate } from "react-router-dom";

export default function CourseCard({
  slug,
  img,
  title,
  school,
  teacher,
  weeks,
  rating,
  students,
  tags = [],
}) {
  const nav = useNavigate();
  return (
    <div
      onClick={() => nav(`/course/${slug}`)}
      className="group cursor-pointer rounded-2xl bg-white overflow-hidden
                 shadow-[0_12px_28px_rgba(16,24,40,0.08)]
                 hover:shadow-[0_18px_40px_rgba(16,24,40,0.12)]
                 transition-transform duration-200 transform-gpu hover:scale-[1.05]"
      title={title}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = "/img/seed.png")}
        />
        {tags[0] && (
          <span className="absolute left-3 top-3 px-2.5 h-7 rounded-full
                           bg-black/60 text-white text-[12px] font-medium inline-flex items-center">
            #{tags[0]}
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="text-[12px] text-[#6B7280]">{school} · {teacher}</div>
        <h3 className="mt-1 line-clamp-2 font-bold text-[#0F1B2D]">{title}</h3>

        <div className="mt-3 flex items-center gap-3 text-[12px] text-[#6B7280]">
          <span>📘 {weeks}주</span>
          <span>👥 {students}명</span>
          <span>⭐ {rating}</span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); nav(`/course/${slug}`); }}
            className="px-3 h-9 rounded-lg bg-[#1F2937] text-white text-sm"
          >
            강좌 보기
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); alert('수강신청 완료(데모)'); }}
            className="px-3 h-9 rounded-lg bg-[#2C6BFF] text-white text-sm"
          >
            수강신청
          </button>
        </div>
      </div>
    </div>
  );
}
