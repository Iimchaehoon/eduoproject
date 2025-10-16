// src/pages/Course.jsx (플레이어 영역만 발췌)
<div className="bg-[#0F172A] h-[380px] rounded-2xl flex items-center justify-center relative">
  <button
    onClick={() => alert("재생 (데모)")}
    aria-label="재생"
    className="w-16 h-16 rounded-full bg-white/10 border border-white/30 
               grid place-items-center text-white hover:bg-white/20 transition"
  >
    ▶
  </button>

  {/* 하단 컨트롤 막대 (데모) */}
  <div className="absolute bottom-4 left-0 right-0 px-5">
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div className="h-full w-1/3 bg-[#3B82F6]" />
    </div>
    <div className="mt-2 flex items-center justify-between text-white/80 text-sm">
      <div className="flex items-center gap-3">
        <button className="hover:text-white">⏮</button>
        <button className="hover:text-white">⏯</button>
        <button className="hover:text-white">⏭</button>
      </div>
      <span>5:23 / 15:47</span>
    </div>
  </div>
</div>
