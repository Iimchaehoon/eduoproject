export default function CourseEval(){
  return (
    <div className="max-w-[1200px] mx-auto px-5 py-8">
      {/* 헤더 */}
      <div className="bg-white rounded-2xl border p-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500">서울대학교 컴퓨터공학과 김교수 • 2024년 1학기</div>
          <h1 className="text-xl font-bold mt-1">강의 평가</h1>
        </div>
        <div className="w-[110px] h-[68px] rounded-xl border grid place-items-center">
          <div className="text-sm text-slate-500">평균 평점</div>
          <div className="text-[#2C6BFF] font-bold text-lg">4.8/5.0</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6 mt-6">
        {/* 왼쪽 */}
        <section className="space-y-6">
          {/* 전체 만족도 */}
          <div className="bg-white rounded-2xl border p-4">
            <h3 className="font-semibold mb-3">전체 만족도</h3>
            {[
              "강의 전체 평가","강의 내용의 명확성","교수님의 설명력",
              "실습 자료의 품질","학습 난이도 적절성","AI 튜터 도움 정도"
            ].map((t,i)=>(
              <div key={i} className="flex items-center justify-between py-2 border-t first:border-t-0">
                <span className="text-sm">{t}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#F59E0B]">★ ★ ★ ★ ★</span>
                  <span className="text-sm text-slate-700">5.0</span>
                </div>
              </div>
            ))}
          </div>

          {/* 상세 후기 작성 */}
          <div className="bg-white rounded-2xl border p-4">
            <h3 className="font-semibold">상세 후기 작성</h3>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              <input className="h-10 border rounded-lg px-3 text-sm" placeholder="좋았던 점(예: 예제가 좋아요)"/>
              <input className="h-10 border rounded-lg px-3 text-sm" placeholder="개선점(예: 더 많은 미션)"/>
            </div>
            <textarea className="mt-3 w-full h-28 border rounded-lg p-3 text-sm" placeholder="구체적인 의견을 남겨주세요."/>
            <div className="mt-3 flex gap-2 justify-end">
              <button className="px-3 h-9 rounded-lg bg-slate-100 text-slate-700 text-sm">임시저장</button>
              <button className="px-3 h-9 rounded-lg bg-[#2C6BFF] text-white text-sm">평가 올리기</button>
            </div>
          </div>

          {/* 하단 카드 3개 */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border p-4">
              <h4 className="font-semibold">학습 성과</h4>
              {[
                ["완료한 강의","24/24"],["실습 과제","12/12"],["퀴즈 점수","92/100"],["학습 시간","18시간"]
              ].map(([k,v])=>(
                <div key={k} className="flex items-center justify-between py-2 border-t first:border-t-0 text-sm">
                  <span>{k}</span><span className="text-slate-700">{v}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border p-4">
              <h4 className="font-semibold">스킬 향상도</h4>
              {[
                ["파이썬 기초",95],["객체지향 개념",84],["클래스 설계",75],["함수와 다형성",62]
              ].map(([k,v])=>(
                <div key={k} className="py-2 border-t first:border-t-0">
                  <div className="flex justify-between text-sm"><span>{k}</span><span className="text-slate-700">{v}%</span></div>
                  <div className="h-2 bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-[#2C6BFF]" style={{width:`${v}%`}}/>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border p-4">
              <h4 className="font-semibold">추천 강의</h4>
              {[
                ["파이썬 디자인 패턴","4.7 · 1.2만 수강"],
                ["테이븐 구조와 알고리즘","4.6 · 1.2만 수강"],
                ["Django로 웹 앱 개발","4.5 · 9천 수강"],
              ].map(([t,s])=>(
                <div key={t} className="p-3 rounded-xl border mt-2">
                  <div className="text-sm font-medium">{t}</div>
                  <div className="text-xs text-slate-500 mt-1">{s}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 제출 CTA */}
          <div className="mt-6 bg-gradient-to-r from-[#EEF2FF] to-[#F7FAFF] rounded-2xl border p-5 text-center">
            <div className="font-semibold">평가 완료하기</div>
            <div className="text-sm text-slate-600 mt-1">소중한 의견을 통해 더 나은 강의를 만들어갑니다.</div>
            <div className="mt-3 flex gap-2 justify-center">
              <button className="px-4 h-9 rounded-lg bg-[#2C6BFF] text-white text-sm">평가 제출하기</button>
              <button className="px-4 h-9 rounded-lg bg-white border text-sm">임시 저장</button>
            </div>
          </div>

          {/* 후기 목록 */}
          <div className="bg-white rounded-2xl border p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">다른 학습자 후기</h4>
              <div className="text-xs text-slate-500">총 1,245개 후기 · ⭐ 4.8</div>
            </div>
            {[
              ["박민수","설명이 명확하고 이해하기 쉽게 구성된 강의였습니다. 특히 AI 튜터가 실시간으로 질문에 답변해주는 기능이 정말 유용했어요."],
              ["이수진","코드 실습 위주 진행이라 따라가기 좋았어요. 실전 개념을 체계적으로 이해!"],
              ["정지훈","실무에 닿아 있는 예제가 매우 좋았습니다. 시각화 퀴즈도 재미있었고요."]
            ].map(([n,t],i)=>(
              <div key={i} className="pt-4 border-t mt-4">
                <div className="text-sm font-semibold">{n}</div>
                <div className="text-sm text-slate-700 mt-1">{t}</div>
              </div>
            ))}
            <div className="mt-4 text-center">
              <button className="px-3 h-9 rounded-lg bg-slate-100 text-sm">더 많은 후기 보기</button>
            </div>
          </div>
        </section>

        {/* 오른쪽 */}
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl border p-4">
            <h3 className="font-semibold">추천 의향</h3>
            <div className="mt-3 p-3 rounded-xl border bg-[#F6FAFF] text-sm">
              이 강의를 다른 학습자에게 추천하시겠습니까?
              <div className="mt-2 flex gap-2">
                <button className="px-3 h-9 rounded-lg bg-[#2C6BFF] text-white text-sm">적극 추천</button>
                <button className="px-3 h-9 rounded-lg bg-white border text-sm">추천하지 않음</button>
              </div>
            </div>
            <div className="mt-3 p-3 rounded-xl border">
              <div className="font-medium">수료증 획득</div>
              <div className="text-xs text-slate-500 mt-1">파이썬 객체지향 프로그래밍 과정을 성공적으로 완료했습니다.</div>
              <button className="mt-2 px-3 h-9 rounded-lg bg-slate-900 text-white text-sm">수료증 다운로드</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
