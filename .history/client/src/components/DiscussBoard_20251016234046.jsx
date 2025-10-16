import { useState } from "react";

const MOCK = [
  {
    id: 1,
    user: "박민수",
    time: "5분 전",
    badge: "질문",
    text:
      "클래스 내부에서 다른 클래스와 호출할 때 설계를 어떻게 잡으면 좋을까요? " +
      "특히 데이터 타입 협업에 대한 팁이요.",
    code:
      "class Calculator:\n  def add(self, a, b):\n    return a + b\n  def subtract(self, a, b):\n    return a - b\n",
    like: 28,
    comment: 7,
  },
  {
    id: 2,
    user: "이수진",
    time: "12분 전",
    badge: "토론",
    text:
      "저는 객체지향 설계할 때 항상 단일 책임 원칙을 생각해요. " +
      "하나의 클래스는 하나의 역할만 담당하도록, 메서드 크기가 늘면 분리해요.",
    like: 58,
    comment: 12,
  },
];

export default function DiscussBoard() {
  const [items, setItems] = useState(MOCK);
  const [input, setInput] = useState("");

  const post = () => {
    if (!input.trim()) return;
    const it = {
      id: Date.now(),
      user: "익명",
      time: "방금",
      badge: "새글",
      text: input.trim(),
      like: 0,
      comment: 0,
    };
    setItems((p) => [it, ...p]);
    setInput("");
  };

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="px-4 py-3 border-b border-skin-ring">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-[#0F172A]">토론 게시판</div>
          <div className="text-[12px] text-slate-500">수강생들과 함께 토론해보세요</div>
        </div>
      </div>

      {/* 목록 */}
      <div className="px-4 py-3 space-y-3 overflow-y-auto flex-1">
        {items.map((p) => (
          <article key={p.id} className="rounded-xl border border-slate-200 p-3 bg-white">
            <div className="flex items-center gap-2 text-[12px] text-slate-600">
              <span className="font-medium">{p.user}</span>
              <span>· {p.time}</span>
              <span className="ml-1 px-2 h-5 rounded-full bg-slate-100 text-slate-700 grid place-items-center">
                {p.badge}
              </span>
            </div>
            <div className="mt-2 text-[14px] text-[#111827] whitespace-pre-wrap">{p.text}</div>
            {p.code && (
              <pre className="mt-2 bg-slate-900 text-slate-100 rounded-lg p-3 text-[12px] overflow-x-auto">{p.code}</pre>
            )}
            <div className="mt-2 flex items-center gap-4 text-[12px] text-slate-600">
              <span>👍 {p.like}</span>
              <span>💬 {p.comment}</span>
              <button className="ml-auto text-[#4F6BFF] hover:underline text-[12px]">답글쓰기</button>
            </div>
          </article>
        ))}
      </div>

      {/* 입력 */}
      <div className="border-t border-skin-ring p-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && post()}
          placeholder="토론글을 작성해보세요…"
          className="flex-1 h-10 rounded-xl border border-slate-200 px-3 text-[13px] outline-none"
        />
        <button onClick={post} className="w-10 h-10 rounded-xl bg-[#2C6BFF] text-white grid place-items-center">
          ➤
        </button>
      </div>
    </div>
  );
}
