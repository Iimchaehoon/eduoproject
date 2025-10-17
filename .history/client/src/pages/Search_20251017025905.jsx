import { Link } from "react-router-dom";

// 9개 카드 더미 데이터 (이미지 파일은 public/img 폴더 기준)
const COURSES = [
  { id: "c1", title: "인류학의 이해", inst: "전북대학교 · 김OO", weeks: 14, students: "12.4만", rating: 4.6, img: "/img/seed.png" },
  { id: "c2", title: "파이썬으로 데이터 과학", inst: "부산대학교 · 박OO", weeks: 14, students: "12.4만", rating: 4.6, img: "/img/data.png" },
  { id: "c3", title: "리액트 고급 개발", inst: "서울대학교 · 이OO", weeks: 14, students: "12.4만", rating: 4.6, img: "/img/react.png" },
  { id: "c4", title: "데이터 시각화 마스터클래스", inst: "연세대학교 · 박OO", weeks: 14, students: "12.4만", rating: 4.6, img: "/img/pyton_data.png" },
  { id: "c5", title: "블록체인 기초부터 실무", inst: "한양대학교 · 최OO", weeks: 14, students: "12.4만", rating: 4.6, img: "/img/block.png" },
  { id: "c6", title: "신경망 및 딥러닝", inst: "고려대학교 · 김OO", weeks: 14, students: "12.4만", rating: 4.6, img: "/img/deep.png" },
  { id: "c7", title: "클라우드 보안 엔지니어 심화", inst: "한독대학교 · 강OO", weeks: 14, students: "12.4만", rating: 4.6, img: "/img/cloud.png" },
  { id: "c8", title: "생체데이터와 인공지능의 이해", inst: "풍소대학교 · 문OO", weeks: 14, students: "12.4만", rating: 4.6, img: "/img/human.png" },
  { id: "c9", title: "Python & Pandas 분석 기초", inst: "한서대학교 · 정OO", weeks: 14, students: "12.4만", rating: 4.6, img: "/img/pandas.png" },
];

export default function Search() {
  return (
    <div>
      {/* 필터 바 */}
      <div className="card p-4 mb-5">
        <div className="grid md:grid-cols-4 gap-3">
          <select className="pill"><option>카테고리 선택</option></select>
          <select className="pill"><option>교육기관명</option></select>
          <select className="pill"><option>난이도 선택</option></select>
          <button className="btn-primary">세부 검색 실행</button>
        </div>
        <input className="input w-full mt-3" placeholder="찾고 싶은 강좌를 검색해보세요" />
      </div>

      {/* 카드 목록 (9개) */}
      <div className="grid gap-6 md:grid-cols-3">
        {COURSES.map((c) => (
          <div key={c.id} className="card overflow-hidden course-card">
            <Link to={`/course/mock-${c.id}`}>
              <img src={c.img} alt={c.title} className="w-full h-48 object-cover" draggable={false} />
            </Link>
            <div className="p-4">
              <div className="text-sm text-slate-500">{c.inst}</div>
              <div className="font-semibold mt-1">{c.title}</div>
              <div className="mt-3 flex items-center gap-3 text-[13px] text-slate-500">
                <span>📘 {c.weeks}주</span>
                <span>👥 {c.students} 학습</span>
                <span>⭐ {c.rating}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <Link to={`/course/mock-${c.id}`} className="btn-ghost">강좌 보기</Link>
                <button className="btn-primary">수강신청</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
