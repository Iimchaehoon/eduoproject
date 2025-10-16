// src/pages/CourseEval.jsx
export default function CourseEval(){
  return (
    <div className="max-w-6xl mx-auto px-5 py-8 space-y-6">
      <header className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#eef2ff] grid place-items-center">📘</div>
        <div>
          <div className="text-xs text-slate-400">컴퓨터공학 · 서울대학교 김교수</div>
          <h1 className="text-xl font-bold">강의 평가</h1>
        </div>
        <div className="ml-auto rounded-xl bg-white border px-3 py-2 text-sm">
          평균 평점 <b className="text-primary">4.8/5.0</b>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <section className="card p-4">
          <div className="font-semibold mb-2">전체 만족도</div>
          <ul className="space-y-2 text-sm">
            {[
              ["강의 내용 품질", 4.8],
              ["교수자 전달력", 4.7],
              ["실습·과제 도움", 4.6],
              ["학습 난이도 적절성", 4.5],
              ["학습자료 품질", 4.7],
            ].map(([label, score], i)=>(
              <li key={i} className="flex items-center justify-between">
                <span className="text-slate-600">{label}</span>
                <span className="text-slate-900">{score.toFixed(1)} ★</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-4">
          <div className="font-semibold mb-2">추천 의견</div>
          <div className="rounded-xl border p-4 bg-[#f7fbff]">
            <div className="text-sm text-slate-700">
              이 강의는 파이썬 객체지향의 핵심을 빠르게 익히고 싶은 분께 추천합니다.
            </div>
            <div className="mt-3 text-[12px] text-slate-400">최근 일주일간 128명이 “추천”을 눌렀습니다.</div>
          </div>
          <div className="mt-3 rounded-xl border p-4">
            <div className="text-sm text-slate-700">수강생 리뷰 요약</div>
            <div className="text-[12px] text-slate-500 mt-1">전달력이 좋고 실습 예제가 도움이 되었다는 의견이 많았습니다.</div>
          </div>
        </section>
      </div>

      <section className="card p-4">
        <div className="font-semibold mb-3">상세 평가 작성</div>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="h-10 rounded-lg border px-3" placeholder="장점 요약(예: 예제가 좋아요)"/>
          <input className="h-10 rounded-lg border px-3" placeholder="개선점(예: 더 많은 미션)"/>
        </div>
        <textarea className="mt-3 w-full h-28 rounded-lg border p-3" placeholder="구체적인 의견을 남겨주세요."/>
        <div className="mt-3 flex gap-2 justify-end">
          <button className="btn-ghost">임시저장</button>
          <button className="btn-primary">평가 올리기</button>
        </div>
      </section>

      <section className="card p-0 overflow-hidden">
        <div className="px-4 py-3 border-b font-semibold">다른 학습자 후기</div>
        <div className="divide-y">
          {[
            ["박*수", "전반적으로 예제가 좋아서 실습하며 이해하기 좋았습니다."],
            ["이*진", "개념 → 코드 → 미션 흐름이 깔끔합니다."],
            ["정*용", "객체지향 설계 파트가 특히 알찼어요."],
          ].map(([name, text], idx)=>(
            <div key={idx} className="px-4 py-3">
              <div className="text-[13px] text-slate-400">{name}</div>
              <div className="text-sm text-slate-800 mt-1">{text}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
