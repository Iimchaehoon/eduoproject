function StarRow({ label, value = 5.0 }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-slate-700">{label}</span>
      <span className="flex items-center gap-2">
        <span className="text-amber-500">★★★★★</span>
        <span className="text-slate-500 text-sm">{value.toFixed(1)}</span>
      </span>
    </div>
  );
}

export default function CourseReview() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-6 space-y-6">
      {/* 헤더 */}
      <div className="rounded-2xl border bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-50 grid place-items-center rounded-xl">⭐</div>
          <div>
            <div className="text-sm text-slate-500">서울대학교 · 컴퓨터공학과 김교수</div>
            <h1 className="font-semibold text-slate-900">강의 평가</h1>
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 px-4 py-3 text-right">
          <div className="text-[13px] text-slate-500">평균 평점</div>
          <div className="text-xl font-bold">4.8/5.0</div>
          <div className="text-amber-500 text-xs">★★★★★</div>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_380px] gap-5">
        {/* 좌측 – 전체만족도 + 후기작성 */}
        <div className="space-y-5">
          {/* 전체 만족도 */}
          <div className="rounded-2xl border bg-white shadow-sm p-4">
            <div className="font-semibold mb-3">전체 만족도</div>
            <div className="space-y-1.5">
              <StarRow label="강의 전체 평가" />
              <StarRow label="강의 내용의 명확성" value={5.0} />
              <StarRow label="교수님의 설명력" value={4.9} />
              <StarRow label="실습 자료의 품질" value={4.8} />
              <StarRow label="학습 난이도 적절성" value={4.7} />
              <StarRow label="AI 튜터 도움 정도" value={5.0} />
            </div>
          </div>

          {/* 상세 후기 작성 */}
          <div className="rounded-2xl border bg-white shadow-sm p-4 space-y-3">
            <div className="font-semibold">상세 후기 작성</div>
            <div className="grid md:grid-cols-2 gap-3">
              <input className="input" placeholder="장점 요약(예: 예제가 좋아요)" />
              <input className="input" placeholder="개선점(예: 더 많은 미션)" />
            </div>
            <textarea className="input h-36" placeholder="구체적인 의견을 남겨주세요." />
            <div className="flex gap-2 justify-end">
              <button className="btn btn-ghost">임시저장</button>
              <button className="btn btn-primary">평가 올리기</button>
            </div>
          </div>

          {/* 학습 성과 + 스킬 향상도 + 추천 강의 */}
          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-2xl border bg-white shadow-sm p-4">
              <div className="font-semibold mb-3">학습 성과</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>완료한 강의</span><b>24/24</b></div>
                <div className="flex justify-between"><span>실습 과제</span><b>12/12</b></div>
                <div className="flex justify-between"><span>퀴즈 점수</span><b>92/100</b></div>
                <div className="flex justify-between"><span>학습 시간</span><b>18시간</b></div>
              </div>
            </div>

            <div className="rounded-2xl border bg-white shadow-sm p-4">
              <div className="font-semibold mb-3">스킬 향상도</div>
              <div className="space-y-3 text-sm">
                {[
                  ["파이썬 기초", 95],
                  ["객체지향 개념", 88],
                  ["클래스 설계", 75],
                  ["상속과 다형성", 62],
                ].map(([label, v]) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1"><span>{label}</span><span>{v}%</span></div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border bg-white shadow-sm p-4">
              <div className="font-semibold mb-3">추천 강의</div>
              <div className="space-y-2">
                {[
                  ["파이썬 디자인 패턴", "4.7 · 1.2만 수강"],
                  ["테이븐 구문과 알고리즘", "4.5 · 2.1만 수강"],
                  ["Django로 웹 앱 개발", "4.6 · 1.8만 수강"],
                ].map(([t, m]) => (
                  <div key={t} className="rounded-xl border p-3 text-sm hover:bg-slate-50">
                    <div className="font-medium">{t}</div>
                    <div className="text-slate-500 mt-0.5">{m}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 제출 섹션 */}
          <div className="rounded-2xl border bg-gradient-to-b from-slate-50 to-white shadow-sm p-6 grid md:grid-cols-[1fr_auto_auto] items-center gap-3">
            <div>
              <div className="font-semibold">평가 완료하기</div>
              <div className="text-sm text-slate-600">소중한 의견을 통해 더 나은 강의를 만들어갑니다.</div>
            </div>
            <button className="btn btn-primary">평가 제출하기</button>
            <button className="btn btn-ghost">임시 저장</button>
          </div>

          {/* 다른 학습자 후기 */}
          <div className="rounded-2xl border bg-white shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">다른 학습자 후기</div>
              <div className="text-slate-500 text-sm">총 1,245개 후기 · <b>4.8</b></div>
            </div>

            <div className="mt-3 space-y-4">
              {[
                ["박민수", "정말 체계적이고 이해하기 쉽게 구성된 강의였습니다. 특히 AI 튜터가 실시간으로 질문에 답변해주는 기능이 정말 유용했어요."],
                ["이수진", "코드 실습 위주 진행이 따라오기 좋았어요. 실제 개발로 이어질 수 있게 개념을 체계적으로 이해!"],
                ["정지훈", "설명이 매우 깔끔하고 쉬웠어요. 실전과 연결되는 과제도 좋았습니다."],
              ].map(([name, text]) => (
                <div key={name} className="rounded-xl border p-3">
                  <div className="font-medium">{name}</div>
                  <div className="text-sm text-slate-700 mt-1">{text}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 text-center">
              <button className="btn btn-ghost">더 많은 후기 보기</button>
            </div>
          </div>
        </div>

        {/* 우측 – 추천의향 + 수료증 */}
        <div className="space-y-5">
          <div className="rounded-2xl border bg-white shadow-sm p-4">
            <div className="font-semibold">추천 의향</div>
            <div className="mt-3 text-sm text-slate-700">이 강의를 다른 학습자에게 추천하시겠습니까?</div>
            <div className="mt-3 flex gap-2">
              <button className="btn btn-primary flex-1">적극 추천</button>
              <button className="btn btn-ghost flex-1">추천하지 않음</button>
            </div>
          </div>

          <div className="rounded-2xl border bg-white shadow-sm p-4">
            <div className="font-semibold">수료증 획득</div>
            <div className="text-sm text-slate-600 mt-2">
              파이썬 객체지향 프로그래밍 과정을 성공적으로 완료했습니다.
            </div>
            <button className="btn btn-ghost mt-3">수료증 다운로드</button>
          </div>
        </div>
      </div>
    </div>
  );
}
