import { useState } from "react";
import AICoach from "./ai/AICoach.jsx";
import DiscussBoard from "./discuss/DiscussBoard.jsx";

export default function SideChatTabs({ contextText = "" }) {
  const [tab, setTab] = useState("ai");

  return (
    <div className="bg-white rounded-2xl border overflow-hidden h-full">
      <div className="flex gap-2 px-3 py-2 border-b bg-slate-50">
        <button onClick={() => setTab("ai")} className={`px-3 h-9 rounded-lg text-sm ${tab === "ai" ? "bg-white border" : "text-slate-600"}`}>AI 코치</button>
        <button onClick={() => setTab("feed")} className={`px-3 h-9 rounded-lg text-sm ${tab === "feed" ? "bg-white border" : "text-slate-600"}`}>토론 게시판</button>
      </div>
      <div className="h-[620px]">
        {tab === "ai" ? <AICoach contextText={contextText} /> : <DiscussBoard />}
      </div>
    </div>
  );
}
