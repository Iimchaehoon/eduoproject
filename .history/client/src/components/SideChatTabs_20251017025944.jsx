import { useState } from "react";
import AICoach from "./ai/AICoach.jsx";
import DiscussBoard from "./discuss/DiscussBoard.jsx";

export default function SideChatTabs({ contextText = "" }) {
  const [tab, setTab] = useState("ai");
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-skin-ring px-3 py-2 flex gap-2">
        <button className={`tab ${tab==="ai" ? "tab-active" : ""}`} onClick={()=>setTab("ai")}>AI 코치</button>
        <button className={`tab ${tab==="feed" ? "tab-active" : ""}`} onClick={()=>setTab("feed")}>토론 게시판</button>
      </div>
      <div className="h-[560px]">{tab==="ai" ? <AICoach contextText={contextText}/> : <DiscussBoard/>}</div>
    </div>
  );
}
