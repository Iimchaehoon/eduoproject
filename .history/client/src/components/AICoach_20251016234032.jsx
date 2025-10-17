import { useEffect, useRef, useState } from "react";
import { aiChat, aiSummary, aiQuiz } from "../utils/api";

// 피그마 톤 맞춘 말풍선 + 추천버튼 + 입력영역
export default function AICoach({ contextText = "" }) {
  const [log, setLog] = useState([
    { who: "bot", text: "안녕하세요, 지원님! 강의와 관련된 질문이 있으면 무엇이든 물어보세요." },
    { who: "bot", text: "클래스와 객체의 차이가 뭔가요?" },
    { who: "bot", text: "활용한 문제풀이 전 실습 팁을 드릴까요?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scRef = useRef(null);

  useEffect(() => {
    scRef.current?.scrollTo({ top: scRef.current.scrollHeight, behavior: "smooth" });
  }, [log, loading]);

  async function send(msg) {
    const text = (msg ?? input).trim();
    if (!text) return;
    setInput("");
    setLog((p) => [...p, { who: "me", text }]);
    setLoading(true);
    try {
      const { text: ans } = await aiChat(text, contextText);
      setLog((p) => [...p, { who: "bot", text: ans || "(응답 없음)" }]);
    } catch {
      setLog((p) => [...p, { who: "bot", text: "죄송해요. 잠시 후 다시 시도해주세요." }]);
    } finally {
      setLoading(false);
    }
  }

  async function onSummary() {
    setLoading(true);
    try {
      const { text } = await aiSummary(contextText);
      setLog((p) => [...p, { who: "bot", text: `요약\n${text}` }]);
    } finally {
      setLoading(false);
    }
  }

  async function onQuiz() {
    setLoading(true);
    try {
      const { items = [] } = await aiQuiz(contextText, 5);
      const lines = items.map(
        (q, i) =>
          `${i + 1}. ${q.text}\n${q.choices.map((c, ci) => `  (${String.fromCharCode(65 + ci)}) ${c}`).join("\n")}\n정답: ${String.fromCharCode(65 + (q.answerIndex ?? 0))}\n`
      );
      setLog((p) => [...p, { who: "bot", text: `퀴즈\n${lines.join("\n")}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* 스크롤 영역 */}
      <div ref={scRef} className="px-4 pt-3 pb-2 space-y-3 overflow-y-auto flex-1">
        {log.map((m, i) => (
          <div key={i} className={m.who === "me" ? "text-right" : ""}>
            <div
              className={`inline-block max-w-[78%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                m.who === "me" ? "bg-[#4F6BFF] text-white" : "bg-[#F3F4F6] text-[#111827]"
              }`}
            >
              <pre className="whitespace-pre-wrap">{m.text}</pre>
            </div>
          </div>
        ))}
        {loading && <div className="text-[12px] text-slate-500">생각 중…</div>}
      </div>

      {/* 빠른 액션 (피그마 4버튼) */}
      <div className="grid grid-cols-2 gap-2 px-3 pb-2">
        <button
          className="h-10 rounded-xl bg-[#EFF4FF] text-[#1E3EFF] text-[13px] font-medium hover:brightness-105"
          onClick={() => send("예제를 더 보여줘")}
        >
          📍 더 많은 예시
        </button>
        <button
          className="h-10 rounded-xl bg-[#E6F7EA] text-[#0B8C3C] text-[13px] font-medium hover:brightness-105"
          onClick={onQuiz}
        >
          ❓ 퀴즈 풀기
        </button>
        <button
          className="h-10 rounded-xl bg-[#F4ECFF] text-[#6B3EF7] text-[13px] font-medium hover:brightness-105"
          onClick={() => send("조금 더 심화해서 설명해줘")}
        >
          📈 심화 설명
        </button>
        <button
          className="h-10 rounded-xl bg-[#FFF3E7] text-[#D45505] text-[13px] font-medium hover:brightness-105"
          onClick={() => send("코딩 실습 문제를 내줘")}
        >
          💻 코딩 실습
        </button>
      </div>

      {/* 입력 박스 + 전송 버튼 */}
      <div className="border-t border-skin-ring p-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="궁금한 점을 물어보세요..."
          className="flex-1 h-10 rounded-xl border border-slate-200 px-3 text-[13px] outline-none"
        />
        <button onClick={() => send()} className="w-10 h-10 rounded-xl bg-[#2C6BFF] text-white grid place-items-center">
          ➤
        </button>
      </div>
    </div>
  );
}
