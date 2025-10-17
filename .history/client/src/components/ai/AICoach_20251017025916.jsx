import { useEffect, useRef, useState } from "react";

export default function AICoach({ contextText = "" }) {
  const [log, setLog] = useState([
    { who: "bot", text: "안녕하세요, 지원님! 강의와 관련된 질문이 있으면 무엇이든 물어보세요." },
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
    setLog((p) => [...p, { who: "me", text }]);
    // 여기에 실제 API 연동 가능
    setTimeout(() => setLog((p) => [...p, { who: "bot", text: "좋은 질문이에요! 계속 진행해 볼까요?" }]), 400);
  };

  return (
    <div className="h-full flex flex-col">
      <div ref={scRef} className="px-4 pt-3 pb-2 space-y-3 overflow-y-auto flex-1">
        {log.map((m, i) => (
          <div key={i} className={m.who === "me" ? "text-right" : ""}>
            <div className={`inline-block max-w-[78%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
              m.who === "me" ? "bg-[#4F6BFF] text-white" : "bg-[#F3F4F6] text-[#111827]"}`}>
              <pre className="whitespace-pre-wrap">{m.text}</pre>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 px-3 pb-2">
        <button className="h-10 rounded-xl bg-[#EFF4FF] text-[#1E3EFF] text-[13px] font-medium" onClick={() => send("예제를 더 보여줘")}>📍 더 많은 예시</button>
        <button className="h-10 rounded-xl bg-[#E6F7EA] text-[#0B8C3C] text-[13px] font-medium" onClick={() => send("퀴즈 풀기")}>❓ 퀴즈 풀기</button>
        <button className="h-10 rounded-xl bg-[#F4ECFF] text-[#6B3EF7] text-[13px] font-medium" onClick={() => send("조금 더 심화해서 설명해줘")}>📈 심화 설명</button>
        <button className="h-10 rounded-xl bg-[#FFF3E7] text-[#D45505] text-[13px] font-medium" onClick={() => send("코딩 실습 문제를 내줘")}>💻 코딩 실습</button>
      </div>

      <div className="border-t border-skin-ring p-3 flex items-center gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&send()}
               placeholder="궁금한 점을 물어보세요..." className="input flex-1" />
        <button onClick={()=>send()} className="w-10 h-10 rounded-xl bg-primary text-white grid place-items-center">➤</button>
      </div>
    </div>
  );
}
