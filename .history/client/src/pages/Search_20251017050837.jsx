// src/pages/Search.jsx
import { useMemo, useState } from "react";
import CourseCard from "../components/shard/CourseCard.jsx";
import { COURSES } from "../shared/courseData.js";

export default function Search() {
  // 간단 필터 상태
  const [q, setQ] = useState("");

  // 텍스트 검색만 우선 반영 (필요 시 다른 필터 추가해서 확장)
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return COURSES;
    return COURSES.filter((c) => {
      const hay = `${c.title} ${c.teacher} ${c.uni}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q]);

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      {/* --- 검색 필터 그리드 --- */}
      <div className="bg-white rounded-2xl shadow-soft border border-slate-100 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select className="h-11 rounded-xl border px-3">
            <option>카테고리 선택</option>
          </select>
          <select className="h-11 rounded-xl border px-3">
            <option>교육기관명</option>
          </select>
          <select className="h-11 rounded-xl border px-3">
            <option>난이도 선택</option>
          </select>
          <select className="h-11 rounded-xl border px-3">
            <option>기간 선택</option>
          </select>
          <select className="h-11 rounded-xl border px-3">
            <option>언어 선택</option>
          </select>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="찾고 싶은 강좌를 검색해보세요"
            className="md:col-span-2 h-11 rounded-xl border px-3"
          />

          <button className="h-11 rounded-xl bg-primary text-white hover:brightness-105">
            세부 검색 실행
          </button>
        </div>
      </div>

      {/* --- 결과 수 --- */}
      <div className="text-sm text-slate-500 mb-3">
        총 <span className="text-slate-900 font-semibold">{filtered.length}</span>개의 강좌
      </div>

      {/* --- 카드 그리드 --- */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </div>
  );
}
