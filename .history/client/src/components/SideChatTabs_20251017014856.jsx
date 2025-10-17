// src/components/SideChatTabs.jsx
import { useEffect, useRef, useState } from "react";

/* ----------------------- 내부 컴포넌트: AI 코치 ----------------------- */
function AICoach({ contextText = "" }) {
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

  // 실제 API가 있으면 교체해서 사용하세요.
  async function mockAiChat(q) {
    // contextText 를 활용하는 척만 :)
    return { text: `“${q}” 질문 좋네요! (컨텍스트 길이: ${contextText.length})` };
  }

  async function send(textArg) {
    const text = (textArg ?? input).trim();
    if (!text) return;
    setInput("");
    setLog((p) => [...p, { who: "me", text }]);
    setLoading(true);
    try {
      const { text: ans } = await mockAiChat(text);
      setLog((p) => [...p, { who: "bot", text: ans || "(응답 없음)" }]);
    } catch {
      setLog((p) => [...p, { who: "bot", text: "잠시 후 다시 시도해주세요." }]);
    } finally {
      setLoading(false);
    }
  }

  async function onQuiz() {
    setLoading(true);
    try {
      const items = [
        { text: "클래스는 무엇을 위한 설계도인가?", choices: ["객체", "함수", "모듈", "패키지"], answerIndex: 0 },
        { text: "__init__ 의 역할은?", choices: ["상속", "초기화", "정적 메서드", "오버로딩"], answerIndex: 1 },
      ];
      const lines = items.map((q, i) =>
        `${i + 1}. ${q.text}\n${q.choices
          .map((c, ci) => `  (${String.fromCharCode(65 + ci)}) ${c}`)
          .join("\n")}\n정답: ${String.fromCharCode(65 + (q.answerIndex ?? 0))}`
      );
      setLog((p) => [...p, { who: "bot", text: `퀴즈\n${lines.join("\n\n")}` }]);
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

      {/* 빠른 액션 4개 */}
      <div className="grid grid-cols-2 gap-2 px-3 pb-2">
        <button className="h-10 rounded-xl bg-[#EFF4FF] text-[#1E3EFF] text-[13px] font-medium"
          onClick={() => send("예제를 더 보여줘")}
        >📍 더 많은 예시</button>
        <button className="h-10 rounded-xl bg-[#E6F7EA] text-[#0B8C3C] text-[13px] font-medium"
          onClick={onQuiz}
        >❓ 퀴즈 풀기</button>
        <button className="h-10 rounded-xl bg-[#F4ECFF] text-[#6B3EF7] text-[13px] font-medium"
          onClick={() => send("조금 더 심화해서 설명해줘")}
        >📈 심화 설명</button>
        <button className="h-10 rounded-xl bg-[#FFF3E7] text-[#D45505] text-[13px] font-medium"
          onClick={() => send("코딩 실습 문제를 내줘")}
        >💻 코딩 실습</button>
      </div>

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

/* --------------------- 내부 컴포넌트: 토론 게시판 --------------------- */
function DiscussBoard() {
  const [list] = useState([
    { name: "박민수", text: "클래스 간 의존성 설계할 때 팁 있으신가요?", like: 28, comment: 7, time: "5분 전" },
    { name: "이수진", text: "SRP 기준으로 모듈 분리하면 유지보수성이 좋아지더라고요.", like: 15, comment: 3, time: "12분 전" },
  ]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-skin-ring">
        <div className="font-semibold">토론 게시판</div>
        <div className="text-xs text-slate-500 mt-1">수강생끼리 자유롭게 토론해보세요.</div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {list.map((it, i) => (
          <div key={i} className="rounded-lg border p-3">
            <div className="text-sm font-medium">
              {it.name} · <span className="text-slate-500">{it.time}</span>
            </div>
            <div className="mt-1 text-[13px]">{it.text}</div>
            <div className="mt-2 text-xs text-slate-500">❤️ {it.like} · 💬 {it.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------- 탭 래퍼(기존) -------------------------- */
export default function SideChatTabs({ contextText = "" }) {
  const [tab, setTab] = useState("ai");

  return (
    <div className="card p-0 overflow-hidden">
      <div className="border-b border-skin-ring px-5 py-3 flex gap-3">
        <button
          className={`pill ${tab === "ai" ? "bg-indigo-50 border-indigo-100 text-indigo-700" : ""}`}
          onClick={() => setTab("ai")}
        >
          AI 코치
        </button>
        <button
          className={`pill ${tab === "feed" ? "bg-indigo-50 border-indigo-100 text-indigo-700" : ""}`}
          onClick={() => setTab("feed")}
        >
          토론 게시판
        </button>
      </div>

      <div className="h-[540px]">
        {tab === "ai" ? <AICoach contextText={contextText} /> : <DiscussBoard />}
      </div>
    </div>
  );
}
