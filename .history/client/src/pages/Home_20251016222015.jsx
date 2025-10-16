import { useNavigate } from "react-router-dom";

/**
 * Figma-Compact Course Card
 *
 * props:
 * - slug           : 라우팅용
 * - image          : 썸네일 경로
 * - title          : 강의명
 * - teacher        : "강사 · 대학" 형식 문자열
 * - desc           : 요약(선택)
 * - tag            : 좌측 상단 작은 보라 배지 텍스트 (예: "웹 · 프론트")
 * - field          : 좌상단 카테고리(흰 배경 작은 pill)   ex) "컴퓨터과학"
 * - level          : 우상단 난이도(흰 배경 작은 pill)     ex) "고급"
 * - rating         : 평점 숫자
 * - people         : "12.4k명" 같은 문자열
 * - weeks          : "14주" 같은 문자열(없으면 14주)
 * - badges         : ["#AI", "#머신러닝"] 등의 칩(선택)
 */
export default function CourseCard({
  slug = "",
  image = "/img/placeholder.png",
  title,
  teacher,
  desc,
  tag,
  field,
  level,
  rating = 4.6,
  people = "12.4k명",
  weeks = "14주",
  badges = [],
}) {
  const nav = useNavigate();

  return (
    <div
      className="
        group select-none rounded-2xl bg-white
        shadow-[0_10px_24px_rgba(16,24,40,0.08)]
        hover:shadow-[0_16px_36px_rgba(16,24,40,0.12)]
        transition-transform duration-300 hover:scale-[1.05]
        will-change-transform
      "
    >
      {/* 썸네일 */}
      <div className="relative overflow-hidden rounded-2xl rounded-b-none">
        <img
          src={image}
          alt={title}
          className="h-[172px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />

        {/* 좌측 상단 보라 배지 (ai 일치/카테고리 등) */}
        {tag && (
          <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-[#6F6CF1] px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
            <img src="/img/aicol.png" alt="" className="mr-1 h-3 w-3" />
            {tag}
          </div>
        )}

        {/* 좌/우 상단 흰 pill: 분야 & 난이도 (선택) */}
        {field && (
          <div className="absolute left-3 bottom-3 rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-[#384152] shadow-sm">
            {field}
          </div>
        )}
        {level && (
          <div className="absolute right-3 bottom-3 rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-[#384152] shadow-sm">
            {level}
          </div>
        )}
      </div>

      {/* 본문 */}
      <div className="p-4">
        {/* 대학/강사 */}
        {teacher && (
          <div className="text-[12px] font-medium text-[#8B95A1]">{teacher}</div>
        )}

        {/* 타이틀 */}
        <div className="mt-1 text-[16px] font-bold leading-snug text-[#111827]">
          {title}
        </div>

        {/* 요약(선택) - 살짝 줄인 패딩/폰트 */}
        {desc && (
          <div className="mt-2 rounded-[10px] border border-[#EEF0F4] bg-[#F8FAFD] p-2.5 text-[12px] leading-[1.4] text-[#4B5563]">
            {desc}
          </div>
        )}

        {/* 메타: 기간 / 수강생 / 평점 */}
        <div className="mt-2 flex items-center gap-5 text-[12px] text-[#6B7686]">
          <span className="inline-flex items-center gap-1">
            <img src="/img/clock.png" className="h-[14px] w-[14px] opacity-80" alt="" />
            {weeks}
          </span>
          <span className="inline-flex items-center gap-1">
            <img src="/img/jobs.png" className="h-[14px] w-[14px] opacity-80" alt="" />
            {people} 학생
          </span>
          <span className="inline-flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="#F8B84A" aria-hidden="true">
              <path d="M10 15.27l-5.18 3.05 1.58-5.36L1.82 8.9l5.47-.4L10 3.5l2.71 4.99 5.47.4-4.58 4.06 1.58 5.36z"/>
            </svg>
            <span className="font-semibold text-[#374151]">
              {Number(rating).toFixed(1)}
            </span>
          </span>
        </div>

        {/* 칩(최대 3개) */}
        {badges?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {badges.slice(0, 3).map((b) => (
              <span
                key={b}
                className="inline-flex h-6 items-center rounded-md bg-[#F3F6FF] px-2 text-[11px] font-medium text-[#4450FF]"
              >
                {b}
              </span>
            ))}
          </div>
        )}

        {/* 버튼들 (작게) */}
        <div className="mt-3 flex items-center gap-6">
          {/* 검정 보조 버튼: '강좌 보기' (네비게이션 없음) */}
          <button
            type="button"
            className="h-8 rounded-lg bg-[#1F2937] px-3 text-[12px] font-semibold text-white hover:brightness-110"
            // onClick={() => { /* 원하는 경우 모달/프리뷰 등 */ }}
          >
            강좌 보기
          </button>

          {/* ✅ 파랑 메인 버튼: 이 버튼만 상세로 이동 */}
          <button
            type="button"
            onClick={() => nav(`/course/${slug}`)}
            className="h-8 rounded-lg bg-[#2C6BFF] px-3 text-[12px] font-semibold text-white hover:brightness-110 active:scale-[.98]"
          >
            수강신청
          </button>
        </div>
      </div>
    </div>
  );
}
