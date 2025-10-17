import { useState } from "react";

export default function DiscussBoard() {
  const [items, setItems] = useState([
    { who: "박민수", text: "클래스 내에서 다른 클래스 호출할 때 설계 어떻게 잡아야할까요? 데이터 분석 예제를 예로 들면요." },
    { who: "이수진", text: "저는 캡슐화를 강조한 뒤 책임 분리 원칙을 생각해요. 클래스는 하나의 역할만!" },
  ]);
  const [text, setText] = useState("");

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setItems([...items, { who: "나", text: t }]);
    setText("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 space-y-3 overflow-y-auto flex-1">
        {items.map((m, i) => (
          <div key={i} className="rounded-xl border border-skin-ring bg-white p-3">
            <div className="text-[13px] font-medium text-ink-900">{m.who}</div>
            <div className="text-[14px] mt-1 text-ink-700">{m.text}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-skin-ring p-3 flex gap-2">
        <input className="input flex-1" placeholder="토론에 참여해보세요…" value={text} onChange={(e)=>setText(e.target.value)}
               onKeyDown={(e)=>e.key==="Enter" && add()} />
        <button className="btn-primary" onClick={add}>등록</button>
      </div>
    </div>
  );
}
