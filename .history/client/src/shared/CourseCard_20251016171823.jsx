import { useNavigate } from "react-router-dom";

/**
 * props
 * - slug: "/course/py-obj" 같은 라우팅용 슬러그
 * - image: 썸네일 이미지 경로 (예: "/img/react.png")
 * - title: 강의명
 * - teacher: 강사/학교 (예: "이명환 · 서울대학교")
 * - tag: 좌측 상단 작은 보라/민트 배지 텍스트 (예: "웹 · 프론트")
 * - match: 우측 상단 매칭율 (예: "95% 매칭")
 * - desc: 카드 중간 요약문
 * - rating: 숫자(예: 4.9)
 * - people: "12.4k명" 같은 표시 문자열
 */
export default function CourseCard({
  slug = "py-obj",
  image,
  title,
  teacher,
  tag,
  match,
  desc,
  rating = 4.9,
  people = "12.4k명",
}) {
  const nav = useNavigate();

  const go = () => nav(`/course/${slug}`);

  return (
    <div
      onClick={go}
      className="
        group cursor-pointer select-none
        rounded-2xl bg-white shadow-[0_6px_18px_rgba(20,20,43,.06)]
        transition-transform duration-300 will-change-transform
        hover:scale-[1.05]
        border border-transparent hover:border-[#E9ECF1]
      "
    >
      {/* 썸네일 */}
      <div className="relative overflow-hidden rounded-2xl rounded-b-none">
        <img
          src={image}
          alt={title}
          className="h-[190px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />

        {/* 좌측 상단 배지 (아이콘 + 텍스트) */}
        {tag && (
          <div className="absolute left-3 top-3 flex items-center rounded-full bg-[#6F6CF1] px-2.5 py-1 text-[12px] font-semibold text-white shadow-sm">
            <img src="/img/aicol.png" alt="" className="mr-1 h-3.5 w-3.5" />
            {tag}
          </div>
        )}

        {/* 우측 상단 매칭율 */}
        {match && (
          <div className="absolute right-3 top-3 rounded-full bg-[rgba(33,38,78,.9)] px-2.5 py-1 text-[12px] font-semibold text-white">
            {match}
          </div>
        )}
      </div>

      {/* 본문 */}
      <div className="space-y-3 p-4">
        <div className="text-[18px] font-bold leading-snug text-[#111827]">
          {title}
        </div>
        <div className="text-[13px] font-medium text-[#6B7280]">{teacher}</div>

        {desc && (
          <div className="rounded-xl border border-[#EEF0F4] bg-[#F8FAFD] p-3 text-[13px] leading-5 text-[#4B5563]">
            {desc}
          </div>
        )}

        {/* 하단 메타: 노란 별 + 평점 + 인원수 */}
        <div className="mt-1 flex items-center gap-1.5 text-[13px]">
          {/* 노란 별 (SVG) */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="#F8B84A"
            className="shrink-0"
            aria-hidden="true"
          >
            <path d="M10 15.27l-5.18 3.05 1.58-5.36L1.82 8.9l5.47-.4L10 3.5l2.71 4.99 5.47.4-4.58 4.06 1.58 5.36z" />
          </svg>
          <span className="font-semibold text-[#374151]">{rating.toFixed(1)}</span>
          <span className="text-[#9CA3AF]">· {people}</span>
        </div>

        {/* 수강신청 버튼 (카드 클릭과 동일 동작) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            go();
          }}
          className="
            mt-1 w-[92px]
            rounded-xl bg-[#3B66FF] px-3 py-2
            text-xs font-semibold text-white leading-none
            whitespace-nowrap
            hover:bg-[#2F56E6] active:scale-[.98]
            cursor-pointer
          "
        >
          수강신청
        </button>
      </div>
    </div>
  );
}
