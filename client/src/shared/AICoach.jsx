import { useState } from "react";
import { aiChat, aiSummary, aiQuiz } from "../utils/api";

export default function AICoach({ contextText="" }) {
  const [input, setInput] = useState("");
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const q = input.trim();
    setInput("");
    setLog((prev)=>[...prev, { role:"user", text:q }]);
    setLoading(true);
    const { text } = await aiChat(q, contextText);
    setLoading(false);
    setLog((prev)=>[...prev, { role:"ai", text: text || "(응답 없음)" }]);
  }

  async function doSummary() {
    setLoading(true);
    const { text } = await aiSummary(contextText);
    setLoading(false);
    setLog((prev)=>[...prev, { role:"ai", text: `요약:\n${text}` }]);
  }

  async function doQuiz() {
    setLoading(true);
    const { items=[] } = await aiQuiz(contextText, 5);
    setLoading(false);
    setLog((prev)=>[...prev, { role:"ai", text: "퀴즈가 생성되었습니다.", quiz: items }]);
  }

  return (
    <aside className="card p-4 h-full flex flex-col">
      <h3 className="font-semibold text-ink-900">AI 학습코치</h3>
      <div className="mt-3 space-y-3 overflow-y-auto flex-1 pr-1">
        {log.map((m, i)=>(
          <div key={i} className={m.role==="user"?"text-right":""}>
            <div className={`inline-block rounded-lg px-3 py-2 text-sm ${m.role==="user"?"bg-brand-500 text-white":"bg-gray-100 text-ink-900"}`}>
              <pre className="whitespace-pre-wrap">{m.text}</pre>
            </div>
            {m.quiz && (
              <div className="mt-2 space-y-3">
                {m.quiz.map((q, idx)=>(
                  <div key={idx} className="p-3 rounded-lg border">
                    <div className="font-medium">{idx+1}. {q.text}</div>
                    <ul className="mt-2 space-y-1">
                      {q.choices.map((c, ci)=>(
                        <li key={ci} className="text-sm">({String.fromCharCode(65+ci)}) {c}</li>
                      ))}
                    </ul>
                    <div className="mt-2 text-sm text-ink-700">
                      정답: {String.fromCharCode(65 + (q.answerIndex ?? 0))} · {q.explanation}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {loading && <div className="text-sm text-ink-500">생각 중...</div>}
      </div>

      <textarea
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        placeholder="질문을 입력하세요"
        className="mt-3 w-full h-24 rounded-lg border border-gray-200 p-3 bg-white"
      />
      <button onClick={send} className="btn-primary w-full mt-2">질문하기</button>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button onClick={doSummary} className="btn-ghost">요약 생성</button>
        <button onClick={doQuiz} className="btn-ghost">퀴즈 생성</button>
      </div>
    </aside>
  );
}
