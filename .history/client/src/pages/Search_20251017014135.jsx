import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CourseCard from "../shared/CourseCard.jsx";

// ✅ 예전과 동일한 목업(원래 9개/페이지 페이징)
const MOCK = Array.from({ length: 240 }).map((_, i) => ({
  slug: `mock-${Math.floor(i / 12) + 1}-${(i % 12) + 1}`,
  title: ["인류학의 이해", "파이썬으로 데이터 과학", "리액트 고급 개발", "데이터 시각화 마스터클래스", "블록체인 기초부터 실무", "신경망 및 딥러닝"][i % 6],
  teacher: ["김OO", "박OO", "이OO", "정OO", "최OO", "김OO"][i % 6] + " · " + ["전북대학교", "부산대학교", "서울대학교", "연세대학교", "한양대학교", "고려대학교"][i % 6],
  image: "/img/card_mock.png",
  tag: ["인문학", "데이터", "웹·프론트", "시각화", "블록체인", "AI"][i % 6],
  match: "",
  desc: "",
  rating: 4.6,
  people: "1.2만+",
}));

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Search() {
  const q = useQuery();
  const nav = useNavigate();

  const page = Math.max(1, Number(q.get("page") || 1));
  const size = Math.max(1, Number(q.get("size") || 9));
  const keyword = (q.get("q") || "").trim();

  const filtered = useMemo(() => {
    if (!keyword) return MOCK;
    const k = keyword.toLowerCase();
    return MOCK.filter(
      (c) => c.title.toLowerCase().includes(k) || c.teacher.toLowerCase().includes(k)
    );
  }, [keyword]);

  const total = filtered.length;
  const from = (page - 1) * size;
  const items = filtered.slice(from, from + size);

  const goDetail = (slug) => nav(`/course/${slug}`);

  return (
    <div className="max-w-6xl mx-auto px-5 py-6">
      {/* 상단 필터 영역은 기존 UI 유지(폼만 보여주고 동작은 그대로) */}
      <div className="card p-4 mb-6">
        <div className="grid md:grid-cols-3 gap-3">
          <select className="pill"><option>카테고리 선택</option></select>
          <input className="pill" placeholder="교육기관명" />
          <select className="pill"><option>난이도 선택</option></select>
          <select className="pill"><option>기간 선택</option></select>
          <select className="pill"><option>언어 선택</option></select>
          <input className="pill" placeholder="강사명" />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input className="pill flex-1" placeholder="찾고 싶은 강좌를 검색해보세요" defaultValue={keyword}/>
          <button className="btn btn-primary"
            onClick={() => nav(`/search?q=${encodeURIComponent(keyword)}&page=1&size=${size}`)}
          >세부 검색 실행</button>
        </div>
      </div>

      {/* 결과 */}
      <div className="text-sm text-slate-500 mb-2">총 {total}개의 강좌</div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((c) => (
          <CourseCard
            key={c.slug}
            slug={c.slug}
            image={c.image}
            title={c.title}
            teacher={c.teacher}
            tag={c.tag}
            match={c.match}
            desc={c.desc}
            rating={c.rating}
            people={c.people}
            // ✅ 카드 내부 클릭 방지 — 버튼만 이동
            cardClickable={false}
            onApply={() => goDetail(c.slug)}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: Math.ceil(total / size) }).map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() =>
                nav(`/search?q=${encodeURIComponent(keyword)}&page=${p}&size=${size}`)
              }
              className={`w-8 h-8 rounded-md ${p === page ? "bg-primary text-white" : "bg-slate-100"}`}
            >
              {p}
            </button>
          );
        })}
      </div>
    </div>
  );
}
