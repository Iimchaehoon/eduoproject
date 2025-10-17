import { Link } from "react-router-dom";

export default function CourseCard({
  id,
  title,
  inst,
  weeks,
  students,
  rating,
  badge,
  cover, // /public/img/{cover}.png
}) {
  const href = `/course/${id}`;

  return (
    <article className="card p-0 overflow-hidden group transition-transform duration-200 hover:scale-[1.05]">
      {/* 상단 이미지 */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <img
          src={`/img/${cover}.png`}
          onError={(e) => {
            // 혹시 jpg일 때 대비 (파일 확장자 다른 경우 자동 fallback)
            e.currentTarget.src = `/img/${cover}.jpg`;
          }}
          alt={title}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* 좌측 상단 뱃지 */}
        {badge && (
          <span className="absolute left-3 top-3 text-[11px] px-2 py-[3px] rounded-full bg-violet-100 text-violet-700 border border-violet-200">
            ✎ {badge}
          </span>
        )}
      </div>

      {/* 본문 */}
      <div className="p-4">
        <div className="text-slate-500 text-xs">{inst}</div>
        <h3 className="font-semibold mt-1 text-ink-900">{title}</h3>

        <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-sky-500" />
            {weeks}주
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
            {students} 학생
          </div>
          <div className="flex items-center gap-1">
            <span className="text-amber-400">★</span>
            {rating}
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <Link to={href} className="btn btn-ghost text-[13px]">강좌 보기</Link>
          <button className="btn btn-primary text-[13px]">수강신청</button>
        </div>
      </div>
    </article>
  );
}
