export default function CourseEval(){
  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-yellow-50 grid place-items-center">⭐</div>
            <div><div className="font-semibold">강의 평가</div><div className="text-sm text-slate-500">파이썬 객체지향 프로그래밍</div></div>
          </div>
          {['전체 만족도','강의 내용의 명확성','교수님의 설명력','실습 자료의 품질','학습 난이도 적절성','AI 튜터 도움 정도'].map((t,i)=>(
            <div key={i} className="flex items-center justify-between py-2 border-b border-skin-ring"><span>{t}</span><span className="text-slate-500">5.0</span></div>
          ))}
        </div>
        <div className="card p-5">
          <div className="font-semibold mb-2">추천 의향</div>
          <div className="flex gap-3"><button className="btn btn-primary flex-1">적극 추천</button><button className="btn btn-ghost flex-1">추천하지 않음</button></div>
        </div>
      </div>
      <div className="card p-5 mt-6">
        <div className="grid md:grid-cols-2 gap-4">
          <textarea className="pill h-36" placeholder="좋았던 점" /><textarea className="pill h-36" placeholder="개선이 필요한 점" />
        </div>
        <textarea className="pill h-28 mt-4 w-full" placeholder="종합 의견" />
        <div className="flex justify-center mt-6 gap-3"><button className="btn btn-primary">평가 제출하기</button><button className="btn btn-ghost">임시 저장</button></div>
      </div>
    </div>
  )
}
