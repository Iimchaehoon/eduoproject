// client/src/shared/CourseCard.jsx
import { useNavigate } from "react-router-dom";

export default function CourseCard({
  slug = "course",
  image = "/img/seed.png",
  title = "강좌",
  teacher = "",
  rating = 4.6,
  people = "12.4k명",
}) {
  const nav = useNavigate();
  const go = () => nav(`/course/${slug}`);

  return (
    <div
      className="select-none rounded-2xl bg-white shadow-[0_10px_26px_rgba(16,24,40,.08)]
                 transition-transform duration-300 hover:scale-[1.05] will-change-transform"
    >
      {/* 썸네일 */}
      <div className="relative overflow-hidden rounded-2xl rounded-b-none aspect-[16/9] bg-[#F2F4F8]">
        <img src={image} alt={title} loading="lazy"
             className="w-full h-full object-cover" />
      </div>

      {/* 본문 */}
      <div className="p-5">
        <div className="text-[15px] text-[#8B95A1]">{(teacher.split("·")[1] || "").trim()}</div>
        <div className="mt-1 text-[18px] font-bold text-[#101828] leading-snug">
          {title}
        </div>

        {/* 주/학생수 (고정 값) */}
        <div className="mt-3 flex items-center gap-6 text-[13px] text-[#6B7686]">
          <span>🗓 14주</span>
          <span>👥 23,000명 학생</span>
        </div>

        {/* 평점 */}
        <div className="mt-3 flex items-center gap-1 text-[13px] text-[#6B7686]">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="#F8B84A" aria-hidden="true">
            <path d="M10 15.27l-5.18 3.05 1.58-5.36L1.82 8.9l5.47-.4L10 3.5l2.71 4.99 5.47.4-4.58 4.06 1.58 5.36z"/>
          </svg>
          <span className="font-semibold text-[#374151]">{Number(rating).toFixed(1)}</span>
          <span className="text-[#9CA3AF]">· {people}</span>
        </div>

        {/* 수강신청만 라우팅 */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={go}
            className="px-4 h-10 rounded-lg bg-[#2C6BFF] text-white text-sm font-semibold hover:brightness-110 cursor-pointer"
          >
            수강신청
          </button>
        </div>
      </div>
    </div>
  );
}
