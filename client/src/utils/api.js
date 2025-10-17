// src/utils/api.js
export const courses = [
  {
    id: "c-ml-advanced",
    slug: "ml-advanced",
    title: "머신러닝 심화 과정",
    instructor: "김세라",
    org: "KAIST",
    image: "edu_pro2",           // /public/img/edu_pro2.png
    weeks: 14,
    learners: "12.4만",
    rating: 4.9,
    tags: ["AI", "머신러닝", "데이터"],
    keywords: "머신러닝 인공지능 ai 분석 심화"
  },
  {
    id: "c-react-advanced",
    slug: "react-advanced",
    title: "React 고급 개발 과정",
    instructor: "이명환",
    org: "서울대학교",
    image: "react",              // /public/img/react.png
    weeks: 14,
    learners: "12.4만",
    rating: 4.8,
    tags: ["웹", "프론트엔드"],
    keywords: "리액트 react 프론트엔드 자바스크립트"
  },
  {
    id: "c-data-vision",
    slug: "data-vision",
    title: "데이터 시각화 마스터클래스",
    instructor: "박시경",
    org: "연세대학교",
    image: "data",               // /public/img/data.png
    weeks: 14,
    learners: "12.4만",
    rating: 4.7,
    tags: ["데이터", "시각화"],
    keywords: "데이터 시각화 차트 분석"
  },
  {
    id: "c-block-basic",
    slug: "block-basic",
    title: "블록체인 기초부터 실무",
    instructor: "최필용희",
    org: "한양대학교",
    image: "block",              // /public/img/block.png
    weeks: 14,
    learners: "6.2천",
    rating: 4.6,
    tags: ["블록체인", "개발"],
    keywords: "블록체인 crypto 비트코인 smart contract"
  },
  {
    id: "c-anthropology",
    slug: "anthropology",
    title: "인류학의 이해",
    instructor: "김ㅇㅇ",
    org: "전북대학교",
    image: "seed",               // /public/img/seed.png (썸네일 대체)
    weeks: 14,
    learners: "1.2만",
    rating: 4.6,
    tags: ["인문"],
    keywords: "인류학 문화 사회 인문학 anthropology"
  },
  {
    id: "c-python-data",
    slug: "python-data",
    title: "파이썬으로 데이터 과학",
    instructor: "박ㅇㅇ",
    org: "부산대학교",
    image: "python_data",        // /public/img/python_data.png
    weeks: 14,
    learners: "1.2만",
    rating: 4.6,
    tags: ["데이터", "파이썬"],
    keywords: "파이썬 데이터 pandas numpy 분석 과학"
  },
  {
    id: "c-react-high",
    slug: "react-high",
    title: "리액트 고급 개발",
    instructor: "이ㅇㅇ",
    org: "서울대학교",
    image: "edu_pro1",           // /public/img/edu_pro1.png
    weeks: 14,
    learners: "12.4만",
    rating: 4.6,
    tags: ["웹", "프론트엔드"],
    keywords: "react 리액트 프론트엔드 웹"
  },
];

export function getCourses() {
  return courses;
}

export function searchCourses(keyword = "") {
  const q = keyword.trim().toLowerCase();
  if (!q) return courses;
  return courses.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.keywords.toLowerCase().includes(q) ||
      c.tags.join(" ").toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q) ||
      c.org.toLowerCase().includes(q)
  );
}

export function getCourseBySlug(slug) {
  return courses.find((c) => c.slug === slug);
}
