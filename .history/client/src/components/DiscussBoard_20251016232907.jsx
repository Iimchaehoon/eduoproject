// client/src/components/DiscussBoard.jsx
import { useRef, useState, useEffect } from "react";

/** 피그마 스타일의 토론 게시판(오른쪽 패널) */
export default function DiscussBoard() {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState(seedThreads);
  const boxRef = useRef(null);

  useEffect(() => {
    if (!boxRef.current) return;
    boxRef.current.scrollTop = 0;
  }, [posts]);

  const addPost = () => {
    const t = text.trim();
    if (!t) return;
    setText("");
    setPosts((prev) => [
      {
        id: Date.now(),
        name: "나",
        avatar: "/img/white.png",
        time: "방금 전",
        tag: "질문",
        body: t,
        code: "",
        like: 0,
        comment: 0,
        save: 0,
      },
      ...prev,
    ]);
  };

  return (
    <div className="w-full h-full bg-white rounded-2xl shadow-[0_10px_30px_rgba(16,24,40,.06)] border border-[#EDF0F4] flex flex-col">
      {/* 상단 탭/제목 */}
      <div className="px-4 py-3 border-b border-[#EEF2F7] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/img/talk.png" onError={(e)=>e.currentTarget.style.display='none'} className="w-5 h-5" alt="" />
          <div className="text-[14px] font-semibold text-[#0F1B2D]">토론 게시판</div>
        </div>
        <div className="text-[12px] text-[#6B7280]">수강생들과 함께 토론해보세요</div>
      </div>

      {/* 목록 */}
      <div ref={boxRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {posts.map((p) => <Thread key={p.id} post={p} />)}
      </div>

      {/* 작성 박스 */}
      <div className="px-4 pb-3 border-t border-[#EEF2F7]">
        <div className="relative">
          <input
            value={text}
            onChange={(e)=>setText(e.target.value)}
            onKeyDown={(e)=>{ if (e.key==='Enter' && !e.shiftKey){ e.preventDefault(); addPost(); } }}
            placeholder="토론을 입력해보세요…"
            className="w-full h-12 rounded-xl border border-[#E6E9EF] bg-white px-4 pr-12 text-[14px] outline-none"
          />
          <button
            onClick={addPost}
            className="absolute right-1.5 top-1.5 w-9 h-9 rounded-xl flex items-center justify-center bg-[#2D5BFF] hover:brightness-110"
            title="전송"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 11L21 3L13 21L11 13L3 11Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Thread({ post }) {
  return (
    <div className="rounded-xl border border-[#EEF2F7] bg-white p-3 shadow-[0_4px_14px_rgba(16,24,40,.04)]">
      <div className="flex items-start gap-2">
        <img
          src={post.avatar}
          onError={(e)=>{e.currentTarget.src=''; e.currentTarget.outerHTML='<div class="w-9 h-9 rounded-full bg-[#ECF2FF] flex items-center justify-center">👤</div>'}}
          className="w-9 h-9 rounded-full object-cover"
          alt=""
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 text-[13px]">
            <span className="font-semibold text-[#0F1B2D]">{post.name}</span>
            <span className="text-[#9CA3AF]">{post.time}</span>
            {post.tag && <span className="ml-2 inline-flex items-center px-2 h-5 rounded-full bg-[#EEF2FF] text-[#5560FF] text-[11px]">{post.tag}</span>}
          </div>
          <div className="mt-1 text-[14px] text-[#111827] leading-[1.6] whitespace-pre-wrap">{post.body}</div>
          {post.code && (
            <pre className="mt-2 bg-[#0F172A] text-[#E2E8F0] text-[12px] rounded-lg p-3 overflow-x-auto">
              {post.code}
            </pre>
          )}
          <div className="mt-2 flex items-center gap-4 text-[12px] text-[#6B7280]">
            <span>👍 {post.like}</span>
            <span>💬 {post.comment}</span>
            <span>🔖 {post.save}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const seedThreads = [
  {
    id: 1,
    name: "박민수",
    avatar: "/img/black.png",
    time: "5분 전",
    tag: "문제",
    body:
      "클래스 내부에서 다른 클래스와 호출할 때 참조와 의존성이 있을까요? 특히 대용량 데이터일 때는 어떤게 더 유리한지요.",
    code: "",
    like: 28, comment: 7, save: 3,
  },
  {
    id: 2,
    name: "이수진",
    avatar: "/img/white.png",
    time: "12분 전",
    tag: "도움",
    body:
      "저는 클래스와 객체를 각각 한 단위 책임 원칙으로 생각해요. 하나의 클래스는 하나의 역할만 담당하도록, 메서드 코드는 짧게 분리하려고 다듬어요.",
    code:
`class Calculator:
  def add(self, a, b):
      return a + b
  def subtract(self, a, b):
      return a - b`,
    like: 53, comment: 12, save: 7,
  },
  {
    id: 3,
    name: "최정원",
    avatar: "/img/white.png",
    time: "35분 전",
    tag: "토론",
    body:
      "절차형 vs 객체지향 프로그래밍, 어떤 설계가 더 확장성/유지보수 측면에서 유리한지 의견 궁금해요.",
    code: "",
    like: 89, comment: 128, save: 21,
  },
];
