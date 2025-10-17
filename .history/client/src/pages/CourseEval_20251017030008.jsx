export default function CourseEval() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="card p-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500">서울대학교 컴퓨터공학과 김교수 · 2024년 1학기 · 완료일자: 2024.10.15</div>
          <div className="text-xl font-bold mt-1">강의 평가</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500">평균 평점</div>
          <div className="text-2xl font-bold">4.8/5.0</div>
        </div>
      </div>

      {/* 상단 2열 */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* 전체 만족도 */}
        <div className="card p-4">
          <div className="font-semibold mb-3">전체 만족도</div>
          <ul className="space-y-2 text-[14px]">
            {[
              "강의 전체 평가",
              "강의 내용의 명확성",
              "교수님의 설명력",
              "실습 자료의 품질",
              "학습 난이도 적절성",
              "AI 튜터 도움 정도",
            ].map((t, i) => (
              <li key={i} className="flex items-center justify-between">
                <span>{t}</span>
                <span className="text-indigo-600">★ 5.0</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 추천 의향 */}
        <div className="card p-4">
          <div className="font-semibold mb-3">추천 의향</div>
          <div className="rounded-xl bg-green-50 border border-green-100 p-4">
            <div className="text-[14px]">이 강의를 다른 학습자에게 추천하시겠습니까?</div>
            <div className="mt-3 flex gap-2">
              <button className="btn-primary">적극 추천</button>
              <button className="btn-ghost">추천하지 않음</button>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 border border-skin-ring p-4">
            <div className="font-medium">수료증 획득</div>
            <div className="text-[13px] text-slate-600 mt-1">파이썬 객체지향 프로그래밍 과정을 성공적으로 완료했습니다.</div>
            <button className="btn-ghost mt-3">수료증 다운로드</button>
          </div>
        </div>
      </div>

      {/* 상세 후기 작성 */}
      <div className="card p-4">
        <div className="font-semibold mb-3">상세 후기 작성</div>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="input w-full" placeholder="좋았던 점(예: 예제가 좋아요)" />
          <input className="input w-full" placeholder="개선점(예: 더 많은 미션)" />
        </div>
        <textarea className="input w-full h-28 mt-3" placeholder="구체적인 의견을 남겨주세요."></textarea>
        <div className="flex gap-2 justify-end mt-3">
          <button className="btn-ghost">임시저장</button>
          <button className="btn-primary">평가 올리기</button>
        </div>
      </div>

      {/* 하단 3열: 성과/스킬/추천강의 */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="font-semibold mb-3">학습 성과</div>
          <ul className="space-y-2 text-[14px] text-slate-700">
            <li>완료한 강의 <b>24/24</b></li>
            <li>실습 과제 <b>12/12</b></li>
            <li>퀴즈 점수 <b>92/100</b></li>
            <li>학습 시간 <b>18시간</b></li>
          </ul>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-3">스킬 향상도</div>
          <div className="space-y-2 text-[14px]">
            <Bar label="파이썬 기초" val={95} />
            <Bar label="객체지향 개념" val={84} />
            <Bar label="클래스 설계" val={75} />
            <Bar label="함수와 캡슐화" val={62} />
          </div>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-3">추천 강의</div>
          <Recommend title="파이썬 디자인 패턴" rating="4.7 · 1.2만 수강" />
          <Recommend title="테이븐 구문과 알고리즘" rating="4.5 · 9천 수강" />
          <Recommend title="Django로 웹 앱 개발" rating="4.6 · 1만 수강" />
        </div>
      </div>

      {/* 후기 리스트 */}
      <div className="card p-4">
        <div className="font-semibold mb-3">다른 학습자 후기</div>
        <ul className="space-y-4">
          {[
            { who: "박민수", text: "설명이 체계적이고 이해하기 쉽게 구성된 강의였습니다. 실시간 질문 응답도 좋았어요." },
            { who: "이수진", text: "코드 실습 위주 진행이라 따라가기 좋았어요. 객체지향 개념을 체계적으로 이해!" },
            { who: "정지원", text: "AI 튜터가 바로바로 힌트를 줘서 시간 단축에 큰 도움이 되었어요." },
          ].map((r, i) => (
            <li key={i} className="border-b pb-3 last:border-none">
              <div className="font-medium">{r.who}</div>
              <div className="text-slate-700 text-[14px] mt-1">{r.text}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Bar({ label, val }) {
  return (
    <div>
      <div className="flex justify-between text-[13px] text-slate-600 mb-1">
        <span>{label}</span><span>{val}%</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full"><div className="h-2 bg-primary rounded-full" style={{ width: `${val}%` }} /></div>
    </div>
  );
}
function Recommend({ title, rating }) {
  return (
    <div className="rounded-xl border border-skin-ring p-3 mb-2">
      <div className="font-medium">{title}</div>
      <div className="text-[13px] text-slate-600 mt-1">⭐ {rating}</div>
    </div>
  );
}
