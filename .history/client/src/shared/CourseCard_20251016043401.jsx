export default function CourseCard({ title, univ, weeks, rating, tags=[], img }) {
  return (
    <div className="card overflow-hidden">
      <img src={img} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="text-sm text-ink-500">{univ} · {weeks}</div>
        <h3 className="mt-1 font-semibold text-ink-900 line-clamp-2">{title}</h3>

        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {tags.map((t) => (<span key={t} className="px-2 py-0.5 rounded-full bg-gray-100 text-xs text-ink-700">{t}</span>))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-ink-500 text-sm">★ {rating}</span>
          <div className="flex gap-2">
            <button className="btn-primary">수강신청</button>
            <button className="btn-ghost">평가기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
