import { useState } from "react";
import AICoach from "./AICoach.jsx";
import DiscussBoard from "./DiscussBoard.jsx";

export default function SideChatTabs({ contextText = "" }) {
  const [tab, setTab] = useState("coach"); // coach | board

  return (
    <div className="card p-0 overflow-hidden">
      {/* 상단 탭 */}
      <div className="border-b border-skin-ring px-3 py-2 flex gap-2">
        <button
          onClick={() => setTab("coach")}
          className={`px-3 h-9 rounded-lg text-sm ${tab === "coach"
              ? "bg-indigo-50 border border-indigo-200 text-indigo-700"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
        >
          AI 코치
        </button>
        <button
          onClick={() => setTab("board")}
          className={`px-3 h-9 rounded-lg text-sm ${tab === "board"
              ? "bg-indigo-50 border border-indigo-200 text-indigo-700"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
        >
          토론 게시판
        </button>
      </div>

      {/* 본문 */}
      <div className="h-[540px]">
        {tab === "coach" ? (
          <AICoach contextText={contextText} />
        ) : (
          <DiscussBoard />
        )}
      </div>
    </div>
  );
}
