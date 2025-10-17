import { useMemo } from "react";
import CourseCard from "../components/shard/CourseCard.jsx"; // ← 경로 수정 포인트!!

export default function Search() {
  // /public/img 안의 파일명(확장자 제외)을 정확히 사용하세요.
  // 스크린샷 기준 실제 파일명들:
  // seed, data, react, python, pandas, edu_pro1, edu_pro2, battery, block ...
  const items = useMemo(
    () => [
      {
        id: "c1",
        title: "인류학의 이해",
        inst: "전북대학교 · 김○○",
        weeks: 14,
        students: "12.4만",
        rating: 4.6,
        badge: "인문",
        cover: "seed",
      },
      {
        id: "c2",
        title: "파이썬으로 데이터 과학",
        inst: "부산대학교 · 박○○",
        weeks: 14,
        students: "12.4만",
        rating: 4.6,
        badge: "데이터",
        cover: "data",
      },
      {
        id: "c3",
        title: "리액트 고급 개발",
        inst: "서울대학교 · 이○○",
        weeks: 14,
        students: "12.4만",
        rating: 4.6,
        badge: "프론트엔드",
        cover: "react",
      },
      {
        id: "c4",
        title: "데이터 시작과 마스터클래스",
        inst: "연세대학교 · 박○○",
        weeks: 14,
        students: "12.4만",
        rating: 4.6,
        badge: "데이터",
        cover: "pandas",
      },
      {
        id: "c5",
        title: "블록체인 기초부터 실무",
        inst: "한양대학교 · 최○○",
        weeks: 14,
        students: "12.4만",
        rating: 4.6,
        badge: "데이터",
        cover: "block",
      },
      {
        id: "c6",
        title: "신경망 및 딥러닝",
        inst: "고려대학교 · 김○○",
        weeks: 14,
        students: "12.4만",
        rating: 4.6,
        badge: "데이터",
        cover: "deep",
      },
      {
        id: "c7",
        title: "파이썬 활용 데이터 분석 기초",
        inst: "카이스트 · 이○○",
        weeks: 14,
        students: "12.4만",
        rating: 4.6,
        badge: "데이터",
        cover: "python",
      },
      {
        id: "c8",
        title: "현대 인공지능의 이해",
        inst: "POSTECH · 정○○",
        weeks: 14,
        students: "12.4만",
        rating: 4.6,
        badge: "데이터",
        cover: "edu_pro1",
      },
      {
        id: "c9",
        title: "전기자동차 배터리 시스템",
        inst: "부경대학교 · 장○○",
        weeks: 14,
        students: "12.4만",
        rating: 4.6,
        badge: "공학",
        cover: "battery",
      },
    ],
    []
  );

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      {/* 필터 바(레이블+검색 입력 유지) */}
      <div className="flex flex-wrap gap-3 items-center mb-5">
        <select className="input">{/* 카테고리 */}<option>카테고리 선택</option></select>
        <select className="input">{/* 교육기관 */}<option>교육기관명</option></select>
        <select className="input">{/* 난이도 */}<option>난이도 선택</option></select>
        <select className="input">{/* 기간 */}<option>기간 선택</option></select>
        <select className="input">{/* 언어 */}<option>언어 선택</option></select>
        <input className="input flex-1" placeholder="찾고 싶은 강좌를 검색해보세요"/>
        <button className="btn btn-primary">세부 검색 실행</button>
      </div>

      {/* 카드 9개 그리드 */}
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((c) => (
          <CourseCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}
