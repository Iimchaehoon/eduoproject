export default function SearchCard({
  title, univ, weeks, rating, tags = [], img, highlight = ""
}) {
  return (
    <article className="card overflow-hidden group">
      {/* 썸네일 */}
      <div className="relative">
        <img src={img} alt={title} className="w-full h-48 object-cover" />
        {highlight && (
          <div className="absolute left-3 top-3 pill bg-brand-500 text-white shadow-soft">
            {highlight}
          </div>
        )}
      </div>

      {/* 본문 */}
      <div className="p-4">
        <div className="text-xs text-ink-500">{univ} · {weeks}</div>
        <h3 className="mt-1 font-semibold text-ink-900 line-clamp-2">{title}</h3>

        {/* 태그 */}
        <div className="mt-2 flex items-center flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-xs text-ink-700">
              {t}
            </span>
          ))}
        </div>

        {/* 하단 메타 & 버튼 */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-ink-500 text-sm">★ {rating}</div>
          <div className="flex gap-2">
            <button className="btn-primary">강좌 보기</button>
            <button className="btn-ghost">평가기</button>
          </div>
        </div>
      </div>
    </article>
  );
}
