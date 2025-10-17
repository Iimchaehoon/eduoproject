import { useState } from "react";
import AICoach from "./ai/AICoach.jsx";               // ← 이 경로가 존재해야 함
import DiscussBoard from "./discuss/DiscussBoard.jsx";

export default function SideChatTabs({ contextText = "" }) {
  const [tab, setTab] = useState("ai");
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b">
        <button
          className={`px-3 py-1.5 rounded-lg text-sm ${tab==='ai'?'bg-[#EEF1FF] text-[#5B66FF]':'text-slate-600'}`}
          onClick={()=>setTab("ai")}
        >AI 코치</button>
        <button
          className={`px-3 py-1.5 rounded-lg text-sm ${tab==='feed'?'bg-[#EEF1FF] text-[#5B66FF]':'text-slate-600'}`}
          onClick={()=>setTab("feed")}
        >토론 게시판</button>
      </div>
      <div className="h-[540px]">{tab==='ai' ? <AICoach contextText={contextText}/> : <DiscussBoard/>}</div>
    </div>
  );
}
