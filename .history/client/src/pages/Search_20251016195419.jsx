// client/src/pages/Search.jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

/** public/img 폴더의 파일명 매핑(폴백용) */
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
  pyton_data: "/img/pyton_data.png", // 업로드 파일명 그대로
};

/** 카드 아이콘 */
const ICON = {
  search: "/img/dot_icon.png",
  week: "/img/clock.png",
  people: "/img/jobs.png",
};

/** 더미 데이터(서버 실패 시 폴백) */
const ALL = [
  {
    slug: "cloud-sec",
    title: "클라우드 보안 엔지니어 실무과정",
    org: "한동대학교",
    badge: ["보안", "클라우드"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.9,
    votes: "1.2만+",
    img: "cloud",
    level: "중급",
    category: "컴퓨터과학",
    teacher: "최시윤",
    language: "한국어",
    paid: true,
  },
  {
    slug: "human-under",
    title: "인류학의 이해",
    org: "전북대학교",
    badge: ["인문학"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.6,
    votes: "9.8천+",
    img: "human",
    level: "입문",
    category: "인문학",
    teacher: "최신",
    language: "한국어",
    paid: false,
  },
  {
    slug: "battery-sys",
    title: "전기자동차 배터리 시스템",
    org: "한국폴리텍",
    badge: ["전기", "배터리"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.7,
    votes: "6.5천+",
    img: "battery",
    level: "중급",
    category: "공학",
    teacher: "정시윤",
    language: "한국어",
    paid: true,
  },
  {
    slug: "pandas-basic",
    title: "Python 및 Pandas 활용 데이터 분석 기초 과정",
    org: "부산대학교",
    badge: ["데이터 과학"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.6,
    votes: "5.2천+",
    img: "pandas",
    level: "입문",
    category: "컴퓨터과학",
    teacher: "김도형",
    language: "한국어",
    paid: false,
  },
  {
    slug: "react-advanced",
    title: "리액트 고급 개발",
    org: "서울대학교",
    badge: ["웹 · 프론트"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.8,
    votes: "9.8천+",
    img: "react",
    level: "고급",
    category: "컴퓨터과학",
    teacher: "이명환",
    language: "한국어",
    paid: true,
  },
  {
    slug: "dataviz-master",
    title: "데이터 시각화 마스터클래스",
    org: "연세대학교",
    badge: ["데이터분석"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.7,
    votes: "6.5천+",
    img: "data",
    level: "중급",
    category: "자연과학",
    teacher: "박시경",
    language: "한국어",
    paid: true,
  },
  {
    slug: "block-basic",
    title: "블록체인 기초부터 실무",
    org: "한양대학교",
    badge: ["블록체인"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.6,
    votes: "5.2천+",
    img: "block",
    level: "입문",
    category: "컴퓨터과학",
    teacher: "최필윤희",
    language: "한국어",
    paid: false,
  },
  {
    slug: "dl-nn",
    title: "신경망 및 딥러닝",
    org: "고려대학교",
    badge: ["딥러닝"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.9,
    votes: "12.4천+",
    img: "deep",
    level: "고급",
    category: "컴퓨터과학",
    teacher: "김세라",
    language: "한국어",
    paid: true,
  },
  {
    slug: "bio-ai",
    title: "생체데이터와 인공지능의 이해",
    org: "중앙대학교",
    badge: ["바이오 · AI"],
    period: "14주",
    peopleText: "23,000명",
    rating: 4.6,
    votes: "5.9천+",
    img: "seed",
    level: "중급",
    category: "자연과학",
    teacher: "유현",
    language: "한국어",
    paid: true,
  },
];

/* 공통 필터 박스 */
function FilterBox({ label, children }) {
  return (
    <label className="text-[13px]">
      <div className="mb-1 text-[#7A8292]">{label}</div>
      {children}
    </label>
  );
}

export default function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  /** 필터 상태 (URL ↔ 상태 동기화) */
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [org, setOrg] = useState(searchParams.get("uni") || "");
  const [level, setLevel] = useState(searchParams.get("level") || "");
  const [language, setLanguage] = useState(searchParams.get("lang") || "");
  const [teacher, setTeacher] = useState(searchParams.get("teacher") || "");
  const [freeOnly, setFreeOnly] = useState(searchParams.get("free") === "1");
  const [certOnly, setCertOnly] = useState(searchParams.get("cert") === "1");
  const [sort, setSort] = useState(searchParams.get("sort") || "latest");

  /** 결과 상태 */
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  /** URL 쿼리 업데이트 */
  const applyParams = (extra = {}) => {
    const next = {
      q,
      category,
      uni: org,
      level,
      lang: language,
      teacher,
      free: freeOnly ? "1" : undefined,
      cert: certOnly ? "1" : undefined,
      sort,
      page: searchParams.get("page") || "1",
      size: searchParams.get("size") || "12",
      ...extra,
    };
    // 비어있는 값은 제거
    Object.keys(next).forEach((k) => (next[k] === "" || next[k] === undefined) && delete next[k]);
    setSearchParams(next);
  };

  /** API 호출 */
  const fetchList = async () => {
    try {
      setLoading(true);
      const page = Number(searchParams.get("page") || 1);
      const size = Number(searchParams.get("size") || 12);
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (org) params.set("uni", org);
      if (language) params.set("lang", language);
      if (level) params.set("level", level);
      params.set("page", String(page));
      params.set("size", String(size));

      // 프록시(vite.config.js) 설정되어 있어야 /api → http://localhost:5000
      const r = await fetch(`/api/search?${params.toString()}`);
      if (!r.ok) throw new Error(`API ${r.status}`);
      const data = await r.json();

      // 서버가 items 필드로 돌려주도록 구현되어 있음
      const mapped = (data.items || []).map((it) => ({
        slug: it.slug || it.id || `kocw-${Math.random().toString(36).slice(2, 9)}`,
        title: it.title,
        org: (it.teacher || "").split(" · ")[1] || "기관미상",
        badge: [], // 필요 시 it.tags 등 매핑
        period: it.weeks || "14주",
        peopleText: (it.students || "23,000명").replace("명", ""),
        rating: Number(it.rating || 4.6),
        votes: "1.2만+",
        imgUrl: it.image, // API 절대경로 이미지
      }));

      setItems(mapped);
      setTotal(data.total || mapped.length);
    } catch (e) {
      // 실패 시 폴백 (기존 9개 유지)
      const fallback = ALL.map((c) => ({
        slug: c.slug,
        title: c.title,
        org: c.org,
        badge: c.badge,
        period: c.period,
        peopleText: c.peopleText,
        rating: c.rating,
        votes: c.votes,
        imgKey: c.img,
      }));
      setItems(fallback);
      setTotal(fallback.length);
    } finally {
      setLoading(false);
    }
  };

  /** 최초 및 쿼리 변경 시 호출 */
  useEffect(() => {
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  /** 정렬(모양 유지, 간단 정렬) */
  const sortedItems = useMemo(() => {
    const list = [...items];
    if (sort === "rating") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    // latest/popular은 서버에서 처리하는게 이상적. 여기선 그대로.
    return list;
  }, [items, sort]);

  /** UI 리셋 */
  const reset = () => {
    setQ("");
    setCategory("");
    setOrg("");
    setLevel("");
    setLanguage("");
    setTeacher("");
    setFreeOnly(false);
    setCertOnly(false);
    setSort("latest");
    setSearchParams({}); // URL도 비움
  };

  /** 실행 버튼 */
  const runSearch = () => {
    applyParams({ page: "1" });
    document.querySelector("#results")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* 브레드크럼 & 카운트 */}
      <div className="max-w-[1120px] mx-auto px-5 pt-6">
        <div className="text-[13px] text-[#8B95A1] flex items-center gap-2">
          <Link to="/" className="hover:underline">돌아가기</Link>
          <span>›</span>
          <span className="text-[#111827]">'강좌'에 대한 검색 결과</span>
        </div>

        <div className="mt-2 text-sm text-[#6B7280]">
          총 <b className="text-[#111827]">{total}</b>개의 강좌
        </div>
      </div>

      {/* 정렬 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-2 flex justify-end">
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value); applyParams({ sort: e.target.value }); }}
          className="h-9 rounded-lg border border-[#E5E7EB] px-2 text-sm text-[#374151]"
        >
          <option value="latest">최신순</option>
          <option value="popular">인기순</option>
          <option value="rating">평점순</option>
        </select>
      </div>

      {/* 필터 패널 (UI 동일) */}
      <div className="max-w-[1120px] mx-auto px-5 mt-4">
        <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(16,24,40,.06)] p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FilterBox label="카테고리">
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3 focus:outline-none">
                <option value="">카테고리 선택</option>
                <option value="인문학">인문학</option>
                <option value="자연과학">자연과학</option>
                <option value="공학">공학</option>
                <option value="컴퓨터과학">컴퓨터과학</option>
              </select>
            </FilterBox>

            <FilterBox label="교육기관">
              <input value={org} onChange={(e) => setOrg(e.target.value)}
                placeholder="교육기관명"
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3 focus:outline-none" />
            </FilterBox>

            <FilterBox label="난이도">
              <select value={level} onChange={(e) => setLevel(e.target.value)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3">
                <option value="">난이도 선택</option>
                <option value="입문">입문</option>
                <option value="중급">중급</option>
                <option value="고급">고급</option>
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
                <option value="한국어">한국어</option>
                <option value="영어">영어</option>
              </select>
            </FilterBox>

            <FilterBox label="강사명">
              <input value={teacher} onChange={(e) => setTeacher(e.target.value)}
                placeholder="강사명"
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3" />
            </FilterBox>

            <FilterBox label="검색어">
              <div className="relative">
                <img
                  src={ICON.search}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70"
                  alt=""
                />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="찾고 싶은 강좌를 검색해보세요"
                  className="w-full h-10 pl-9 rounded-lg border border-[#E5E7EB] px-3"
                  onKeyDown={(e) => { if (e.key === "Enter") runSearch(); }}
                />
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

          {/* 버튼 */}
          <div className="flex items-center gap-3 mt-5">
            <button
              onClick={reset}
              className="px-4 h-10 rounded-lg border border-[#E5E7EB] text-[#374151] text-sm hover:bg-[#F3F4F6]"
            >
              초기화
            </button>
            <button
              onClick={runSearch}
              className="px-5 h-10 rounded-lg bg-[#121417] text-white text-sm shadow hover:brightness-110"
            >
              세부 검색 실행
            </button>
          </div>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-8 pb-16">
        {loading && (
          <div className="text-center text-[#6B7280] py-12">검색 중…</div>
        )}
        {!loading && (
          <div id="results" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        )}

        {/* 페이지네이션(모양) */}
        <div className="mt-10 flex items-center justify-center gap-1 text-[13px]">
          <button
            className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]"
            onClick={() => applyParams({ page: String(Math.max(1, Number(searchParams.get("page") || 1) - 1)) })}
          >
            ‹
          </button>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`w-8 h-8 rounded-md ${String(n) === (searchParams.get("page") || "1")
                  ? "bg-[#121417] text-white"
                  : "hover:bg-[#EEF2F7]"}`}
              onClick={() => applyParams({ page: String(n) })}
            >
              {n}
            </button>
          ))}
          <button
            className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]"
            onClick={() => applyParams({ page: String(Number(searchParams.get("page") || 1) + 1) })}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- 카드 ---------- */
function CourseCard({ course }) {
  const { title, org, badge, rating, votes, period, peopleText, imgKey, imgUrl } = course;

  const thumb = imgUrl || (imgKey ? IMG[imgKey] : "/img/cloud.png");

  return (
    <div
      className="group cursor-pointer rounded-2xl bg-white shadow-[0_10px_26px_rgba(16,24,40,.08)]
                 transition-transform duration-300 hover:scale-[1.05] will-change-transform"
    >
      {/* 썸네일 */}
      <div className="relative rounded-2xl rounded-b-none overflow-hidden aspect-[16/9] bg-[#F2F4F8]">
        <img
          src={thumb}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = "/img/cloud.png")}
        />
        {/* 좌측 상단 배지(있으면) */}
        {badge?.[0] && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#6A56FF] text-white text-[12px] font-semibold h-7 px-3 shadow-[0_6px_16px_rgba(16,24,40,.18)]">
            {badge[0]}
          </div>
        )}
      </div>

      {/* 본문 */}
      <div className="p-5">
        <div className="text-[15px] text-[#8B95A1]">{org}</div>
        <div className="mt-1 text-[18px] font-bold text-[#101828] leading-snug">
          {title}
        </div>

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

        {/* 평점 */}
        <div className="mt-3 flex items-center gap-1 text-[13px] text-[#6B7686]">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="#F8B84A" aria-hidden="true">
            <path d="M10 15.27l-5.18 3.05 1.58-5.36L1.82 8.9l5.47-.4L10 3.5l2.71 4.99 5.47.4-4.58 4.06 1.58 5.36z" />
          </svg>
          <span className="font-semibold text-[#374151]">{Number(rating || 4.6).toFixed(1)}</span>
          <span className="text-[#9CA3AF]">· {votes || "1.2만+"}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1">
            {badge?.slice(0, 3).map((b) => (
              <span
                key={b}
                className="px-2 h-7 rounded-md bg-[#F3F6FF] text-[#4450FF] text-[12px] inline-flex items-center"
              >
                {b}
              </span>
            ))}
          </div>

          <button
            className="px-4 h-10 rounded-lg bg-[#2C6BFF] text-white text-sm font-semibold hover:brightness-110"
          >
            수강신청
          </button>
        </div>
      </div>
    </div>
  );
}
