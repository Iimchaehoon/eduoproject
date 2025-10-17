import { useState } from "react";

const seed = [
  { name: "박민수", text: "클래스 내부에서 다른 클래스 호출할 때 설계는 어떻게 잡으세요? 데이터 모델 예시도요.", like: 28, comment: 7, time: "5분 전" },
  { name: "이수진", text: "저는 책임 분리관점에서 단일 책임 원칙을 생각해요. 하나의 클래스는 하나의 역할!", like: 15, comment: 3, time: "12분 전" },
];

export default function DiscussBoard() {
  const [list, setList] = useState(seed);
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-skin-ring">
        <div className="font-semibold">토론 게시판</div>
        <div className="text-xs text-slate-500 mt-1">수강생끼리 자유롭게 토론해보세요.</div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {list.map((it, i) => (
          <div key={i} className="rounded-lg border p-3">
            <div className="text-sm font-medium">{it.name} · <span className="text-slate-500">{it.time}</span></div>
            <div className="mt-1 text-[13px]">{it.text}</div>
            <div className="mt-2 text-xs text-slate-500">❤️ {it.like} · 💬 {it.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
