import CourseCard from "../components/CourseCard.jsx";

const COURSES = [
  { slug: "seed-101",    cover: "seed.png",        tag: "입문",   title: "작물재배 전문가 기초",       uni:"전북대학교", teacher:"김OO" },
  { slug: "data-201",    cover: "data.png",        tag: "데이터", title: "파이썬으로 데이터 과학",     uni:"부산대학교", teacher:"박OO" },
  { slug: "react-301",   cover: "react.png",       tag: "프론트엔드", title: "리액트 고급 개발",      uni:"서울대학교", teacher:"이OO" },
  { slug: "deep-202",    cover: "python_data.png", tag: "데이터", title: "생체데이터와 인공지능의 이해", uni:"경희대학교", teacher:"강OO" },
  { slug: "battery-101", cover: "battery.png",     tag: "공학",   title: "전기자동차 배터리 시스템" },
  { slug: "block-101",   cover: "block.png",       tag: "블록체인", title: "블록체인 기초부터 실무" },
  { slug: "edu1-101",    cover: "edu_pro1.png",    tag: "프로그래밍", title: "클라우드 보안 엔지니어 실무과정" },
  { slug: "edu2-101",    cover: "edu_pro2.png",    tag: "데이터", title: "데이터 분석 마스터클래스" },
  { slug: "jobs-101",    cover: "jobs.png",        tag: "커리어", title: "신경망 및 딥러닝" },
];

export default function Search() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">총 {COURSES.length}개의 강좌</div>
        <select className="pill">
          <option>최신순</option><option>인기순</option><option>평점순</option>
        </select>
      </div>

      {/* 필터 라인 (UI만) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-4">
        <select className="pill"><option>카테고리 선택</option></select>
        <select className="pill"><option>교육기관명</option></select>
        <select className="pill"><option>난이도 선택</option></select>
        <select className="pill"><option>기간 선택</option></select>
        <div className="flex gap-2">
          <input className="pill flex-1" placeholder="찾고 싶은 강좌를 검색해보세요" />
          <button className="btn btn-primary">세부 검색 실행</button>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {COURSES.map(c => (
          <CourseCard key={c.slug} {...c} weeks={14} students="12.4만" rating={4.6}/>
        ))}
      </div>
    </div>
  );
}
