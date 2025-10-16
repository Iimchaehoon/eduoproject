export default function DiscussBoard() {
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-slate-200">
        <div className="text-sm text-slate-700 font-medium">토론 게시판</div>
        <div className="text-xs text-slate-500 mt-1">수강생들과 함께 토론해보세요.</div>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {/* 데모 쓰레드 */}
        <div className="rounded-xl border p-3">
          <div className="text-[13px] font-medium">박O수 · 5분 전</div>
          <div className="text-[13px] text-slate-700 mt-1">
            클래스 내부에서 다른 클래스 호출할 때 설계는 어떻게 잡으면 좋을까요?
          </div>
          <div className="text-[12px] text-slate-500 mt-2">👍 28 · 💬 7 · 저장</div>
        </div>
      </div>

      <div className="border-t border-slate-200 p-3 flex items-center gap-2">
        <input
          className="flex-1 h-10 rounded-xl border border-slate-200 px-3 text-[13px] outline-none"
          placeholder="토론에 참여해보세요…"
        />
        <button className="w-10 h-10 rounded-xl bg-[#2C6BFF] text-white grid place-items-center">➤</button>
      </div>
    </div>
  );
}
