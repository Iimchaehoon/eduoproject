// src/components/SideChatTabs.jsx
import { useState } from "react";
import AICoach from "./AICoach.jsx";

function DiscussBoard() {
  const [text, setText] = useState("");
  const [list, setList] = useState([
    { user:"박민수", time:"5분 전", text:"클래스 내부에서 다른 클래스 호출할 때 의존성은 어떻게 줄이죠? 더 유연한 데이터 구조 예시도 필요해요." },
    { user:"이수진", time:"12분 전", text:"저는 클래스보단 함수형 접근이 편할 때가 많더라고요. 서로 장단점 정리해서 공유해봐요!" },
  ]);

  const addPost = () => {
    const v = text.trim();
    if(!v) return;
    setList([{user:"나", time:"방금", text:v}, ...list]);
    setText("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b bg-white">
        <div className="font-semibold">토론 게시판</div>
        <div className="text-xs text-slate-500 mt-1">수강생들의 짧은 토론/질문</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#fafbff]">
        {list.map((p, i)=>(
          <div key={i} className="rounded-xl p-3 bg-white shadow-sm border">
            <div className="text-[13px] text-slate-700">{p.text}</div>
            <div className="mt-2 text-[12px] text-slate-400">{p.user} · {p.time}</div>
          </div>
        ))}
      </div>

      <div className="border-t p-3 flex gap-2 bg-white">
        <input
          className="flex-1 h-10 rounded-xl border px-3 text-[13px] outline-none"
          placeholder="토론할 내용을 입력하세요…"
          value={text}
          onChange={(e)=>setText(e.target.value)}
          onKeyDown={(e)=> e.key==='Enter' && addPost()}
        />
        <button onClick={addPost} className="w-10 h-10 rounded-xl bg-[#2C6BFF] text-white grid place-items-center">➤</button>
      </div>
    </div>
  );
}

export default function SideChatTabs({ contextText="" }) {
  const [tab, setTab] = useState("ai");

  return (
    <div className="card overflow-hidden" style={{height: 560}}>
      <div className="px-3 py-2 border-b bg-white flex items-center gap-2">
        <button
          className={`px-3 h-9 rounded-lg text-sm ${tab==='ai'?'bg-[#eef2ff] text-[#4450ff]':'hover:bg-slate-100'}`}
          onClick={()=>setTab("ai")}
        >AI 코치</button>
        <button
          className={`px-3 h-9 rounded-lg text-sm ${tab==='discuss'?'bg-[#eef2ff] text-[#4450ff]':'hover:bg-slate-100'}`}
          onClick={()=>setTab("discuss")}
        >토론 게시판</button>
      </div>

      <div className="h-[calc(100%-44px)]">
        {tab === "ai"
          ? <AICoach contextText={contextText}/>
          : <DiscussBoard/>}
      </div>
    </div>
  );
}
