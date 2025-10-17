import { useMemo, useState } from "react";
import CourseCard from "../shared/CourseCard.jsx";

// 퀵 필터 툴바 – 파일 생성 안 해도 되게 내부 컴포넌트로 둠
function SearchToolbar({ filters, setFilters, onSearch }) {
  const set = (k) => (e) => setFilters((p) => ({ ...p, [k]: e.target.value }));
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
      <div className="grid gap-3 md:grid-cols-3">
        <select className="input" value={filters.category} onChange={set("category")}>
          <option>카테고리 선택</option>
          <option>컴퓨터공학</option>
          <option>데이터</option>
          <option>프론트엔드</option>
        </select>
        <select className="input" value={filters.org} onChange={set("org")}>
          <option>교육기관명</option>
          <option>서울대학교</option>
          <option>부산대학교</option>
          <option>연세대학교</option>
        </select>
        <select className="input" value={filters.level} onChange={set("level")}>
          <option>난이도 선택</option>
          <option>입문</option>
          <option>초급</option>
          <option>중급</option>
        </select>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <select className="input" value={filters.period} onChange={set("period")}>
          <option>기간 선택</option>
          <option>2주</option>
          <option>4주</option>
          <option>8주</option>
        </select>
        <select className="input" value={filters.lang} onChange={set("lang")}>
          <option>언어 선택</option>
          <option>한국어</option>
          <option>영어</option>
        </select>
        <input
          className="input"
          placeholder="강사명"
          value={filters.teacher}
          onChange={set("teacher")}
        />
      </div>

      <div className="mt-3 flex gap-3">
        <input
          className="input flex-1"
          placeholder="찾고 싶은 강좌를 검색해보세요"
          value={filters.q}
          onChange={set("q")}
        />
        <button onClick={onSearch} className="btn btn-primary px-5">
          세부 검색 실행
        </button>
      </div>
    </div>
  );
}

const RAW = [
  {
    slug: "seed-101",
    title: "인류학의 이해",
    uni: "전북대학교",
    teacher: "김O○",
    weeks: 14,
    students: "12.4만",
    rating: 4.6,
    tag: "입문",
    img: "/img/seed.png",
    category: "인문",
  },
  {
    slug: "data-201",
    title: "파이썬으로 데이터 과학",
    uni: "부산대학교",
    teacher: "박○○",
    weeks: 14,
    students: "12.4만",
    rating: 4.6,
    tag: "데이터",
    img: "/img/data.png",
    category: "데이터",
  },
  {
    slug: "react-301",
    title: "리액트 고급 개발",
    uni: "서울대학교",
    teacher: "이○○",
    weeks: 14,
    students: "12.4만",
    rating: 4.6,
    tag: "프론트엔드",
    img: "/img/react.png",
    category: "프론트엔드",
  },
  {
    slug: "alfago-101",
    title: "작물재배 전문가 기초",
    uni: "충북대학교",
    teacher: "김○○",
    weeks: 14,
    students: "6,780명",
    rating: 4.6,
    tag: "입문",
    img: "/img/alfago.png",
    category: "자연",
  },
  {
    slug: "human-101",
    title: "생체데이터와 인공지능의 이해",
    uni: "부산대학교",
    teacher: "박○○",
    weeks: 14,
    students: "6,780명",
    rating: 4.6,
    tag: "데이터",
    img: "/img/human.png",
    category: "데이터",
  },
  {
    slug: "pandas-201",
    title: "Pandas로 데이터 분석 기초",
    uni: "고려대학교",
    teacher: "김○○",
    weeks: 14,
    students: "6,780명",
    rating: 4.6,
    tag: "데이터",
    img: "/img/pandas.png",
    category: "데이터",
  },
  {
    slug: "python-101",
    title: "파이썬 기초부터 실무",
    uni: "한양대학교",
    teacher: "최○○",
    weeks: 14,
    students: "6,780명",
    rating: 4.6,
    tag: "프로그래밍",
    img: "/img/python.png",
    category: "프로그래밍",
  },
  {
    slug: "block-101",
    title: "전기자동차 배터리 시스템",
    uni: "서울대학교",
    teacher: "이○○",
    weeks: 14,
    students: "6,780명",
    rating: 4.6,
    tag: "공학",
    img: "/img/block.png",
    category: "공학",
  },
  {
    slug: "edu-pro2",
    title: "데이터 시각화 마스터클래스",
    uni: "연세대학교",
    teacher: "박○○",
    weeks: 14,
    students: "6,780명",
    rating: 4.6,
    tag: "데이터",
    img: "/img/edu_pro2.png",
    category: "데이터",
  },
];

export default function Search() {
  const [filters, setFilters] = useState({
    category: "",
    org: "",
    level: "",
    period: "",
    lang: "",
    teacher: "",
    q: "",
  });
  const [query, setQuery] = useState({}); // 실제 검색 적용 값

  const list = useMemo(() => {
    const q = (query.q || "").trim().toLowerCase();
    return RAW.filter((c) => {
      const okQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.uni.toLowerCase().includes(q) ||
        (c.teacher || "").toLowerCase().includes(q);
      const okCat = !query.category || query.category === "카테고리 선택" || c.category === query.category || (query.category === "데이터" && c.tag === "데이터");
      const okOrg = !query.org || query.org === "교육기관명" || c.uni === query.org;
      return okQ && okCat && okOrg;
    });
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-5 py-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-slate-700">총 <b>{list.length}</b>개의 강좌</div>
        <select className="input w-28">
          <option>최신순</option>
          <option>인기순</option>
          <option>평점순</option>
        </select>
      </div>

      <SearchToolbar
        filters={filters}
        setFilters={setFilters}
        onSearch={() => setQuery(filters)}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <CourseCard key={c.slug} {...c} />
        ))}
      </div>
    </div>
  );
}
