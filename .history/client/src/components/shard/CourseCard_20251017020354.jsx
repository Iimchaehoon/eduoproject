import { useNavigate } from "react-router-dom";

/** 이미지 파일명 매핑 (public/img 기준) */
const IMG = {
  "인류학의 이해": "/img/seed.png",
  "파이썬으로 데이터 과학": "/img/data.png",
  "리액트 고급 개발": "/img/react.png",
  "데이터 시각화 마스터클래스": "/img/python_data.png",
  "블록체인 기초부터 실무": "/img/block.png",
  "신경망 및 딥러닝": "/img/deep.png",
};

export default function CourseCard({ slug, title, teacher, tag, rating=4.6, people="1.2만+", weeks="14주" }) {
  const nav = useNavigate();
  const go = () => nav(`/course/${slug}`);
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_12px_28px_rgba(16,24,40,0.08)]">
      {/* 카드 전체는 클릭 X → 오직 버튼으로만 이동 */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={IMG[title] || "/img/edu_pro1.png"} className="w-full h-full object-cover" alt={title}/>
      </div>
      <div className="p-4">
        <div className="text-slate-400 text-xs">{teacher}</div>
        <h4 className="mt-1 text-[18px] font-bold text-[#0F1B2D]">{title}</h4>
        <div className="mt-2 flex items-center gap-2 text-[12px] text-slate-500">
          <span>★ {rating.toFixed(1)}</span>
          <span>· {people}명</span>
          <span>· {weeks}</span>
        </div>
        <div className="mt-3 flex gap-8">
          <button className="px-3 h-9 rounded-lg bg-slate-100 text-[#374151] text-xs">강좌 보기</button>
          <button
            className="px-3 h-9 rounded-lg bg-[#2C6BFF] text-white text-xs"
            onClick={(e)=>{ e.stopPropagation(); go(); }}
          >수강신청</button>
        </div>
      </div>
    </div>
  );
}
