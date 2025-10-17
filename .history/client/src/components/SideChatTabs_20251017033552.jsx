import { useState } from "react";
import AICoach from "./ai/AICoach.jsx";
import DiscussBoard from "./discuss/DiscussBoard.jsx";

export default function SideChatTabs({ contextText = "" }) {
  const [tab, setTab] = useState("ai");
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-2 flex gap-2">
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

      <div className="h-[560px]">
        {tab === "ai" ? (
          <AICoach contextText={contextText} />
        ) : (
          <DiscussBoard />
        )}
      </div>
    </div>
  );
}
