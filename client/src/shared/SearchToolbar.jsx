export default function SearchToolbar({
  total = 92,
  sort = "최신순",
  onChangeSort,
  view = "grid",
  onChangeView,
  onOpenFilters
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-ink-700">
        <span className="font-semibold">총 {total}개의 강좌</span>
      </div>

      <div className="flex items-center gap-2">
        {/* 정렬 */}
        <div className="relative">
          <select
            value={sort}
            onChange={(e)=>onChangeSort?.(e.target.value)}
            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm"
          >
            <option>최신순</option>
            <option>평점순</option>
            <option>인기순</option>
            <option>수강생순</option>
          </select>
        </div>

        {/* 뷰 토글 */}
        <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            onClick={()=>onChangeView?.("grid")}
            className={`px-3 h-10 text-sm ${view==="grid" ? "bg-gray-100 text-ink-900" : "text-ink-700"}`}
            title="그리드"
          >
            ⬚⬚
          </button>
          <button
            onClick={()=>onChangeView?.("list")}
            className={`px-3 h-10 text-sm ${view==="list" ? "bg-gray-100 text-ink-900" : "text-ink-700"}`}
            title="리스트"
          >
            ≣
          </button>
        </div>

        {/* 필터 버튼 */}
        <button onClick={onOpenFilters} className="btn-ghost h-10">필터</button>
      </div>
    </div>
  );
}
