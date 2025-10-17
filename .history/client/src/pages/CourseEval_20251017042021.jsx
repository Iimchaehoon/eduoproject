export default function CourseEval() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-8 space-y-6">
      {/* 헤더 카드 */}
      <section className="card p-5 flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500">서울대학교 컴퓨터공학과 김교수</div>
          <h1 className="text-xl font-bold">강의 평가</h1>
        </div>
        <div className="rounded-xl bg-blue-50 border border-blue-100 px-4 py-2 text-right">
          <div className="text-[12px] text-slate-500">평균 평점</div>
          <div className="text-blue-600 text-xl font-bold">
            4.8<span className="text-slate-400 text-base">/5.0</span>
          </div>
        </div>
      </section>

      {/* 좌: 전체 만족도 / 우: 추천 의향 */}
      <section className="grid md:grid-cols-[1.2fr_1fr] gap-5">
        {/* 전체 만족도 */}
        <div className="card p-4">
          <h3 className="font-semibold mb-3">전체 만족도</h3>
          <ul className="space-y-2 text-sm">
            {[
              "강의 전체 평가",
              "강의 내용의 명확성",
              "교수님의 설명력",
              "실습 자료의 품질",
              "학습 난이도 적절성",
              "AI 튜터 도움 정도",
            ].map((t, i) => (
              <li key={i} className="flex items-center justify-between">
                <span className="text-ink-700">{t}</span>
                <span className="text-amber-500">★ 5.0</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 추천 의향 + 수료증 */}
        <div className="space-y-4">
          <div className="card p-4 bg-green-50/60 border border-green-100">
            <h3 className="font-semibold mb-2">추천 의향</h3>
            <div className="text-sm mb-3">이 강의를 다른 학습자에게 추천하시겠습니까?</div>
            <div className="flex gap-2">
              <button className="btn btn-primary">적극 추천</button>
              <button className="btn btn-ghost">추천하지 않음</button>
            </div>
          </div>
          <div className="card p-4">
            <h3 className="font-semibold mb-2">수료증 획득</h3>
            <div className="text-sm text-slate-600">
              파이썬 객체지향 프로그래밍 과정을 성공적으로 완료했습니다.
            </div>
            <button className="btn btn-ghost mt-3">수료증 다운로드</button>
          </div>
        </div>
      </section>

      {/* 상세 후기 작성 */}
      <section className="card p-4">
        <h3 className="font-semibold mb-3">상세 후기 작성</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="input" placeholder="좋았던 점(예: 예제가 좋아요)" />
          <input className="input" placeholder="개선점(예: 더 많은 미션)" />
        </div>
        <textarea
          className="input mt-3 h-32"
          placeholder="구체적인 의견을 남겨주세요."
        />
        <div className="text-right mt-3">
          <button className="btn btn-ghost mr-2">임시저장</button>
          <button className="btn btn-primary">평가 올리기</button>
        </div>
      </section>

      {/* 하단 3단: 학습 성과 / 스킬 향상도 / 추천 강의 */}
      <section className="grid md:grid-cols-3 gap-5">
        <div className="card p-4">
          <h3 className="font-semibold mb-3">학습 성과</h3>
          <ul className="space-y-1 text-sm">
            <li className="flex justify-between"><span>완료한 강의</span><b>24/24</b></li>
            <li className="flex justify-between"><span>실습 과제</span><b>12/12</b></li>
            <li className="flex justify-between"><span>퀴즈 점수</span><b>92/100</b></li>
            <li className="flex justify-between"><span>학습 시간</span><b>18시간</b></li>
          </ul>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold mb-3">스킬 향상도</h3>
          <Bar label="파이썬 기초" v={95} />
          <Bar label="객체지향 개념" v={88} />
          <Bar label="클래스 설계" v={75} />
          <Bar label="함수와 단정성" v={62} />
        </div>
        <div className="card p-4">
          <h3 className="font-semibold mb-3">추천 강의</h3>
          <Rec title="파이썬 디자인 패턴" />
          <Rec title="테이븐 구문과 알고리즘" />
          <Rec title="Django로 웹 앱 개발" />
        </div>
      </section>

      {/* 다른 학습자 후기 */}
      <section className="card p-4">
        <h3 className="font-semibold mb-3">다른 학습자 후기</h3>
        <ul className="space-y-4 text-sm">
          <li>
            <b>박민수</b> · 컴퓨터공학 3학년 · 2024.10.10
            <div className="text-slate-600 mt-1">
              실습 중심이라 이해가 쉬웠고 AI 튜터가 실시간으로 질문에 답해줘서 유익했어요.
            </div>
          </li>
          <li>
            <b>이수진</b> · 전자공학 2학년 · 2024.10.12
            <div className="text-slate-600 mt-1">
              코드 실습 위주라 집중하며 따라갔어요. 객체지향 개념도 체계적으로 이해!
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}

function Bar({ label, v }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs text-slate-600 mb-1">
        <span>{label}</span><span>{v}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500" style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}
function Rec({ title }) {
  return (
    <div className="p-3 rounded-lg border text-sm mb-2">
      <div className="text-ink-800">{title}</div>
      <div className="text-[12px] text-slate-500">★ 4.7 · 1.2만 수강</div>
    </div>
  );
}
