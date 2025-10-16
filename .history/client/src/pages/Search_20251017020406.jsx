import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CourseCard from "../shared/CourseCard.jsx";

const MOCK = [
  { slug:"mock-1-1", title:"인류학의 이해", teacher:"전북대학교 · 김OO" },
  { slug:"mock-1-2", title:"파이썬으로 데이터 과학", teacher:"부산대학교 · 박OO" },
  { slug:"mock-1-3", title:"리액트 고급 개발", teacher:"서울대학교 · 이OO" },
  { slug:"mock-1-4", title:"데이터 시각화 마스터클래스", teacher:"연세대학교 · 박OO" },
  { slug:"mock-1-5", title:"블록체인 기초부터 실무", teacher:"한양대학교 · 최OO" },
  { slug:"mock-1-6", title:"신경망 및 딥러닝", teacher:"고려대학교 · 김OO" },
  // 필요하면 더 추가
];

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function Search() {
  const q = useQuery();
  const navigate = useNavigate();
  const [page, setPage] = useState(Number(q.get("page")||1));
  const size = Number(q.get("size") || 9);
  const keyword = (q.get("q") || "").trim();

  const list = useMemo(() => {
    if (!keyword) return MOCK;
    const k = keyword.toLowerCase();
    return MOCK.filter(v =>
      v.title.toLowerCase().includes(k) || v.teacher.toLowerCase().includes(k)
    );
  }, [keyword]);

  const total = list.length;
  const paged = list.slice((page-1)*size, page*size);

  useEffect(()=>{ setPage(1); }, [keyword]);

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-slate-500">총 <b>{total}</b>개의 강좌</div>
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          defaultValue="latest"
          onChange={()=>{}}
        >
          <option value="latest">최신순</option>
          <option value="popular">인기순</option>
        </select>
      </div>

      {/* 필터 영역 (UI 유지) */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
        <div className="grid grid-cols-3 gap-3">
          <select className="border rounded-lg px-3 py-2 text-sm"><option>카테고리 선택</option></select>
          <input className="border rounded-lg px-3 py-2 text-sm" placeholder="교육기관명"/>
          <select className="border rounded-lg px-3 py-2 text-sm"><option>난이도 선택</option></select>

          <select className="border rounded-lg px-3 py-2 text-sm"><option>기간 선택</option></select>
          <select className="border rounded-lg px-3 py-2 text-sm"><option>언어 선택</option></select>
          <input className="border rounded-lg px-3 py-2 text-sm" placeholder="강사명"/>
        </div>

        {/* 검색어 입력 */}
        <div className="mt-3 flex items-center gap-2">
          <input
            className="flex-1 border rounded-lg px-3 py-2 text-sm"
            placeholder="찾고 싶은 강좌를 검색해보세요"
            defaultValue={keyword}
            onKeyDown={(e)=>{
              if(e.key==='Enter'){
                const v = e.currentTarget.value.trim();
                navigate(`/search?q=${encodeURIComponent(v)}&page=1&size=${size}&sort=latest`);
              }
            }}
          />
          <button
            className="px-4 py-2 rounded-lg bg-[#2C6BFF] text-white text-sm"
            onClick={()=>{
              const v = document.querySelector('input[placeholder="찾고 싶은 강좌를 검색해보세요"]').value.trim();
              navigate(`/search?q=${encodeURIComponent(v)}&page=1&size=${size}&sort=latest`);
            }}
          >세부 검색 실행</button>
        </div>
      </div>

      {/* 카드 섹션 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {paged.map((c)=>(
          <CourseCard key={c.slug} {...c}/>
        ))}
      </div>

      {/* 페이지네이션 */}
      {total > size && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            className="px-3 py-1 rounded border disabled:opacity-40"
            onClick={()=>{ const p=Math.max(1, page-1); navigate(`/search?q=${encodeURIComponent(keyword)}&page=${p}&size=${size}&sort=latest`); setPage(p); }}
            disabled={page===1}
          >이전</button>
          <div className="px-3 py-1 rounded bg-slate-900 text-white">{page}</div>
          <button
            className="px-3 py-1 rounded border disabled:opacity-40"
            onClick={()=>{ const p=page+1; navigate(`/search?q=${encodeURIComponent(keyword)}&page=${p}&size=${size}&sort=latest`); setPage(p); }}
            disabled={(page*size)>=total}
          >다음</button>
        </div>
      )}
    </div>
  );
}
