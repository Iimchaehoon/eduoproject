export default function CourseEval() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">강의 평가</h1>
          <div className="text-sm text-slate-500">평균 4.8/5.0</div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="rounded-xl border p-4">
            <div className="font-semibold text-sm mb-2">진행 만족도</div>
            <ul className="text-sm space-y-2 text-slate-700">
              <li>강의 흐름이 좋아요 · ⭐⭐⭐⭐⭐</li>
              <li>설명이 친절해요 · ⭐⭐⭐⭐☆</li>
              <li>예제가 유익해요 · ⭐⭐⭐⭐⭐</li>
            </ul>
          </div>
          <div className="rounded-xl border p-4">
            <div className="font-semibold text-sm mb-2">추천 요약</div>
            <p className="text-sm text-slate-700">
              객체지향 설계를 한 번 더 정리하고 싶은 분께 적극 추천!
            </p>
          </div>
          <div className="rounded-xl border p-4">
            <div className="font-semibold text-sm mb-2">기타 의견</div>
            <p className="text-sm text-slate-700">실습 문제를 더 늘려주면 좋겠습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
