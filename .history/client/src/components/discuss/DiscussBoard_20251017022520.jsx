import { useState } from "react";

export default function DiscussBoard() {
  const [posts, setPosts] = useState([
    { name: "박민수", text: "클래스 내에서 다른 클래스 호출할 때 설계 어떻게 잡아야할까요? 데이터 분석 예제를 예로 들면요." },
    { name: "이수진", text: "저는 캡슐화를 강조한 뒤 책임 분리 원칙을 생각해요. 클래스는 하나의 역할만!" },
  ]);
  const [text, setText] = useState("");

  const add = () => {
    const t = text.trim();
    if (!t) return;
    setPosts((p) => [...p, { name: "익명", text: t }]);
    setText("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b bg-white"><b>토론 게시판</b></div>

      <div className="p-4 space-y-3 overflow-y-auto flex-1">
        {posts.map((p, i) => (
          <div key={i} className="bg-white rounded-2xl border p-3">
            <div className="text-sm font-semibold text-slate-900">{p.name}</div>
            <div className="text-sm text-slate-700 mt-1 whitespace-pre-wrap">{p.text}</div>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="border-t p-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          className="flex-1 h-10 border rounded-xl px-3 text-sm"
          placeholder="의견을 남겨주세요…"
        />
        <button onClick={add} className="px-3 rounded-xl bg-slate-900 text-white text-sm">등록</button>
      </div>
    </div>
  );
}
