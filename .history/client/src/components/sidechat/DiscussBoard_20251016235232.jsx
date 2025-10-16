export default function DiscussBoard() {
  // 목업 게시글
  const posts = [
    {
      user: "박OO",
      mins: 5,
      text: "클래스 내부에서 다른 클래스 호출할 때 설계는 어떻게 잡아요? 특히 대용량 데이터 다룰 때.",
      code: `class Calculator:\n  def add(self, a, b):\n    return a + b\n  def subtract(self, a, b):\n    return a - b`,
      like: 28, reply: 7,
    },
    {
      user: "최OO",
      mins: 35,
      text: "절차형 vs 객체지향 프로그램, 이번 과제 디자인은 어떻게? 각각의 장단점이 궁금.",
      like: 58, reply: 12,
    },
  ];
  return (
    <div className="h-full flex flex-col">
      <header className="px-4 py-3 border-b text-sm font-semibold flex items-center gap-2">
        <span className="text-[#4F6BFF]">💬</span> 토론 게시판
      </header>
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        {posts.map((p, i) => (
          <article key={i} className="bg-white rounded-xl shadow-sm border p-3">
            <div className="text-[12px] text-slate-500">{p.user} · {p.mins}분 전</div>
            <div className="mt-1 text-[14px] text-[#0F172A] leading-relaxed">{p.text}</div>
            {p.code && (
              <pre className="mt-3 bg-[#0F172A] text-[#E2E8F0] p-3 rounded-lg text-[12px] overflow-auto">
                {p.code}
              </pre>
            )}
            <div className="mt-2 text-[12px] text-slate-600">👍 {p.like} · 💬 {p.reply}</div>
          </article>
        ))}
      </div>
      <div className="border-t p-3 flex items-center gap-2">
        <input className="flex-1 h-10 rounded-xl border px-3 text-[13px]" placeholder="토론에 참여해보세요..." />
        <button className="w-10 h-10 rounded-xl bg-[#2C6BFF] text-white grid place-items-center">➤</button>
      </div>
    </div>
  );
}
