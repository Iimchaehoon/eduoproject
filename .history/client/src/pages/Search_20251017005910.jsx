// src/pages/Search.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/** 데모 이미지 */
const IMG = {
  cloud: "/img/cloud.png",
  human: "/img/human.png",
  battery: "/img/battery.png",
  pandas: "/img/pandas.png",
  react: "/img/react.png",
  data: "/img/data.png",
  block: "/img/block.png",
  deep: "/img/deep.png",
  seed: "/img/seed.png",
  pyton_data: "/img/pyton_data.png",
};
const ICON = { week: "/img/clock.png", people: "/img/jobs.png" };

/** 데모 데이터(서버 없을 때 fallback) */
const DEMO = [
  { slug:"human-under", title:"인류학의 이해", org:"전북대학교", img:"human", rating:4.6, votes:"9.8천+", period:"14주", peopleText:"23,000명", tag:"인문학" },
  { slug:"pandas-basic", title:"Python 및 Pandas 활용 데이터 분석 기초 과정", org:"부산대학교", img:"pandas", rating:4.6, votes:"5.2천+", period:"14주", peopleText:"23,000명", tag:"데이터 과학" },
  { slug:"react-advanced", title:"리액트 고급 개발", org:"서울대학교", img:"react", rating:4.8, votes:"9.8천+", period:"14주", peopleText:"23,000명", tag:"웹 · 프론트" },
  { slug:"dataviz-master", title:"데이터 시각화 마스터클래스", org:"연세대학교", img:"data", rating:4.7, votes:"6.5천+", period:"14주", peopleText:"23,000명", tag:"데이터분석" },
  { slug:"block-basic", title:"블록체인 기초부터 실무", org:"한양대학교", img:"block", rating:4.6, votes:"5.2천+", period:"14주", peopleText:"23,000명", tag:"블록체인" },
  { slug:"dl-nn", title:"신경망 및 딥러닝", org:"고려대학교", img:"deep", rating:4.9, votes:"12.4천+", period:"14주", peopleText:"23,000명", tag:"딥러닝" },
];

/** 공통 카드 */
function CourseCard({ item, onApply }) {
  const { title, org, img, period, peopleText, rating, votes } = item;
  return (
    <div className="group rounded-2xl bg-white shadow-[0_10px_26px_rgba(16,24,40,.08)] transition-transform hover:scale-[1.03]">
      <div className="relative rounded-2xl rounded-b-none overflow-hidden aspect-[16/9] bg-[#F2F4F8]">
        <img src={IMG[img]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <div className="text-[15px] text-[#8B95A1]">{org}</div>
        <div className="mt-1 text-[18px] font-bold text-[#101828] leading-snug">{title}</div>

        <div className="mt-3 flex items-center gap-6 text-[13px] text-[#6B7686]">
          <span className="inline-flex items-center gap-1">
            <img src={ICON.week} className="w-[14px] h-[14px] opacity-70" alt="" />
            {period}
          </span>
          <span className="inline-flex items-center gap-1">
            <img src={ICON.people} className="w-[14px] h-[14px] opacity-70" alt="" />
            {peopleText} 학생
          </span>
        </div>

        <div className="mt-3 flex items-center gap-1 text-[13px] text-[#6B7686]">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="#F8B84A" aria-hidden="true">
            <path d="M10 15.27l-5.18 3.05 1.58-5.36L1.82 8.9l5.47-.4L10 3.5l2.71 4.99 5.47.4-4.58 4.06 1.58 5.36z" />
          </svg>
          <span className="font-semibold text-[#374151]">{rating.toFixed?.(1) ?? rating}</span>
          <span className="text-[#9CA3AF]">· {votes}</span>
        </div>

        <div className="mt-4 flex justify-end">
          {/* ✅ 버튼으로만 상세 이동 */}
          <button
            onClick={onApply}
            className="px-4 h-10 rounded-lg bg-[#2C6BFF] text-white text-sm font-semibold hover:brightness-110"
          >
            수강신청
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Search(){
  const nav = useNavigate();
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState(DEMO); // 초기 로컬

  const q = (params.get("q") || "").trim();
  const page = Number(params.get("page") || 1);
  const size = Number(params.get("size") || 9);
  // 기타 필터들도 필요시 params.get(...) 추가

  // ✅ 서버 API 있으면 사용 / 없으면 로컬 DEMO
  useEffect(() => {
    let aborted = false;
    (async () => {
      setLoading(true);
      try {
        const url = `/api/search?${[
          q ? `q=${encodeURIComponent(q)}` : "",
          `page=${page}`,
          `size=${size}`,
        ].filter(Boolean).join("&")}`;
        const r = await fetch(url, { method:"GET" });
        if (!aborted && r.ok) {
          const json = await r.json();
          const mapped = (json.items || []).map(it => ({
            slug: it.slug || it.id || "kocw",
            title: it.title,
            org: it.teacher?.split("·")[1]?.trim() || it.org || "기관",
            img: "pandas", // 서버에서 thumb 없으면 임시
            rating: Number(it.rating || 4.6),
            votes: "1.2만+",
            period: it.weeks || "14주",
            peopleText: it.students?.replace("명","") || "23,000",
          }));
          if (!aborted) setItems(mapped.length ? mapped : DEMO);
        } else {
          if (!aborted) setItems(DEMO);
        }
      } catch {
        if (!aborted) setItems(DEMO);
      } finally {
        if (!aborted) setLoading(false);
      }
    })();
    return () => { aborted = true; };
  }, [q, page, size]);

  // ✅ “검색어가 있으면” 해당 키워드에 매칭되는 것만 보여주기
  const filtered = useMemo(() => {
    if (!q) return items.slice(0, size);
    const k = q.toLowerCase();
    return items.filter(c =>
      `${c.title} ${c.org}`.toLowerCase().includes(k)
    );
  }, [items, q, size]);

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="max-w-[1120px] mx-auto px-5 pt-6">
        <div className="text-[13px] text-[#8B95A1]">
          총 <b className="text-[#111827]">{filtered.length}</b>개의 강좌
        </div>
      </div>

      <div className="max-w-[1120px] mx-auto px-5 mt-8 pb-16">
        {loading ? (
          <div className="text-sm text-slate-500">불러오는 중…</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <CourseCard
                key={c.slug}
                item={c}
                onApply={() => nav(`/course/${c.slug}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
