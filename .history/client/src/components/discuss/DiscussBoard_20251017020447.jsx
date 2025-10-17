export default function DiscussBoard(){
  // 데모용 정적 피드
  const feed = [
    {user:"박민수", text:"클래스 내에서 다른 클래스 호출할 때 설계 어떻게 잡아야할까요? 데이터 분석 예제를 예로 들면요."},
    {user:"이수진", text:"저는 캡슐화를 강조한 뒤 책임 분리 원칙을 생각해요. 클래스는 하나의 역할만!"},
  ];
  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b text-sm text-slate-600">토론 게시판</div>
      <div className="p-4 space-y-3 overflow-y-auto flex-1">
        {feed.map((f,i)=>(
          <div key={i} className="rounded-xl bg-slate-50 border p-3">
            <div className="text-sm font-medium">{f.user}</div>
            <div className="text-[13px] mt-1 text-slate-700">{f.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
