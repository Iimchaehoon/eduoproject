import { useState } from "react";
import AICoach from "./AICoach.jsx";          // ✅ 같은 폴더
import DiscussBoard from "./DiscussBoard.jsx";

export default function SideChatTabs({ contextText = "" }) {
  const [tab, setTab] = useState("ai");
  return (
    <aside className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
      <div className="px-4 py-3 flex gap-2 border-b border-slate-200">
        <button
          className={`px-3 py-1.5 rounded-lg text-sm ${
            tab === "ai" ? "bg-indigo-50 text-indigo-700" : "hover:bg-slate-100"
          }`}
          onClick={() => setTab("ai")}
        >
          AI 코치
        </button>
        <button
          className={`px-3 py-1.5 rounded-lg text-sm ${
            tab === "board" ? "bg-indigo-50 text-indigo-700" : "hover:bg-slate-100"
          }`}
          onClick={() => setTab("board")}
        >
          토론 게시판
        </button>
      </div>
      <div className="h-[540px]">
        {tab === "ai" ? <AICoach contextText={contextText} /> : <DiscussBoard />}
      </div>
    </aside>
  );
}
