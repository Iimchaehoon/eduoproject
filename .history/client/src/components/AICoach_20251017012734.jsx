import { useEffect, useRef, useState } from "react";
import { aiChat, aiSummary, aiQuiz } from "../utils/api"; // ✅ 이 경로 정확히

export default function AICoach({ contextText = "" }) {
  const [log, setLog] = useState([
    { who: "bot", text: "안녕하세요, 지원님! 강의와 관련된 질문이 있으면 무엇이든 물어보세요." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scRef = useRef(null);

  useEffect(() => {
    scRef.current?.scrollTo({ top: scRef.current.scrollHeight, behavior: "smooth" });
  }, [log, loading]);

  async function send() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setLog((p) => [...p, { who: "me", text }]);
    setLoading(true);
    try {
      const { text: ans } = await aiChat(text, contextText);
      setLog((p) => [...p, { who: "bot", text: ans || "(응답 없음)" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full flex flex-col">
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

      <div className="border-t border-slate-200 p-3 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="궁금한 점을 물어보세요..."
          className="flex-1 h-10 rounded-xl border border-slate-200 px-3 text-[13px] outline-none"
        />
        <button
          onClick={send}
          className="w-10 h-10 rounded-xl bg-[#2C6BFF] text-white grid place-items-center"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
