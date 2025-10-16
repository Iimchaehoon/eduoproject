import { useEffect, useRef, useState } from "react";

export default function AICoach({ contextText = "" }) {
  const [log, setLog] = useState([
    { who: "bot", text: "안녕하세요, 지원님! 이번 강의와 관련된 질문이 있으면 무엇이든 물어보세요." },
    { who: "bot", text: "클래스와 객체의 차이가 뭔가요?" },
    { who: "bot", text: "활용한 문제풀이 전 실습 팁을 드릴까요?" },
  ]);
  const [input, setInput] = useState("");
  const scRef = useRef(null);

  useEffect(() => {
    scRef.current?.scrollTo({ top: scRef.current.scrollHeight, behavior: "smooth" });
  }, [log]);

  const send = (msg) => {
    const text = (msg ?? input).trim();
    if (!text) return;
    setInput("");
    setLog((p) => [...p, { who: "me", text }, { who: "bot", text: `“${text}”에 대한 답변(샘플).` }]);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b bg-white"><b className="text-slate-800">AI 학습코치</b></div>

      <div ref={scRef} className="px-4 py-3 space-y-2 overflow-y-auto flex-1">
        {log.map((m, i) => (
          <div key={i} className={m.who === "me" ? "text-right" : ""}>
            <div className={`inline-block max-w-[78%] px-3 py-2 rounded-2xl text-sm ${m.who === "me" ? "bg-[#4F6BFF] text-white" : "bg-[#F3F4F6] text-slate-900"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* 추천 버튼 4개 */}
      <div className="grid grid-cols-2 gap-2 px-3 pb-2">
        <button onClick={() => send("예제를 더 보여줘")} className="h-10 rounded-xl bg-[#EFF4FF] text-[#1E3EFF] text-sm">📍 더 많은 예시</button>
        <button onClick={() => send("퀴즈 풀고 싶어")} className="h-10 rounded-xl bg-[#E6F7EA] text-[#0B8C3C] text-sm">❓ 퀴즈 풀기</button>
        <button onClick={() => send("심화해서 설명해줘")} className="h-10 rounded-xl bg-[#F4ECFF] text-[#6B3EF7] text-sm">📈 심화 설명</button>
        <button onClick={() => send("코딩 실습 문제 내줘")} className="h-10 rounded-xl bg-[#FFF3E7] text-[#D45505] text-sm">💻 코딩 실습</button>
      </div>

      {/* 입력창 */}
      <div className="border-t p-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-1 h-10 rounded-xl border px-3 text-sm"
          placeholder="궁금한 점을 물어보세요..."
        />
        <button onClick={() => send()} className="w-10 h-10 rounded-xl bg-[#2C6BFF] text-white grid place-items-center">➤</button>
      </div>
    </div>
  );
}
