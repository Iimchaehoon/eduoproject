export default function Mypage(){
  return (
    <div className="container-6xl py-6 grid lg:grid-cols-[2fr,1fr] gap-6">
      <div className="space-y-6">
        <div className="card p-4">
          <h3 className="font-semibold mb-2">이번 주 목표 / 진행률 카드</h3>
          <div className="h-32 rounded-xl bg-gray-50"></div>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold mb-2">AI 조언</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-indigo-50 p-4">데이터 구조에 집중</div>
            <div className="rounded-xl bg-indigo-50 p-4">최적의 학습 시간</div>
            <div className="rounded-xl bg-indigo-50 p-4">커뮤니티 참여</div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="card p-4">
          <h3 className="font-semibold mb-2">빠른 통계 / 다가오는 마감일</h3>
          <div className="h-48 rounded-xl bg-gray-50"></div>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold mb-2">나의 강의 메모</h3>
          <div className="space-y-2">
            <div className="rounded-xl bg-gray-50 p-3">철학의 이해</div>
            <div className="rounded-xl bg-gray-50 p-3">AI 리터러시</div>
            <div className="rounded-xl bg-gray-50 p-3">시각디자인 리서치</div>
          </div>
        </div>
      </div>
    </div>
  )
}
