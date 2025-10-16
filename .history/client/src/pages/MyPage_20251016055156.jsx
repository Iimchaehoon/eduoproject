export default function MyPage(){
  return (
    <div className="max-w-6xl mx-auto px-5 py-8 grid md:grid-cols-[1fr_320px] gap-6">
      <section className="space-y-6">
        <div className="card p-5">
          <div className="text-lg font-semibold mb-4">현재 수업</div>
          <div className="space-y-4">
            <div><div className="flex items-center justify-between mb-1"><div className="font-medium">초보자를 위한 파이썬</div><div className="text-primary font-semibold">75%</div></div><div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-primary w-3/4"></div></div></div>
            <div><div className="flex items-center justify-between mb-1"><div className="font-medium">기계 학습 기초</div><div className="text-primary font-semibold">35%</div></div><div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-300 w-1/3"></div></div></div>
          </div>
        </div>
        <div className="card p-5">
          <div className="text-lg font-semibold mb-2">이번 주 목표</div>
          {['파이썬 OOP 모듈 완료','ML 실행 과제 프로젝트','코딩 챌린지 연습'].map((t,i)=>(
            <div key={i} className="flex items-center justify-between py-3 border-b last:border-0 border-skin-ring"><div>{t}</div><div className="badge">{i==0?'완료':'진행중'}</div></div>
          ))}
        </div>
        <div className="card p-5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <div className="text-lg font-semibold mb-3">AI 조언</div>
          <ul className="space-y-3 text-white/90"><li>데이터 구조에 집중 — 이해가 평면이 아닌 입체로 올라갑니다.</li><li>최적의 학습 시간 — 오전 2시간에 집중도가 가장 높았어요.</li><li>커뮤니티 참여 — 비슷한 진도 학습자 그룹에 합류해 보세요.</li></ul>
        </div>
      </section>
      <aside className="space-y-6">
        <div className="card p-5"><div className="text-lg font-semibold mb-2">빠른 통계</div><ul className="space-y-2 text-slate-600"><li>등록된 과정 3</li><li>완료한 강의 47</li><li>평균 점수 87%</li><li>이번 주 8.5시간</li></ul></div>
        <div className="card p-5"><div className="text-lg font-semibold mb-2">다가오는 마감일</div><ul className="space-y-2 text-slate-600"><li>11/08 — ML 프로젝트 제출</li><li>11/12 — 파이썬 프로젝트</li></ul></div>
      </aside>
    </div>
  )
}
