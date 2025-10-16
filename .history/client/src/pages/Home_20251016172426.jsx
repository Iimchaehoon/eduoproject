// Home.jsx (인기 강좌 섹션 예시)
import CourseCard from '../shared/CourseCard.jsx';

const popular = [
  {
    slug: 'ml-deep',
    image: '/img/muchine.png',
    title: '머신러닝 심화 과정',
    teacher: '김세라 · KAIST',
    tag: 'AI · 머신러닝',
    match: '95% 매칭',
    desc: '데이터 사이언스 수강 이후라면 높은 적합도를 보입니다',
    rating: 4.9,
    people: '12.4k명',
  },
  {
    slug: 'react-adv',
    image: '/img/react.png',
    title: 'React 고급 개발 과정',
    teacher: '이명환 · 서울대학교',
    tag: '웹 · 프론트',
    match: '88% 매칭',
    desc: '웹 개발 기초 완료 후 다음 단계로 추천됩니다',
    rating: 4.8,
    people: '8.9k명',
  },
  {
    slug: 'data-viz',
    image: '/img/data.png',
    title: '데이터 시각화 마스터클래스',
    teacher: '박시경 · 연세대학교',
    tag: '데이터분석',
    match: '82% 매칭',
    desc: '데이터 분석 스킬을 보완한 시각화 전문 과정입니다',
    rating: 4.7,
    people: '6.5k명',
  },
  {
    slug: 'blockchain-basic',
    image: '/img/block.png',
    title: '블록체인 기초부터 실무',
    teacher: '최필운희 · 한양대학교',
    tag: '블록체인',
    match: '81% 매칭',
    desc: '최신 기술 트렌드에 관심이 많다면 추천',
    rating: 4.6,
    people: '5.2k명',
  },
];

export default function Home() {
  return (
    <section className="grid grid-cols-4 gap-6">
      {popular.map((c) => (
        <CourseCard key={c.slug} {...c} />
      ))}
    </section>
  );
}
