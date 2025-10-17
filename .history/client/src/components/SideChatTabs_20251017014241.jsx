import { useState } from "react";
import AICoach from "./ai/AICoach.jsx";
import DiscussBoard from "./discuss/DiscussBoard.jsx";

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
        {tab === "ai" ? (
          <AICoach contextText={contextText} />
        ) : (
          <DiscussBoard />
        )}
      </div>
    </div>
  );
}
