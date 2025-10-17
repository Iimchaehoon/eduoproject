export default function CourseEval() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-6 space-y-6">
      {/* 헤더 카드 */}
      <div className="card p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 grid place-items-center">⭐</div>
        <div className="flex-1">
          <div className="text-sm text-slate-500">서울대학교 컴퓨터공학과 김교수 · 2024년 1학기 · 완료일: 2024.10.15</div>
          <h1 className="text-xl font-bold mt-1">강의 평가</h1>
        </div>
        <div className="rounded-xl bg-slate-50 border p-3 text-right">
          <div className="text-sm text-slate-500">평균 평점</div>
          <div className="text-xl font-extrabold">4.8/5.0</div>
        </div>
      </div>

      {/* 만족도 / 추천 의향 */}
      <div className="grid md:grid-cols-2 gap-5">
        <div className="card p-5">
          <div className="font-semibold mb-3">전체 만족도</div>
          {[
            "강의 전체 평가","강의 내용의 명확성","교수님의 설명력",
            "실습 자료의 품질","학습 난이도 적절성","AI 튜터 도움 정도"
          ].map((t,i)=>(
            <div key={i} className="flex items-center justify-between py-2 border-b last:border-b-0">
              <div>{t}</div><div className="text-primary">★ 5.0</div>
            </div>
          ))}
        </div>

        <div className="card p-5">
          <div className="font-semibold mb-3">추천 의향</div>
          <div className="rounded-lg bg-emerald-50 p-3">
            이 강의를 다른 학습자에게 추천하시겠습니까?
            <div className="mt-2 flex gap-2">
              <button className="btn btn-primary">적극 추천</button>
              <button className="btn btn-ghost">추천하지 않음</button>
            </div>
          </div>

          <div className="mt-4 rounded-lg border p-4 bg-slate-50">
            <div className="font-semibold">수료증 획득</div>
            <div className="text-sm text-slate-500 mt-1">
              파이썬 객체지향 프로그래밍 과정을 성공적으로 완료했습니다
            </div>
            <button className="btn btn-ghost mt-3">수료증 다운로드</button>
          </div>
        </div>
      </div>

      {/* 상세작성 */}
      <div className="card p-5">
        <div className="font-semibold mb-3">상세 후기 작성</div>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="pill" placeholder="좋았던 점(예: 예제가 좋아요)" />
          <input className="pill" placeholder="개선점(예: 더 많은 미션)" />
        </div>
        <textarea className="mt-3 w-full h-28 rounded-xl border p-3" placeholder="구체적인 의견을 남겨주세요." />
        <div className="mt-3 text-right">
          <button className="btn btn-ghost mr-2">임시저장</button>
          <button className="btn btn-primary">평가 올리기</button>
        </div>
      </div>

      {/* 성과/스킬/추천강의 */}
      <div className="grid md:grid-cols-3 gap-5">
        <div className="card p-5">
          <div className="font-semibold mb-3">학습 성과</div>
          <ul className="space-y-2 text-sm">
            <li>✔️ 완료한 강의 <span className="float-right">24/24</span></li>
            <li>✔️ 실습 과제 <span className="float-right">12/12</span></li>
            <li>✔️ 퀴즈 점수 <span className="float-right">92/100</span></li>
            <li>✔️ 학습 시간 <span className="float-right">18시간</span></li>
          </ul>
        </div>
        <div className="card p-5">
          <div className="font-semibold mb-3">스킬 향상도</div>
          {["파이썬 기초","객체지향 개념","클래스 설계","상속과 다형성"].map((s, i)=>(
            <div key={i} className="mb-3">
              <div className="text-sm mb-1">{s}</div>
              <div className="w-full h-2 rounded bg-slate-100 overflow-hidden">
                <div className="h-full bg-primary" style={{width:`${[95,88,75,62][i]}%`}}/>
              </div>
            </div>
          ))}
        </div>
        <div className="card p-5">
          <div className="font-semibold mb-3">추천 강의</div>
          {["파이썬 디자인 패턴","테이블 구문과 알고리즘","Django로 웹 앱 개발"].map((t,i)=>(
            <div key={i} className="rounded-lg border p-3 mb-3">
              <div className="font-medium">{t}</div>
              <div className="text-xs text-slate-500 mt-1">⭐ 4.{7-i} · 1.2k명 수강</div>
            </div>
          ))}
        </div>
      </div>

      {/* 후기 리스트 */}
      <div className="card p-5">
        <div className="font-semibold mb-3">다른 학습자 후기</div>
        {[
          {user:"박민수", text:"설명이 명확하고 쉽게 구성된 훌륭한 강의였습니다. 실시간 질문 답변도 굿!"},
          {user:"이수진", text:"코드 실습 위주 진행이라 따라가기 좋았어요. 핵심 개념을 체계적으로 이해!"},
          {user:"정지원", text:"설계와 미션 풀이가 특히 알찼어요. 시각화 피드백도 유용했습니다."},
        ].map((r,i)=>(
          <div key={i} className="border-t pt-3 mt-3">
            <div className="text-sm font-medium">{r.user}</div>
            <div className="text-[13px] mt-1">{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
