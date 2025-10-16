import { useMemo, useState } from "react";
import CourseCard from "../components/shard/CourseCard.jsx";

// /public/img/*.png 에 존재해야 하는 이미지 키들
const COURSE_LIST = [
  { slug:"mock-1-1", title:"인류학의 이해",                 uni:"전북대학교", teacher:"김OO", image:"seed" },
  { slug:"mock-1-2", title:"파이썬으로 데이터 과학",         uni:"부산대학교", teacher:"박OO", image:"data" },
  { slug:"mock-1-3", title:"리액트 고급 개발",               uni:"서울대학교", teacher:"이OO", image:"react" },
  { slug:"mock-1-4", title:"데이터 시각화 마스터클래스",     uni:"연세대학교", teacher:"박OO", image:"pyton_data" }, // 파일명 그대로!
  { slug:"mock-1-5", title:"블록체인 기초부터 실무",         uni:"한양대학교", teacher:"최OO", image:"block" },
  { slug:"mock-1-6", title:"신경망 및 딥러닝",               uni:"고려대학교", teacher:"김OO", image:"deep" },
  { slug:"mock-1-7", title:"클라우드 보안 엔지니어 심화",    uni:"컴퓨터대학", teacher:"최OO", image:"cloud" },
  { slug:"mock-1-8", title:"생체데이터와 인공지능의 이해",    uni:"컴퓨터대학", teacher:"최OO", image:"human" },
  { slug:"mock-1-9", title:"전기자동차 배터리 시스템",        uni:"컴퓨터대학", teacher:"최OO", image:"battery" },
];

export default function Search(){
  const [q,setQ] = useState("");
  const list = useMemo(()=>{
    const k=q.trim().toLowerCase();
    if(!k) return COURSE_LIST;
    return COURSE_LIST.filter(c => [c.title,c.teacher,c.uni].some(v=>v.toLowerCase().includes(k)));
  },[q]);

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-8">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-slate-500">총 <b>{list.length}</b>개의 강좌</div>
        <select className="h-9 px-3 rounded-lg border border-slate-200 text-sm">
          <option>최신순</option><option>인기순</option><option>평점순</option>
        </select>
      </div>

      {/* 필터/검색 */}
      <div className="grid grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <select className="h-10 px-3 rounded-lg border border-slate-200 text-sm"><option>카테고리 선택</option></select>
        <select className="h-10 px-3 rounded-lg border border-slate-200 text-sm"><option>교육기관명</option></select>
        <select className="h-10 px-3 rounded-lg border border-slate-200 text-sm"><option>난이도 선택</option></select>
        <div className="col-span-4 flex gap-2">
          <input className="flex-1 h-10 px-3 rounded-lg border border-slate-200 text-sm" placeholder="찾고 싶은 강좌를 검색해보세요" value={q} onChange={e=>setQ(e.target.value)} />
          <button className="h-10 px-4 rounded-lg bg-[#2C6BFF] text-white text-sm">세부 검색 실행</button>
        </div>
      </div>

      {/* 카드 9개 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {list.map(c => <CourseCard key={c.slug} course={c} />)}
      </div>
    </div>
  );
}
