import { useState } from "react";
import AICoach from "./AICoach.jsx";
import DiscussBoard from "./DiscussBoard.jsx";

export default function SideChatTabs({ contextText = "" }) {
  const [tab, setTab] = useState("ai");
  return (
    <div className="card p-0 overflow-hidden h-[640px]">
      <div className="px-4 pt-3">
        <div className="rounded-full bg-[#EEF2FF] p-1 inline-flex">
          <button
            className={`px-3 h-8 rounded-full text-[12px] ${tab==="ai"?"bg-white shadow":"text-slate-600"}`}
            onClick={() => setTab("ai")}
          >AI 코치</button>
          <button
            className={`px-3 h-8 rounded-full text-[12px] ${tab==="board"?"bg-white shadow":"text-slate-600"}`}
            onClick={() => setTab("board")}
          >토론 게시판</button>
        </div>
      </div>
      <div className="mt-2 h-[calc(100%-3rem)]">
        {tab === "ai" ? <AICoach contextText={contextText} /> : <DiscussBoard />}
      </div>
    </div>
  );
}
