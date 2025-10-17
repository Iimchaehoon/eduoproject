// src/components/discuss/DiscussBoard.jsx
import { useState } from "react";

export default function DiscussBoard() {
  const [items, setItems] = useState([
    { id: 1, name: "박민수", text: "클래스 내에서 다른 클래스 호출할 때 설계는 어떻게 잡아야 할까요? 데이터 분석 예제를 예로 들면요." },
    { id: 2, name: "이수진", text: "캡슐화·단일책임 원칙을 먼저 생각해요. 클래스는 하나의 역할만!" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setItems(prev => [{ id: Date.now(), name: "나", text: t }, ...prev]);
    setInput("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-3 p-4">
        {items.map(m => (
          <div key={m.id} className="rounded-xl bg-white border p-3">
            <div className="text-[12px] text-[#6B7280]">{m.name}</div>
            <div className="text-[14px] mt-1">{m.text}</div>
          </div>
        ))}
      </div>

      <div className="border-t p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="토론 내용을 입력하세요..."
          className="flex-1 h-11 rounded-lg border px-3 text-sm"
        />
        <button onClick={send} className="px-4 h-11 rounded-lg bg-[#2C6BFF] text-white text-sm">
          전송
        </button>
      </div>
    </div>
  );
}
