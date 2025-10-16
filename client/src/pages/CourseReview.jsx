// /src/pages/CourseReview.jsx
import { useState } from "react";

/* ---------- 작은 공용 컴포넌트 ---------- */
function StarRow({ value = 4.8, size = 14 }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const full = Math.floor(value);
  const half = value - full >= 0.5;

  return (
    <div className="inline-flex items-center gap-0.5">
      {stars.map((i) => {
        const fill =
          i <= full ? "#FDB022" : i === full + 1 && half ? "url(#half)" : "#E5E7EB";
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#FDB022" />
                <stop offset="50%" stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <path
              d="M10 15.27l-5.18 3.05 1.58-5.36L1.82 8.9l5.47-.4L10 3.5l2.71 4.99 5.47.4-4.58 4.06 1.58 5.36z"
              fill={fill}
            />
          </svg>
        );
      })}
    </div>
  );
}

function Bar({ label, val, tone = "blue" }) {
  const color =
    tone === "green"
      ? "bg-emerald-500"
      : tone === "amber"
      ? "bg-amber-500"
      : tone === "rose"
      ? "bg-rose-500"
      : "bg-indigo-500";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[12px] text-slate-600">
        <span>{label}</span>
        <span className="font-medium text-slate-700">{val}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${val}%` }} />
      </div>
    </div>
  );
}

function Pill({ children, tone = "indigo" }) {
  const bg =
    tone === "green"
      ? "bg-emerald-50 text-emerald-600"
      : tone === "rose"
      ? "bg-rose-50 text-rose-600"
      : tone === "amber"
      ? "bg-amber-50 text-amber-600"
      : "bg-indigo-50 text-indigo-600";
  return (
    <span className={`inline-flex items-center h-7 px-2.5 rounded-md text-[12px] ${bg}`}>
      {children}
    </span>
  );
}

function Card({ title, right, children, className = "" }) {
  return (
    <section
      className={`bg-white rounded-2xl shadow-[0_10px_26px_rgba(16,24,40,.06)] p-5 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[15px] font-semibold text-slate-800">{title}</h3>
        {right}
      </div>
      {children}
    </section>
  );
}

/* ---------- 본문 페이지 ---------- */
export default function CourseReview() {
  const [recommend, setRecommend] = useState(true);

  return (
    <div className="bg-[#F7F9FC]">
      <div className="max-w-[1120px] mx-auto px-5 py-6">
        {/* 헤더 */}
        <div className="grid md:grid-cols-[1fr_280px] gap-4">
          <section className="bg-white rounded-2xl shadow-[0_10px_26px_rgba(16,24,40,.06)] p-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                {/* 책 아이콘 */}
                <svg width="18" height="18" viewBox="0 0 24 24" className="text-indigo-600">
                  <path
                    fill="currentColor"
                    d="M19 2H8a2 2 0 0 0-2 2v13.5A2.5 2.5 0 0 0 8.5 20H20v-2H8.5a.5.5 0 0 1-.5-.5V4h11v12h2V4a2 2 0 0 0-2-2"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[13px] text-slate-500">서울대학교 · 이OO</div>
                <h1 className="text-[18px] sm:text-[20px] font-bold text-slate-900">
                  리액트 고급 개발 (2025-1)
                </h1>

                <div className="mt-2 flex flex-wrap gap-2">
                  <Pill>웹 · 프론트</Pill>
                  <Pill tone="green">실시간 과제 피드백</Pill>
                  <Pill tone="amber">팀 프로젝트</Pill>
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-[12px] text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    최근 수강 2.1k
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    업데이트 2025.03
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    수료증 제공
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-[0_10px_26px_rgba(16,24,40,.06)] p-5">
            <div className="text-right">
              <div className="text-[12px] text-slate-500">종합 평점</div>
              <div className="mt-1 flex items-end justify-end gap-2">
                <div className="text-[26px] font-extrabold text-slate-900 leading-none">4.8</div>
                <div className="text-[12px] text-slate-500 pb-1">/ 5.0</div>
              </div>
              <div className="mt-1">
                <StarRow value={4.8} size={16} />
              </div>
            </div>
          </section>
        </div>

        {/* 1행 : 전체만족도 / 추천지수 */}
        <div className="grid md:grid-cols-[1fr_360px] gap-4 mt-4">
          <Card title="전체 만족도">
            <ul className="divide-y divide-slate-100">
              {[
                ["강의 완성도", 4.9],
                ["교수자 피드백", 4.8],
                ["강의 자료", 4.6],
                ["과제의 적절성", 4.7],
                ["취업/진로 도움", 4.5],
              ].map(([label, v]) => (
                <li key={label} className="py-2.5 flex items-center justify-between">
                  <span className="text-[14px] text-slate-700">{label}</span>
                  <div className="flex items-center gap-2">
                    <StarRow value={v} />
                    <span className="text-[12px] text-slate-500">{v.toFixed(1)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <div className="space-y-3">
            <Card
              title="추천 지수"
              right={
                <span className="text-[12px] text-slate-500">
                  내 학습 성향과의 적합도
                </span>
              }
              className="p-5"
            >
              <p className="text-[13px] text-slate-600">
                이 강의가 학습 목표에 부합한다고 느끼셨나요?
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => setRecommend(true)}
                  className={`h-9 px-3 rounded-lg text-[13px] font-semibold ${
                    recommend
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  네, 추천해요
                </button>
                <button
                  onClick={() => setRecommend(false)}
                  className={`h-9 px-3 rounded-lg text-[13px] ${
                    !recommend
                      ? "bg-rose-500 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  아니요
                </button>
              </div>
            </Card>

            <section className="bg-white rounded-2xl shadow-[0_10px_26px_rgba(16,24,40,.06)] p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                  {/* 로켓 */}
                  <svg width="18" height="18" viewBox="0 0 24 24" className="text-indigo-600">
                    <path
                      fill="currentColor"
                      d="M5.5 13.5L2 22l8.5-3.5l9-9l-5-5l-9 9zM14 7l3 3l-2 2l-3-3z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-semibold text-slate-800">수업 추천</div>
                  <div className="text-[12px] text-slate-500">
                    개인화된 추천을 통해 비슷한 강의를 더 찾아보세요.
                  </div>
                </div>
                <button className="h-9 px-3 rounded-lg bg-indigo-600 text-white text-[13px]">
                  추천 탐색
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* 2행 : 상세평가 작성 */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <Card title="상세 평가(좋았던 점)">
            <textarea
              rows={4}
              placeholder="예) 실습 위주라 이해가 쉬웠고, 코드 리뷰 피드백이 빨랐습니다."
              className="w-full rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none p-3 text-[14px] placeholder:text-slate-400"
            />
          </Card>
          <Card title="상세 평가(개선이 필요해요)">
            <textarea
              rows={4}
              placeholder="예) 과제 마감 안내가 촉박했어요. 평가 기준도 미리 공개되면 좋겠습니다."
              className="w-full rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none p-3 text-[14px] placeholder:text-slate-400"
            />
          </Card>
        </div>

        {/* 3행 : 학습성과/소요학습도/추천강의 */}
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <Card title="학습 성과">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-slate-600">완료한 강의</span>
                <span className="text-[13px] text-slate-800 font-medium">24/24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-slate-600">퀴즈 평균</span>
                <span className="text-[13px] text-slate-800 font-medium">92점</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-slate-600">토론 참여</span>
                <span className="text-[13px] text-slate-800 font-medium">12회</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-slate-600">학습 시간</span>
                <span className="text-[13px] text-slate-800 font-medium">24시간</span>
              </div>
            </div>
          </Card>

          <Card title="소요 학습도">
            <div className="space-y-3">
              <Bar label="개념의 깊이" val={78} tone="blue" />
              <Bar label="과제량 적절성" val={66} tone="green" />
              <Bar label="테스트 난이도" val={58} tone="amber" />
              <Bar label="실습 난이도" val={34} tone="rose" />
            </div>
          </Card>

          <Card title="추천 강의">
            <div className="space-y-3">
              {[
                ["파이썬으로 데이터 과학", "연세대학교 · 박OO"],
                ["웹 성능 최적화", "서울대학교 · 이OO"],
                ["머신러닝 심화", "KAIST · 김OO"],
              ].map(([t, s]) => (
                <div
                  key={t}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" className="text-slate-500">
                      <path
                        fill="currentColor"
                        d="M19 2H8a2 2 0 0 0-2 2v13.5A2.5 2.5 0 0 0 8.5 20H20v-2H8.5a.5.5 0 0 1-.5-.5V4h11v12h2V4a2 2 0 0 0-2-2"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-medium text-slate-800">{t}</div>
                    <div className="text-[12px] text-slate-500">{s}</div>
                  </div>
                  <StarRow value={4.7} size={12} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* 평가 업로드 CTA */}
        <section className="mt-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-violet-50 to-sky-50 border border-indigo-100 p-6 text-center">
          <div className="mx-auto w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" className="text-indigo-600">
              <path
                fill="currentColor"
                d="M12 2L3.5 20.29a1 1 0 0 0 .9 1.41H19.6a1 1 0 0 0 .9-1.41Z"
              />
            </svg>
          </div>
          <h4 className="mt-2 text-[15px] font-semibold text-slate-800">평가 업로드하기</h4>
          <p className="mt-1 text-[13px] text-slate-600">
            소중한 경험을 공유해 주세요. 다른 학습자에게 큰 도움이 됩니다.
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <button className="h-9 px-3 rounded-lg bg-indigo-600 text-white text-[13px]">
              내 평가 등록
            </button>
            <button className="h-9 px-3 rounded-lg bg-white border border-slate-200 text-[13px] text-slate-700">
              임시 저장
            </button>
          </div>
        </section>

        {/* 다른 학습자 후기 */}
        <Card
          title="다른 학습자 후기"
          right={<span className="text-[12px] text-slate-500">총 3,219개</span>}
          className="mt-4"
        >
          <ul className="space-y-4">
            {[
              {
                name: "박OO",
                date: "2025.03.12",
                text:
                  "실습 위주로 구성되어 있어 이해가 빠릅니다. 코드 리뷰 피드백이 빨라 동기부여가 컸습니다. 개인 프로젝트와 팀 프로젝트의 밸런스가 좋았고, 평가 기준도 명확했습니다.",
              },
              {
                name: "하OO",
                date: "2025.02.28",
                text:
                  "과제량이 적당했고 강의 자료가 정갈했습니다. 다만 퀴즈 난이도 편차가 조금 있어서 사전 공지가 있으면 더 좋겠습니다.",
              },
              {
                name: "김OO",
                date: "2025.01.30",
                text:
                  "실무와 연계된 예시들이 많아 취업 준비에 도움이 되었습니다. 토론 활동이 활발해서 다양한 시각을 접할 수 있었어요.",
              },
            ].map((r, i) => (
              <li key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200" />
                    <div>
                      <div className="text-[13px] font-medium text-slate-800">{r.name}</div>
                      <div className="text-[12px] text-slate-500">{r.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRow value={4.8} />
                    <span className="text-[12px] text-slate-500">4.8</span>
                  </div>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-slate-700">{r.text}</p>
                <div className="mt-3 flex items-center gap-2">
                  <button className="h-8 px-3 rounded-lg bg-white border border-slate-200 text-[12px] text-slate-700">
                    도움됐어요
                  </button>
                  <button className="h-8 px-3 rounded-lg bg-white border border-slate-200 text-[12px] text-slate-700">
                    신고
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-center">
            <button className="h-9 px-3 rounded-lg bg-white border border-slate-200 text-[13px] text-slate-700">
              후기 더 보기
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
