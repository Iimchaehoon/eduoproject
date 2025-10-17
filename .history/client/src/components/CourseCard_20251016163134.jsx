import React from "react";

export default function CourseCard({
  image,            // 카드 썸네일 (/img/*.png)
  badgeLeft,        // 좌측 상단 라벨 (예: "AI · 머신러닝")
  badgeRight,       // 우측 상단 라벨 (예: "95% 매칭")
  title,            // 제목
  author,           // 강사 / 학교
  desc,             // 한줄 설명
  weeks = "14주",   // 기간
  students = "23,000명", // 수강생
  rating = "4.9",   // 평점
  reviews = "1.2만",// 리뷰수
  cta = "수강신청",  // 버튼 텍스트
}) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_6px_28px_rgba(0,0,0,0.06)] overflow-hidden hover-grow cursor-pointer">
      <div className="relative">
        <img src={image} alt={title} className="h-48 w-full object-cover" />
        {/* 좌측 라벨 */}
        {badgeLeft && (
          <span className="absolute left-3 top-3 text-[12px] px-2.5 py-1 rounded-full bg-[rgba(22,119,255,0.12)] text-[#1668dc] font-medium">
            {badgeLeft}
          </span>
        )}
        {/* 우측 라벨 */}
        {badgeRight && (
          <span className="absolute right-3 top-3 text-[12px] px-2.5 py-1 rounded-full bg-[rgba(0,0,0,0.7)] text-white font-medium">
            {badgeRight}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-[17px] font-semibold leading-snug text-[#0f172a]">
          {title}
        </h3>
        <p className="text-sm text-[#475569] mt-1">{author}</p>

        {desc && (
          <div className="mt-3 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 text-[13px] text-[#334155]">
            {desc}
          </div>
        )}

        <div className="mt-4 flex items-center gap-3 text-[13px] text-[#64748b]">
          <span className="flex items-center gap-1">
            <img src="/img/dot_icon.png" className="w-3.5 h-3.5" />
            {weeks}
          </span>
          <span className="flex items-center gap-1">
            <img src="/img/dot_icon.png" className="w-3.5 h-3.5" />
            {students} 학생
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="text-[13px] text-[#334155]">
            ★ <b>{rating}</b> · {reviews}+
          </div>
          <button className="px-4 py-2 rounded-lg bg-[#3b82f6] text-white text-[13px] hover:bg-[#2563eb]">
            {cta}
          </button>
        </div>
      </div>
    </div>
  );
}
