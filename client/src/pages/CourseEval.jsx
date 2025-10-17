// src/pages/CourseEval.jsx
import { useState } from "react";

export default function CourseEval() {
  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");
  const [summary, setSummary] = useState("");

  const METRICS = [
    ["강의 전체 평가", 5.0],
    ["강의 내용의 명확성", 5.0],
    ["교수님의 설명력", 5.0],
    ["실습 자료의 품질", 5.0],
    ["학습 난이도 적절성", 5.0],
    ["AI 튜터 도움 정도", 5.0],
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      {/* 헤더 */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">강의 평가</h1>
          <div className="mt-1 text-[13px] text-slate-500">
            파이썬 객체지향 프로그래밍 · 서울대학교 컴퓨터공학과 김교수
          </div>
        </div>

        <div className="rounded-2xl bg-amber-50 px-4 py-2 text-right shadow-sm">
          <div className="text-xs text-slate-500">총점</div>
          <div className="text-lg font-bold text-amber-700">4.8/5.0 ⭐</div>
        </div>
      </div>

      {/* 상단 그리드 */}
      <div className="grid gap-5 md:grid-cols-[1.15fr_.85fr]">
        {/* 전체 만족도 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="mb-3 inline-flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <span>🌟</span> 전체 만족도
          </div>

          <ul className="space-y-2">
            {METRICS.map(([label, score]) => (
              <li
                key={label}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2"
              >
                <span className="text-[13px] text-slate-700">{label}</span>
                <span className="text-[13px] font-semibold text-slate-900">
                  {score.toFixed(1)} <span className="ml-1">⭐</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 추천 의향 + 수료증 */}
        <div className="grid gap-5">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 shadow-sm">
            <div className="mb-3 inline-flex items-center gap-2 text-[15px] font-semibold text-emerald-900">
              <span>👍</span> 추천 의향
            </div>
            <div className="rounded-xl bg-white p-3 text-[13px] shadow-sm">
              이 강의를 다른 학습자에게 추천하시겠습니까?
            </div>
            <div className="mt-3 flex gap-2">
              <button className="h-9 flex-1 rounded-xl bg-emerald-600 text-[13px] font-semibold text-white hover:bg-emerald-700">
                적극 추천
              </button>
              <button className="h-9 flex-1 rounded-xl border border-emerald-300 bg-white text-[13px] text-emerald-800 hover:bg-emerald-50">
                추천하지 않음
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 shadow-sm">
            <div className="mb-3 inline-flex items-center gap-2 text-[15px] font-semibold text-indigo-900">
              <span>🎓</span> 수료증 획득
            </div>
            <div className="rounded-xl bg-white p-3 text-[13px] text-indigo-900 shadow-sm">
              파이썬 객체지향 프로그래밍 과정을 성공적으로 완료했습니다.
            </div>
            <div className="mt-3">
              <button className="h-9 w-full rounded-xl bg-indigo-600 text-[13px] font-semibold text-white hover:bg-indigo-700">
                수료증 다운로드
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 상세 후기 작성 */}
      <div className="mt-5 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="mb-3 inline-flex items-center gap-2 text-[15px] font-semibold text-slate-900">
          <span>📝</span> 상세 후기 작성
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <input
            className="h-11 rounded-xl border border-slate-200 px-3 text-[13px]"
            placeholder="좋았던 점(예: 예제가 좋아요)"
            value={good}
            onChange={(e) => setGood(e.target.value)}
          />
          <input
            className="h-11 rounded-xl border border-slate-200 px-3 text-[13px]"
            placeholder="개선점(예: 더 많은 미션)"
            value={bad}
            onChange={(e) => setBad(e.target.value)}
          />
        </div>

        <textarea
          className="mt-3 min-h-[120px] w-full rounded-xl border border-slate-200 p-3 text-[13px]"
          placeholder="구체적인 의견을 남겨주세요."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <div className="mt-3 flex gap-2">
          <button className="h-10 w-36 rounded-xl bg-indigo-600 text-[13px] font-semibold text-white hover:bg-indigo-700">
            평가 올리기
          </button>
          <button className="h-10 w-24 rounded-xl border border-slate-200 text-[13px]">
            임시저장
          </button>
        </div>
      </div>

      {/* 대시보드형 하단 섹션 */}
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {/* 학습 성과 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="mb-3 inline-flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <span>📈</span> 학습 성과
          </div>
          <ul className="space-y-2 text-[13px]">
            <li className="flex justify-between rounded-xl bg-violet-50 px-3 py-2 text-violet-900">
              <span>완료한 강의</span><b>24/24</b>
            </li>
            <li className="flex justify-between rounded-xl bg-emerald-50 px-3 py-2 text-emerald-900">
              <span>실습 과제</span><b>12/12</b>
            </li>
            <li className="flex justify-between rounded-xl bg-sky-50 px-3 py-2 text-sky-900">
              <span>퀴즈 점수</span><b>92/100</b>
            </li>
            <li className="flex justify-between rounded-xl bg-amber-50 px-3 py-2 text-amber-900">
              <span>학습 시간</span><b>18시간</b>
            </li>
          </ul>
        </div>

        {/* 스킬 향상도 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="mb-3 inline-flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <span>🧠</span> 스킬 향상도
          </div>
          {[
            ["파이썬 기초", 95, "bg-emerald-500"],
            ["객체지향 개념", 84, "bg-indigo-500"],
            ["클래스 설계", 75, "bg-sky-500"],
            ["함수와 다형성", 62, "bg-amber-500"],
          ].map(([k, v, bar]) => (
            <div key={k} className="mb-2">
              <div className="mb-1 flex justify-between text-[12px] text-slate-600">
                <span>{k}</span><span>{v}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-100">
                <div className={`h-2 rounded-full ${bar}`} style={{ width: `${v}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* 추천 강의 */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="mb-3 inline-flex items-center gap-2 text-[15px] font-semibold text-slate-900">
            <span>🎯</span> 추천 강의
          </div>
          <div className="space-y-2 text-[13px]">
            {[
              ["파이썬 디자인 패턴", "4.9 · 12.3만 수강"],
              ["테이블 구현과 알고리즘", "4.7 · 21.4만 수강"],
              ["Django로 웹 앱 개발", "4.5 · 9.8만 수강"],
            ].map(([t, s]) => (
              <div key={t} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                <div className="line-clamp-1">{t}</div>
                <div className="text-slate-500">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 제출 */}
      <div className="mt-6 rounded-2xl border border-slate-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-5 text-center shadow-sm">
        <div className="text-[15px] font-semibold text-slate-900">평가 완료하기</div>
        <div className="mt-1 text-[13px] text-slate-600">
          소중한 의견을 통해 더 나은 강의를 만들어요.
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          <button className="h-10 rounded-xl bg-indigo-600 px-4 text-[13px] font-semibold text-white hover:bg-indigo-700">
            평가 제출하기
          </button>
          <button className="h-10 rounded-xl border border-slate-200 px-4 text-[13px]">
            임시 저장
          </button>
        </div>
      </div>
    </div>
  );
}
