import { useState } from "react";

export default function DiscussBoard() {
  const [posts, setPosts] = useState([
    { name: "박민수", text: "클래스 내에서 다른 클래스 호출할 때 설계 어떻게 잡아야할까요? 데이터 분석 예제를 예로 들면요." },
    { name: "이수진", text: "저는 캡슐화를 강조한 뒤 책임 분리 원칙을 생각해요. 클래스는 하나의 역할만!" },
  ]);
  const [input, setInput] = useState("");

  function add() {
    const t = input.trim();
    if (!t) return;
    setPosts((p) => [{ name: "익명", text: t }, ...p]);
    setInput("");
  }

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b">
        <div className="font-medium">토론 게시판</div>
        <div className="text-xs text-slate-500">수강생들의 질문과 토론메모</div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {posts.map((p, i) => (
          <div key={i} className="rounded-2xl border bg-white p-3 shadow-xs">
            <div className="text-sm font-medium">{p.name}</div>
            <div className="text-sm text-slate-700 mt-1 whitespace-pre-wrap">{p.text}</div>
          </div>
        ))}
      </div>

      <div className="border-t p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="토론할 내용을 입력해보세요…"
          className="input flex-1"
        />
        <button className="btn btn-primary" onClick={add}>등록</button>
      </div>
    </div>
  );
}
