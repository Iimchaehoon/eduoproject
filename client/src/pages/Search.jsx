import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { fetchCourses } from "../utils/api.js";
import CourseCard from "../shared/CourseCard.jsx";

/** 이미지 매핑 (fallback 목업용) */
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
  alfago: "/img/alfago.png",
  pyton_data: "/img/pyton_data.png",
};

/** 폴백용 목업 데이터 (API 실패 시) */
const ALL = [
  { slug:"cloud-sec", title:"클라우드 보안 엔지니어 실무과정", org:"한동대학교", teacher:"김OO",
    badge:["보안","클라우드"], img:"cloud", rating:4.9, votes:"1.2만+", period:"14주", category:"컴퓨터과학", level:"중급" },
  { slug:"human-under", title:"인류학의 이해", org:"전북대학교", teacher:"김OO",
    badge:["인문학"], img:"human", rating:4.6, votes:"9.8천+", period:"14주", category:"인문학", level:"입문" },
  { slug:"battery-sys", title:"전기자동차 배터리 시스템", org:"한국폴리텍", teacher:"정OO",
    badge:["전기","배터리"], img:"battery", rating:4.7, votes:"6.5천+", period:"14주", category:"공학", level:"중급" },
  { slug:"pandas-basic", title:"Python 및 Pandas 활용 데이터 분석 기초 과정", org:"부산대학교", teacher:"박OO",
    badge:["데이터 과학"], img:"pandas", rating:4.6, votes:"5.2천+", period:"14주", category:"컴퓨터과학", level:"입문" },
  { slug:"react-advanced", title:"리액트 고급 개발", org:"서울대학교", teacher:"이OO",
    badge:["웹 · 프론트"], img:"react", rating:4.8, votes:"9.8천+", period:"14주", category:"컴퓨터과학", level:"고급" },
  { slug:"dataviz-master", title:"데이터 시각화 마스터클래스", org:"연세대학교", teacher:"박OO",
    badge:["데이터분석"], img:"data", rating:4.7, votes:"6.5천+", period:"14주", category:"자연과학", level:"중급" },
  { slug:"block-basic", title:"블록체인 기초부터 실무", org:"한양대학교", teacher:"최OO",
    badge:["블록체인"], img:"block", rating:4.6, votes:"5.2천+", period:"14주", category:"컴퓨터과학", level:"입문" },
  { slug:"dl-nn", title:"신경망 및 딥러닝", org:"고려대학교", teacher:"김OO",
    badge:["딥러닝"], img:"deep", rating:4.9, votes:"12.4천+", period:"14주", category:"컴퓨터과학", level:"고급" },
  { slug:"bio-ai", title:"생체데이터와 인공지능의 이해", org:"중앙대학교", teacher:"유OO",
    badge:["바이오 · AI"], img:"seed", rating:4.6, votes:"5.9천+", period:"14주", category:"자연과학", level:"중급" },
];

function FilterBox({ label, children }) {
  return (
    <label className="text-[13px]">
      <div className="mb-1 text-[#7A8292]">{label}</div>
      {children}
    </label>
  );
}

const RECENT_KEY = "eduo_recent_searches";

export default function Search() {
  const nav = useNavigate();
  const [sp, setSp] = useSearchParams();

  // URL 쿼리
  const qParam = (sp.get("q") || "").trim();
  const page = Number(sp.get("page") || 1);
  const size = Number(sp.get("size") || 9);        // ✅ 기본 9
  const sort = sp.get("sort") || "latest";

  // 필터 폼 상태
  const [q, setQ] = useState(qParam);
  const [category, setCategory] = useState(sp.get("category") || "");
  const [org, setOrg] = useState(sp.get("uni") || "");
  const [level, setLevel] = useState(sp.get("level") || "");
  const [language, setLanguage] = useState(sp.get("lang") || "");
  const [teacher, setTeacher] = useState(sp.get("teacher") || "");
  const [freeOnly, setFreeOnly] = useState(sp.get("free") === "1");
  const [certOnly, setCertOnly] = useState(sp.get("cert") === "1");

  // 데이터
  const [items, setItems] = useState([]);   // API 결과 or 폴백
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // 최근 검색어
  const [recentOpen, setRecentOpen] = useState(false);
  const [recent, setRecent] = useState(() => {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); } catch { return []; }
  });

  // API 호출
  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      try {
        const data = await fetchCourses({
          q: qParam,
          page,
          size,
          sort,
          category,
          uni: org,
          level,
          lang: language,
          teacher,
          free: freeOnly ? 1 : "",
          cert: certOnly ? 1 : "",
        });
        if (cancelled) return;

        // 서버 형식 → 우리 카드 구조로 가볍게 맞춤
        const normalized = (data.items || []).map((it) => ({
          slug: it.slug || it.id || `kocw-${it.code}`,
          title: it.title,
          teacher: it.teacher || it.instructor || "",
          org: (it.teacher || it.instructor ? (it.teacher || it.instructor).split("·")[1] : "") || it.org || "",
          image: it.image || it.thumbnail || "/img/placeholder.png",
          rating: Number(it.rating || 4.6),
          votes: it.students || it.learners || it.hits || "1.2만+",
          period: it.weeks || it.durationWeeks || "14주",
          badge: it.badge || it.tags || [],
          category: it.category || "",
          level: it.level || "",
        }));

        setItems(normalized);
        setTotal(Number(data.total || normalized.length));
      } catch (e) {
        // 폴백: 목업 데이터 사용
        const normalized = ALL.map((c) => ({
          slug: c.slug,
          title: c.title,
          teacher: `${c.teacher || ""} · ${c.org}`,
          org: c.org,
          image: IMG[c.img],
          rating: c.rating,
          votes: c.votes,
          period: c.period,
          badge: c.badge,
          category: c.category,
          level: c.level,
        }));
        setItems(normalized);
        setTotal(normalized.length);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [qParam, page, size, sort, category, org, level, language, teacher, freeOnly, certOnly]);

  // 검색어가 있으면 → 해당 키워드 포함 강좌만, 페이지네이션 숨김
  const visible = useMemo(() => {
    if (!qParam) return items; // 서버가 이미 9개/페이지 내려준다고 가정
    const kw = qParam.toLowerCase();
    return items.filter((it) => (it.title || "").toLowerCase().includes(kw));
  }, [items, qParam]);

  const totalCount = qParam ? visible.length : total;

  const apply = () => {
    // 최근 검색어 저장
    const next = [q, ...recent.filter((x) => x !== q)].slice(0, 6);
    setRecent(next);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch {}

    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (org) params.set("uni", org);
    if (level) params.set("level", level);
    if (language) params.set("lang", language);
    if (teacher) params.set("teacher", teacher);
    if (freeOnly) params.set("free", "1");
    if (certOnly) params.set("cert", "1");
    params.set("page", "1");          // 검색/필터 바뀌면 1페이지로
    params.set("size", String(size));
    params.set("sort", sort);
    nav(`/search?${params.toString()}`);
  };

  const reset = () => {
    setQ("");
    setCategory("");
    setOrg("");
    setLevel("");
    setLanguage("");
    setTeacher("");
    setFreeOnly(false);
    setCertOnly(false);
    nav(`/search?page=1&size=9&sort=latest`);
  };

  const setPage = (n) => {
    const p = new URLSearchParams(sp);
    p.set("page", String(n));
    nav(`/search?${p.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      <div className="max-w-[1120px] mx-auto px-5 pt-6">
        <div className="text-[13px] text-[#8B95A1] flex items-center gap-2">
          <Link to="/" className="hover:underline">돌아가기</Link>
          <span>›</span>
          <span className="text-[#111827]">'강좌'에 대한 검색 결과</span>
        </div>
        <div className="mt-2 text-sm text-[#6B7280]">
          총 <b className="text-[#111827]">{totalCount}</b>개의 강좌
        </div>
      </div>

      {/* 정렬 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-2 flex justify-end">
        <select
          value={sort}
          onChange={(e) => {
            const p = new URLSearchParams(sp);
            p.set("sort", e.target.value);
            p.set("page", "1");
            nav(`/search?${p.toString()}`);
          }}
          className="h-9 rounded-lg border border-[#E5E7EB] px-2 text-sm text-[#374151]"
        >
          <option value="latest">최신순</option>
          <option value="rating">평점순</option>
        </select>
      </div>

      {/* 필터 패널 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-4">
        <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(16,24,40,.06)] p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FilterBox label="카테고리">
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option value="">카테고리 선택</option>
                <option>인문학</option>
                <option>자연과학</option>
                <option>공학</option>
                <option>컴퓨터과학</option>
              </select>
            </FilterBox>

            <FilterBox label="교육기관">
              <input value={org} onChange={(e) => setOrg(e.target.value)}
                placeholder="교육기관명"
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3" />
            </FilterBox>

            <FilterBox label="난이도">
              <select value={level} onChange={(e) => setLevel(e.target.value)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option value="">난이도 선택</option>
                <option>입문</option>
                <option>중급</option>
                <option>고급</option>
              </select>
            </FilterBox>

            <FilterBox label="강좌 기간">
              <select className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option>기간 선택</option>
                <option>4~8주</option>
                <option>9~16주</option>
              </select>
            </FilterBox>

            <FilterBox label="강의 언어">
              <select value={language} onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option value="">언어 선택</option>
                <option>한국어</option>
                <option>영어</option>
              </select>
            </FilterBox>

            <FilterBox label="강사명">
              <input value={teacher} onChange={(e) => setTeacher(e.target.value)}
                placeholder="강사명"
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3" />
            </FilterBox>

            {/* 검색어 + 최근 검색 드롭다운 */}
            <FilterBox label="검색어">
              <div className="relative">
                <img
                  src="/img/dot_icon.png"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70"
                />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onFocus={() => setRecentOpen(true)}
                  onBlur={() => setTimeout(()=>setRecentOpen(false), 150)}
                  placeholder="찾고 싶은 강좌를 검색해보세요"
                  onKeyDown={(e)=>{ if(e.key==='Enter') apply(); }}
                  className="w-full h-10 pl-9 rounded-lg border border-[#E5E7EB] px-3"
                />
                {recentOpen && recent.length > 0 && (
                  <div className="absolute z-10 mt-2 w-full rounded-xl bg-white shadow-[0_12px_28px_rgba(16,24,40,.12)] p-2">
                    <div className="px-2 py-1 text-[12px] text-[#6B7280]">최근 검색</div>
                    {recent.map((r) => (
                      <div
                        key={r}
                        className="px-3 py-2 text-[14px] hover:bg-[#F3F4F6] cursor-pointer rounded-md"
                        onMouseDown={() => { setQ(r); setTimeout(apply, 0); }}
                      >
                        {r}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FilterBox>

            <div className="flex items-center gap-4 mt-2 md:mt-8">
              <label className="inline-flex items-center gap-2 text-[13px]">
                <input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} />
                무료 강좌
              </label>
              <label className="inline-flex items-center gap-2 text-[13px]">
                <input type="checkbox" checked={certOnly} onChange={(e) => setCertOnly(e.target.checked)} />
                수료증 제공
              </label>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <button onClick={reset}
              className="px-4 h-10 rounded-lg border border-[#E5E7EB] text-[#374151] text-sm hover:bg-[#F3F4F6]">
              초기화
            </button>
            <button onClick={apply}
              className="px-5 h-10 rounded-lg bg-[#121417] text-white text-sm shadow hover:brightness-110">
              세부 검색 실행
            </button>
          </div>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-8 pb-16">
        {loading ? (
          <div className="py-16 text-center text-[#6B7280]">불러오는 중…</div>
        ) : visible.length === 0 ? (
          <div className="py-16 text-center text-[#6B7280]">검색 조건에 맞는 강좌가 없습니다.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((c) => (
              <CourseCard
                key={c.slug}
                slug={c.slug}
                image={c.image || IMG[c.img]}
                title={c.title}
                teacher={c.teacher || `${c.org}`}
                tag={c.badge?.[0]}
                field={c.category}
                level={c.level}
                rating={c.rating}
                people={c.votes}
                weeks={c.period}
                badges={c.badge}
              />
            ))}
          </div>
        )}

        {/* 페이지네이션: 검색어가 있을 땐 숨김, 없을 땐 표시 */}
        {!qParam && !loading && totalCount > 0 && (
          <div className="mt-10 flex items-center justify-center gap-1 text-[13px]">
            <button className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]" onClick={() => setPage(Math.max(1, page - 1))}>‹</button>
            {[...Array(5)].map((_, i) => {
              const n = i + 1;
              return (
                <button key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 rounded-md ${n===page ? "bg-[#121417] text-white" : "hover:bg-[#EEF2F7]"}`}>
                  {n}
                </button>
              );
            })}
            <button className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]" onClick={() => setPage(page + 1)}>›</button>
          </div>
        )}
      </div>
    </div>
  );
}
