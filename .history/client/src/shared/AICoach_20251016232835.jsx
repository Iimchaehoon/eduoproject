// src/components/CoachAndBoard.jsx
import { useMemo, useRef, useState } from "react";

/* 공통 아바타(이미지 없으면 이니셜) */
function Avatar({ name = "AI", img, size = 28 }) {
  const initials = useMemo(
    () => (name ? name.replace(/\s+/g, "").slice(0, 2).toUpperCase() : "AI"),
    [name]
  );
  return img ? (
    <img
      src={img}
      alt={name}
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  ) : (
    <div
      className="rounded-full bg-indigo-100 text-indigo-700 font-semibold grid place-items-center"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {initials}
    </div>
  );
}

/* ────────────────────── AI 코치 ────────────────────── */
function AICoachPanel({ contextText = "" }) {
  const [tab, setTab] = useState<"coach" | "board">("coach"); // wrapper 에서만 사용, 이 컴포넌트 단독 사용시 무시됨
  const [input, setInput] = useState("");
  const [log, setLog] = useState([
    { role: "ai", text: "안녕하세요, 지원님! 이번 강의와 관련된 질문이 있다면 무엇이든지 물어보세요.\n더 효율적인 공부가 되도록 AI 학습코치가 도와드릴게요!" },
    { role: "user", text: "클래스와 객체의 차이가 뭔가요?" },
    { role: "ai", text: "좋은 질문이에요! 클래스는 설계도, 객체는 설계도로 만든 실제 물건(인스턴스)라고 생각하시면 돼요." },
  ]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  const scrollToEnd = () => endRef.current?.scrollIntoView({ behavior: "smooth" });

  const push = (m) => {
    setLog((prev) => [...prev, m]);
    setTimeout(scrollToEnd, 10);
  };

  async function send() {
    const q = input.trim();
    if (!q) return;
    setInput("");
    push({ role: "user", text: q });
    setLoading(true);
    // 👉 실제 API가 있다면 여기에서 호출하세요.
    setTimeout(() => {
      push({
        role: "ai",
        text:
          `질문 감사합니다!\n\n• 키포인트 요약\n- ${q}\n- ${contextText ? "컨텍스트 반영 완료" : "기본 설명"}\n\n더 필요한 예시가 있으면 ‘더 많은 예시’를 눌러보세요.`,
      });
      setLoading(false);
    }, 550);
  }

  const actExamples = () =>
    push({
      role: "ai",
      text:
        "예시)\n1) 클래스: 붕어빵 틀 • 객체: 만들어진 붕어빵\n2) 클래스: 설계도 • 객체: 설계도로 지은 집",
    });

  const actQuiz = () =>
    push({
      role: "ai",
      text: "퀴즈를 시작할게요! (정답은 메시지 하단에 있어요)",
      quiz: [
        {
          q: "클래스와 객체의 관계로 맞는 것은?",
          a: ["클래스=객체", "클래스는 설계도, 객체는 실체", "객체가 클래스를 만든다", "둘 다 동일"],
          answer: 1,
          exp: "클래스는 설계도, 객체는 그로부터 생성된 실체(인스턴스)입니다.",
        },
      ],
    });

  const actDeep = () =>
    push({
      role: "ai",
      text:
        "심화 설명)\n• 파이썬의 클래스는 네임스페이스와 MRO, 디스크립터 등으로 동작합니다.\n• 데이터 모델과 매직 메서드(__init__, __repr__ 등)를 이해하면 객체지향을 더 잘 활용할 수 있어요.",
    });

  const actCode = () =>
    push({
      role: "ai",
      text:
        "코딩 실습)\n```python\nclass Student:\n  def __init__(self, name):\n    self.name = name\n\ns = Student('Han')\nprint(s.name)\n```",
    });

  return (
    <div className="h-full flex flex-col border rounded-2xl bg-white shadow-[0_10px_24px_rgba(16,24,40,0.08)]">
      {/* 탭 헤더 */}
      <div className="px-4 pt-4">
        <div className="inline-flex rounded-full bg-slate-100 p-1">
          <button
            className="px-3 h-8 rounded-full text-sm bg-white shadow inline-flex items-center gap-1"
            disabled
          >
            <img src="/img/aicol.png" className="w-4 h-4" />
            AI 코치
          </button>
          <button className="px-3 h-8 rounded-full text-sm text-slate-500" disabled>
            토론 게시판
          </button>
        </div>
      </div>

      {/* 대화 영역 */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {log.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} items-start gap-2`}>
              {m.role !== "user" && <Avatar name="AI" img="/img/robot.png" />}
              <div
                className={`max-w-[88%] rounded-xl px-3 py-2 text-[13px] leading-relaxed whitespace-pre-wrap shadow-sm ${
                  m.role === "user" ? "bg-[#4B68FF] text-white" : "bg-[#F2F5FF] text-[#0F172A]"
                }`}
              >
                {m.text}
                {m.quiz && (
                  <div className="mt-2 space-y-2">
                    {m.quiz.map((q, idx) => (
                      <div key={idx} className="rounded-lg border bg-white p-3 text-[13px]">
                        <div className="font-semibold">{idx + 1}. {q.q}</div>
                        <ul className="mt-2 space-y-1">
                          {q.a.map((c, ci) => (
                            <li key={ci}>({String.fromCharCode(65 + ci)}) {c}</li>
                          ))}
                        </ul>
                        <div className="mt-2 text-slate-600">
                          정답: {String.fromCharCode(65 + q.answer)} · {q.exp}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && <div className="text-[12px] text-slate-500">생각 중…</div>}
        <div ref={endRef} />
      </div>

      {/* 퀵 액션 */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={actExamples}
            className="h-10 rounded-xl bg-[#EAF1FF] text-[#1E40AF] text-[13px] flex items-center justify-center gap-2"
          >
            <span>📍</span> 더 많은 예시
          </button>
        <button
            onClick={actQuiz}
            className="h-10 rounded-xl bg-[#E7FFF1] text-[#0B7A3B] text-[13px] flex items-center justify-center gap-2"
          >
            <span>❓</span> 퀴즈 풀기
          </button>
          <button
            onClick={actDeep}
            className="h-10 rounded-xl bg-[#F5EDFF] text-[#6B21A8] text-[13px] flex items-center justify-center gap-2"
          >
            <span>📈</span> 심화 설명
          </button>
          <button
            onClick={actCode}
            className="h-10 rounded-xl bg-[#FFF3EA] text-[#B45309] text-[13px] flex items-center justify-center gap-2"
          >
            <span>{"</>"}</span> 코딩 실습
          </button>
        </div>
      </div>

      {/* 입력창 */}
      <div className="p-4 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="궁금한 점을 물어보세요..."
          className="flex-1 h-11 rounded-xl border border-slate-200 px-3 text-[14px] outline-none focus:ring-2 focus:ring-indigo-100"
        />
        <button
          onClick={send}
          className="w-11 h-11 rounded-xl grid place-items-center bg-[#1E40FF] hover:brightness-110 shadow text-white"
          title="전송"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 11L21 3L13 21L11 13L3 11Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ────────────────────── 토론 게시판 ────────────────────── */
function DiscussionPanel() {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: "박민수", img: "/img/white.png" },
      minutes: 5,
      badge: "질문",
      text:
        "클래스 내부에서 다른 클래스를 호출할 때 설계의 의존성이 높아질까요?\n더 유연한 데이터 설계를 찾고 있어요.",
      code:
        "class Calculator:\n  def add(self, a, b):\n    return a + b\n  def subtract(self, a, b):\n    return a - b",
      likes: 28,
      comments: 7,
    },
    {
      id: 2,
      user: { name: "이수진", img: "/img/black.png" },
      minutes: 12,
      badge: "토론",
      text:
        "저는 클래스와 객체 관계를 팀 단위 책임 설계로 생각해요. 하나의 클래스는 하나의 역할만 하도록, 응집도는 높게 결합도는 낮게!",
      likes: 58,
      comments: 12,
    },
  ]);

  function addPost() {
    const t = input.trim();
    if (!t) return;
    setPosts((p) => [
      {
        id: Date.now(),
        user: { name: "나", img: "" },
        minutes: 0,
        badge: "메모",
        text: t,
        likes: 0,
        comments: 0,
      },
      ...p,
    ]);
    setInput("");
  }

  return (
    <div className="h-full flex flex-col bg-white border rounded-2xl shadow-[0_10px_24px_rgba(16,24,40,0.08)]">
      {/* 상단 탭 */}
      <div className="px-4 pt-4">
        <div className="inline-flex rounded-full bg-slate-100 p-1">
          <button className="px-3 h-8 rounded-full text-sm text-slate-500" disabled>
            AI 코치
          </button>
          <button className="px-3 h-8 rounded-full text-sm bg-white shadow inline-flex items-center gap-1" disabled>
            <img src="/img/talk.png" className="w-4 h-4" />
            토론 게시판
          </button>
        </div>
      </div>

      {/* 안내 카드 */}
      <div className="px-4 mt-3">
        <div className="rounded-2xl border bg-[#F8FAFF] p-4 text-[13px] text-[#0F172A]">
          <div className="flex items-center gap-2 font-semibold">
            <span className="w-6 h-6 grid place-items-center rounded-full bg-[#EAF1FF] text-[#1E40AF]">💬</span>
            토론 게시판
          </div>
          <div className="mt-1 text-slate-500">수강생들과 함께 토론해보세요.</div>
        </div>
      </div>

      {/* 포스트 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {posts.map((p) => (
          <article key={p.id} className="rounded-2xl border p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <Avatar name={p.user.name} img={p.user.img} />
              <div className="text-[12px] text-slate-500">
                <div className="text-[13px] text-[#0F172A] font-semibold">{p.user.name}</div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-[2px] rounded-full bg-[#ECF2FF] text-[#4B68FF] text-[11px]">{p.badge}</span>
                  <span>{p.minutes}분 전</span>
                </div>
              </div>
            </div>

            <p className="mt-3 whitespace-pre-wrap text-[14px] leading-relaxed text-[#0F172A]">{p.text}</p>

            {p.code && (
              <pre className="mt-3 bg-[#111827] text-[#D1D5DB] text-[12px] p-3 rounded-xl overflow-x-auto">
{p.code}
              </pre>
            )}

            <div className="mt-3 flex items-center gap-4 text-[12px] text-slate-500">
              <span>👍 {p.likes}</span>
              <span>💬 {p.comments}</span>
              <button className="hover:underline">저장</button>
            </div>
          </article>
        ))}
      </div>

      {/* 입력창 */}
      <div className="p-4 flex items-center gap-2">
        <Avatar name="Me" />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addPost()}
          placeholder="토론할 내용을 남겨보세요…"
          className="flex-1 h-11 rounded-xl border border-slate-200 px-3 text-[14px] outline-none focus:ring-2 focus:ring-indigo-100"
        />
        <button
          onClick={addPost}
          className="w-11 h-11 rounded-xl grid place-items-center bg-[#1E40FF] hover:brightness-110 shadow text-white"
          title="등록"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 11L21 3L13 21L11 13L3 11Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ──────────────── 외부에서 쓰는 통합 레이아웃 ──────────────── */
/** 오른쪽 사이드 2열(왼쪽 AI 코치, 오른쪽 토론게시판) 레이아웃 – 피그마 동일 비율 */
export default function CoachAndBoard({ contextText = "" }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <AICoachPanel contextText={contextText} />
      <DiscussionPanel />
    </div>
  );
}
