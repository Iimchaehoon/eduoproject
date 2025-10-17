// client/src/components/SideChatTabs.jsx
import { useState } from "react";
import AICoach from "./AICoach.jsx";
import DiscussBoard from "./DiscussBoard.jsx";

/** 오른쪽 패널: [AI 코치 | 토론 게시판] 탭 전환 */
export default function SideChatTabs({ contextText = "" }) {
  const [tab, setTab] = useState("ai"); // 'ai' | 'forum'

  return (
    <div className="w-full">
      {/* 탭 헤더 (피그마처럼 상단 띠) */}
      <div className="mb-3 flex items-center gap-1 bg-white rounded-xl border border-[#EEF2F7] px-1 py-1 shadow-[0_6px_18px_rgba(16,24,40,.06)]">
        <button
          onClick={()=>setTab("ai")}
          className={`flex-1 h-9 rounded-lg text-[13px] font-semibold ${tab==='ai' ? 'bg-[#EEF2FF] text-[#5560FF]' : 'text-[#6B7280] hover:bg-[#F5F7FA]'}`}
        >
          AI 코치
        </button>
        <button
          onClick={()=>setTab("forum")}
          className={`flex-1 h-9 rounded-lg text-[13px] font-semibold ${tab==='forum' ? 'bg-[#EEF2FF] text-[#5560FF]' : 'text-[#6B7280] hover:bg-[#F5F7FA]'}`}
        >
          토론 게시판
        </button>
      </div>

      <div className="h-[640px]">
        {tab === "ai" ? <AICoach contextText={contextText} /> : <DiscussBoard />}
      </div>
    </div>
  );
}
