// client/src/pages/Search.jsx
import { useMemo, useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

/** 업로드 해둔 이미지 파일명 매핑 (public/img) */
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
  pyton_data: "/img/pyton_data.png", // 철자 주의(업로드 폴더 기준)
};

/** 카드에 쓰는 공통 아이콘 */
const ICON = {
  search: "/img/dot_icon.png", // 돋보기
  week: "/img/clock.png",      // 시계
  people: "/img/jobs.png",     // 수강생 아이콘 대용
};

/** 더미 코스 데이터 */
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

/* ---------- 필터 박스 ---------- */
function FilterBox({ label, children }) {
  return (
    <label className="text-[13px]">
      <div className="mb-1 text-[#7A8292]">{label}</div>
      {children}
    </label>
  );
}

/* ---------- 페이지 ---------- */
export default function Search() {
  const nav = useNavigate();

  /** ✅ 추가: URL 쿼리에서 초기 검색어 가져오기 */
  const [params] = useSearchParams();
  const initialQ = params.get("q") ?? "";

  // 필터 상태
  const [q, setQ] = useState(initialQ);            // ✅ 초기값을 쿼리로
  const [category, setCategory] = useState("");
  const [org, setOrg] = useState("");
  const [level, setLevel] = useState("");
  const [language, setLanguage] = useState("");
  const [teacher, setTeacher] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);
  const [certOnly, setCertOnly] = useState(false); // 데모용

  /** ✅ 추가: URL이 바뀌면 입력칸도 동기화 */
  useEffect(() => {
    setQ(initialQ);
  }, [initialQ]);

  /** ✅ 추가: 첫 진입에 쿼리가 있으면 결과 섹션으로 스크롤 */
  useEffect(() => {
    if (initialQ) {
      document.getElementById("search-results")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [initialQ]);

  // 필터링
  const data = useMemo(() => {
    return ALL.filter((c) => {
      if (q && !(`${c.title} ${c.org} ${c.teacher}`.toLowerCase().includes(q.toLowerCase()))) return false;
      if (category && c.category !== category) return false;
      if (org && !c.org.includes(org)) return false;
      if (level && c.level !== level) return false;
      if (language && c.language !== language) return false;
      if (teacher && !c.teacher.includes(teacher)) return false;
      if (freeOnly && c.paid) return false;
      if (certOnly) { /* 데모: 전부 통과 */ }
      return true;
    });
  }, [q, category, org, level, language, teacher, freeOnly, certOnly]);

  const reset = () => {
    setQ(""); setCategory(""); setOrg(""); setLevel(""); setLanguage(""); setTeacher("");
    setFreeOnly(false); setCertOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* 제목/브레드크럼 */}
      <div className="max-w-[1120px] mx-auto px-5 pt-6">
        <div className="text-[13px] text-[#8B95A1] flex items-center gap-2">
          <Link to="/" className="hover:underline">돌아가기</Link>
          <span>›</span>
          <span className="text-[#111827]">'강좌'에 대한 검색 결과</span>
        </div>

        <div className="mt-2 text-sm text-[#6B7280]">
          총 <b className="text-[#111827]">{data.length}</b>개의 강좌
        </div>
      </div>

      {/* 필터 패널 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-4">
        <div className="rounded-2xl bg-white shadow-[0_10px_30px_rgba(16,24,40,.06)] p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FilterBox label="카테고리">
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3 focus:outline-none">
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
                     className="w-full h-10 rounded-lg border border-[#E5E7EB] px-3 focus:outline-none" />
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

            <FilterBox label="검색어">
              <div className="relative">
                <img src={ICON.search} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-70" />
                <input value={q} onChange={(e) => setQ(e.target.value)}
                       placeholder="찾고 싶은 강좌를 검색해보세요"
                       className="w-full h-10 pl-9 rounded-lg border border-[#E5E7EB] px-3" />
              </div>
            </FilterBox>

            <div className="flex items-center gap-4 mt-2 md:mt-8">
              <label className="inline-flex items-center gap-2 text-[13px]">
                <input type="checkbox" checked={freeOnly} onChange={(e)=>setFreeOnly(e.target.checked)} />
                무료 강좌
              </label>
              <label className="inline-flex items-center gap-2 text-[13px]">
                <input type="checkbox" checked={certOnly} onChange={(e)=>setCertOnly(e.target.checked)} />
                수료증 제공
              </label>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex items-center gap-3 mt-5">
            <button onClick={reset}
              className="px-4 h-10 rounded-lg border border-[#E5E7EB] text-[#374151] text-sm hover:bg-[#F3F4F6]">
              초기화
            </button>
            <button
              className="px-5 h-10 rounded-lg bg-[#121417] text-white text-sm shadow hover:brightness-110">
              세부 검색 실행
            </button>
          </div>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="max-w-[1120px] mx-auto px-5 mt-8 pb-16">
        {/* ✅ 추가: 결과 섹션 앵커 id */}
        <div id="search-results" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((c) => (
            <CourseCard key={c.slug} course={c} onClick={() => nav(`/course/${c.slug}`)} />
          ))}
        </div>

        {/* 페이지네이션(모양만) */}
        <div className="mt-10 flex items-center justify-center gap-1 text-[13px]">
          <button className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]">‹</button>
          {[1,2,3,4,5].map(n => (
            <button key={n}
              className={`w-8 h-8 rounded-md ${n===1 ? "bg-[#121417] text-white" : "hover:bg-[#EEF2F7]"}`}>
              {n}
            </button>
          ))}
          <button className="w-8 h-8 rounded-md hover:bg-[#EEF2F7]">›</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- 카드(로컬) ---------- */
function CourseCard({ course, onClick }) {
  const { title, org, badge, rating, votes, period, peopleText, img } = course;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl bg-white shadow-[0_10px_26px_rgba(16,24,40,.08)]
                 transition-transform duration-300 hover:scale-[1.05] will-change-transform"
    >
      {/* 썸네일 */}
      <div className="relative rounded-2xl rounded-b-none overflow-hidden aspect-[16/10] bg-[#F2F4F8]">
        <img src={IMG[img]} alt="" className="w-full h-full object-cover" />
        {/* 좌측 상단 보라 배지 */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#6A56FF] text-white text-[12px] font-semibold h-7 px-3 shadow-[0_6px_16px_rgba(16,24,40,.18)]">
          {badge?.[0] ?? "추천"}
        </div>
      </div>

      {/* 본문 */}
      <div className="p-5">
        <div className="text-[15px] text-[#8B95A1]">{org}</div>
        <div className="mt-1 text-[18px] font-bold text-[#101828] leading-snug">
          {title}
        </div>

        <div className="mt-3 flex items-center gap-6 text-[13px] text-[#6B7686]">
          <span className="inline-flex items-center gap-1">
            <img src={ICON.week} className="w-[14px] h-[14px] opacity-70" />
            {period}
          </span>
          <span className="inline-flex items-center gap-1">
            <img src={ICON.people} className="w-[14px] h-[14px] opacity-70" />
            {peopleText} 학생
          </span>
        </div>

        {/* 평점 */}
        <div className="mt-3 flex items-center gap-1 text-[13px] text-[#6B7686]">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="#F8B84A" aria-hidden="true">
            <path d="M10 15.27l-5.18 3.05 1.58-5.36L1.82 8.9l5.47-.4L10 3.5l2.71 4.99 5.47.4-4.58 4.06 1.58 5.36z"/>
          </svg>
          <span className="font-semibold text-[#374151]">{rating.toFixed(1)}</span>
          <span className="text-[#9CA3AF]">· {votes}</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-1">
            {badge?.slice(0,3).map((b) => (
              <span key={b} className="px-2 h-7 rounded-md bg-[#F3F6FF] text-[#4450FF] text-[12px] inline-flex items-center">
                {b}
              </span>
            ))}
          </div>

          <button
            onClick={(e)=>{e.stopPropagation(); onClick();}}
            className="px-4 h-10 rounded-lg bg-[#2C6BFF] text-white text-sm font-semibold hover:brightness-110">
            수강신청
          </button>
        </div>
      </div>
    </div>
  );
}
