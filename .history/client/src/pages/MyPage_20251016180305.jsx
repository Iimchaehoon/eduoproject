import React from "react";

/** 공통 카드 */
const Card = ({ className = "", children }) => (
  <div
    className={
      "rounded-2xl bg-white shadow-[0_8px_24px_rgba(16,24,40,.08)] " + className
    }
  >
    {children}
  </div>
);

/** 얇은 진행바 */
const Bar = ({ pct, color = "#4F6AFD" }) => (
  <div className="h-[8px] w-full overflow-hidden rounded-full bg-[#EEF1F5]">
    <div
      className="h-full rounded-full"
      style={{ width: pct + "%", background: color }}
    />
  </div>
);

export default function MyPage() {
  return (
    <div className="bg-[#F7F9FC]">
      {/* 상단 환영 영역 */}
      <section className="max-w-[1200px] mx-auto px-6 pt-7 pb-2">
        <Card className="px-6 py-5">
          <div className="flex items-center justify-between">
            {/* 좌측: 인사 */}
            <div className="flex items-center gap-4">
              <img
                src="/img/my_img.png"
                className="h-12 w-12 rounded-full object-cover"
                alt="profile"
              />
              <div>
                <h1 className="text-[20px] font-extrabold text-[#0F1B2D]">
                  다시 돌아온 것을 환영합니다, 동우!
                </h1>
                <p className="text-[13px] text-[#6B7686]">
                  학습을 멈추지 않으면, 당신은 목표를 달성할 길에 있습니다.
                </p>
              </div>
            </div>

            {/* 우측: 3개 작은 지표 */}
            <div className="hidden md:flex items-center gap-8">
              <SmallStat
                icon="/img/fire.png"
                label="12일 연속"
                sub="연속 학습"
              />
              <SmallStat
                icon="/img/tro.png"
                label="3개"
                sub="달성 목표"
              />
              <SmallStat
                icon="/img/clock.png"
                label="12시간"
                sub="지난주 학습"
              />
            </div>
          </div>
        </Card>
      </section>

      {/* 본문 그리드 */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* 좌측 2컬럼 */}
          <div className="xl:col-span-2 space-y-6">
            {/* 현재 수업 */}
            <Card className="p-6">
              <div className="mb-4 text-[16px] font-extrabold text-[#0F1B2D]">
                현재 수업
              </div>

              {/* 강좌 1 */}
              <div className="mb-5 rounded-xl border border-[#EEF1F5] p-4">
                <div className="flex items-center gap-4">
                  <img
                    src="/img/edu_pro1.png"
                    className="h-[46px] w-[82px] rounded-md object-cover"
                    alt=""
                  />
                  <div className="flex-1">
                    <div className="text-[13px] font-bold text-[#1F2937]">
                      초보자를 위한 파이썬
                    </div>
                    <div className="mt-0.5 text-[12px] text-[#8A94A6]">
                      모듈: 객체 지향 프로그래밍
                    </div>
                  </div>
                  <div className="text-[13px] font-bold text-[#4F6AFD]">75%</div>
                </div>
                <div className="mt-3">
                  <Bar pct={75} />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-[#98A2B3]">
                  <span>12개 모듈 중 9개 완료</span>
                  <span>다음: 클래스와 객체</span>
                </div>
              </div>

              {/* 강좌 2 */}
              <div className="rounded-xl border border-[#EEF1F5] p-4">
                <div className="flex items-center gap-4">
                  <img
                    src="/img/edu_pro2.png"
                    className="h-[46px] w-[82px] rounded-md object-cover"
                    alt=""
                  />
                  <div className="flex-1">
                    <div className="text-[13px] font-bold text-[#1F2937]">
                      기계 학습 기초
                    </div>
                    <div className="mt-0.5 text-[12px] text-[#8A94A6]">
                      모듈: 비용 함수
                    </div>
                  </div>
                  <div className="text-[13px] font-bold text-[#23C07A]">35%</div>
                </div>
                <div className="mt-3">
                  <Bar pct={35} color="#23C07A" />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-[#98A2B3]">
                  <span>8개 모듈 중 3개 완료</span>
                  <span>다음: 비용 함수</span>
                </div>
              </div>
            </Card>

            {/* 이번 주 목표 */}
            <Card className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-[16px] font-extrabold text-[#0F1B2D]">
                  이번 주 목표
                </div>
                <div className="text-[11px] text-[#98A2B3]">
                  2024년 11월 4일~10일 주
                </div>
              </div>

              <GoalRow
                status="완료"
                color="#28C76F"
                title="파이썬 OOP 모듈 완료"
                note="클래스, 상속 및 다형성 예제가"
                right="완료"
              />
              <GoalRow
                status="진행중"
                color="#4F6AFD"
                title="ML 실행 과제 프로젝트"
                note="주차 별로 과제 진행 중"
                right="진행중"
              />
              <GoalRow
                status="대기 중"
                color="#A3AEC2"
                title="코딩 챌린지 연습"
                note="알고리즘 5문항 연습 문제 완료"
                right="대기 중"
              />
            </Card>

            {/* AI 조언 (보라 그라데이션 + 3개 반투명 패널) */}
            <Card className="p-0 overflow-hidden">
              <div className="bg-gradient-to-r from-[#7A5AF8] to-[#6B8CFF] p-6">
                <div className="mb-4 flex items-center gap-2">
                  <img src="/img/robot.png" className="h-5 w-5" alt="" />
                  <div className="text-white text-[16px] font-extrabold">
                    AI 조언
                  </div>
                </div>

                {/* 3개 항목 (투명 유리 느낌) */}
                <AICard
                  icon="/img/think.png"
                  title="데이터 구조에 집중"
                  body="당신의 파이썬 진척 상황에 따라, 다음에는 데이터 구조를 공부하는 것을 추천합니다. 이는 ML 과정의 기초를 강화하는 데 도움이 될 것입니다."
                />
                <AICard
                  icon="/img/grap.png"
                  title="최적의 학습 시간"
                  body="당신의 최적 학습 시간은 오후 2시에서 4시입니다. 이 시간에 도전적인 주제를 배치하면 더 나은 기억력을 유지할 수 있습니다."
                />
                <AICard
                  icon="/img/comu.png"
                  title="커뮤니티 참여"
                  body="비슷한 진척 상황을 가진 활발한 파이썬 커뮤니티가 있습니다. 참여하면 동료 토론을 통해 학습 속도를 높일 수 있습니다."
                />
              </div>
            </Card>
          </div>

          {/* 우측 사이드 1컬럼 */}
          <div className="space-y-6">
            {/* 학습 일정(달력) — 크기 타이트하게 */}
            <Card className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[15px] font-extrabold text-[#0F1B2D]">
                  학습 일정
                </div>
                <div className="text-[12px] text-[#98A2B3]">2024년 11월</div>
              </div>

              <MiniCalendar />

              {/* 범례 */}
              <div className="mt-3 flex items-center gap-4">
                <Legend dot="#6B66FF" text="오늘" />
                <Legend dot="#59D99E" text="학습 세션" />
                <Legend dot="#FFD66B" text="과제 마감" />
              </div>
            </Card>

            {/* 빠른 통계 (아이콘 + 색감) */}
            <Card className="p-5">
              <div className="mb-3 text-[15px] font-extrabold text-[#0F1B2D]">
                빠른 통계
              </div>

              <StatRow
                chipBg="#EDEAFF"
                icon="📘"
                label="등록된 과정"
                value="3"
              />
              <StatRow
                chipBg="#E7F8EE"
                icon="✅"
                label="완료된 강의"
                value="47"
              />
              <StatRow
                chipBg="#FFF3D4"
                icon="⭐"
                label="평균 점수"
                value="87%"
              />
              <StatRow
                chipBg="#E6F5FF"
                icon="⏱"
                label="이번 주"
                value="8.5시간"
              />
            </Card>

            {/* 다가오는 마감일 (색상 카드) */}
            <Card className="p-5">
              <div className="mb-3 text-[15px] font-extrabold text-[#0F1B2D]">
                다가오는 마감일
              </div>

              <DueRow
                day="8"
                month="11월"
                title="ML 프로젝트 제출"
                sub="선형 회귀 과제"
                bg="#FFE9EA"
                border="#FFB8BE"
                tagBg="#EAF1FF"
                tagText="진행 실험 과제"
              />
              <DueRow
                day="12"
                month="11월"
                title="파이썬 프로젝트"
                sub="기획안, 완성도 테스트"
                bg="#FFF7E8"
                border="#FFD98E"
                tagBg="#FFF0DA"
                tagText=""
              />
            </Card>

            {/* 나의 강의 메모 (색상 라인) */}
            <Card className="p-5">
              <div className="mb-3 text-[15px] font-extrabold text-[#0F1B2D]">
                나의 강의 메모
              </div>

              <MemoRow dot="#7B66FF" date="10/15" title="철학의 이해" count="12" />
              <MemoRow dot="#4FA6FF" date="10/15" title="AI 리터러시" count="8" />
              <MemoRow dot="#2ED573" date="10/15" title="시각디자인 리서치" count="5" />
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- 소형 컴포넌트들 ---------- */

function SmallStat({ icon, label, sub }) {
  return (
    <div className="flex items-center gap-2">
      <img src={icon} className="h-5 w-5" alt="" />
      <div className="leading-tight">
        <div className="text-[13px] font-semibold text-[#0F1B2D]">{label}</div>
        <div className="text-[11px] text-[#98A2B3]">{sub}</div>
      </div>
    </div>
  );
}

function GoalRow({ status, color, title, note, right }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#EEF1F5] px-4 py-3 +not-first:mt-3">
      <span
        className="inline-flex h-6 shrink-0 items-center justify-center rounded-full px-2 text-[11px] font-semibold text-white"
        style={{ background: color }}
      >
        {status}
      </span>
      <div className="flex-1 leading-tight">
        <div className="text-[13px] font-semibold text-[#0F1B2D]">{title}</div>
        <div className="text-[12px] text-[#8A94A6]">{note}</div>
      </div>
      <div className="text-[12px] text-[#98A2B3]">{right}</div>
    </div>
  );
}

function AICard({ icon, title, body }) {
  return (
    <div className="mt-3 rounded-xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-[2px]">
      <div className="flex items-start gap-3">
        <img src={icon} className="mt-0.5 h-[18px] w-[18px]" alt="" />
        <div>
          <div className="text-[13px] font-semibold text-white">{title}</div>
          <div className="mt-1 text-[12px] leading-5 text-white/90">{body}</div>
        </div>
      </div>
    </div>
  );
}

function Legend({ dot, text }) {
  return (
    <div className="flex items-center gap-2 text-[12px] text-[#667085]">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ background: dot }}
      />
      {text}
    </div>
  );
}

function MiniCalendar() {
  const head = ["일", "월", "화", "수", "목", "금", "토"];
  const days = [
    "", "", "", "", "1", "2", // 1주
    "3", "4", "5", "6", "7", "8", "9",
    "10", "11", "12", "13", "14", "15", "16",
  ];
  return (
    <div className="select-none">
      <div className="grid grid-cols-7 gap-2 text-center text-[11px] text-[#98A2B3]">
        {head.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-2 text-center">
        {days.map((d, i) => {
          // 강조일(피그마 샘플: 4,5,8은 색 원, 6은 파랑원)
          const dot =
            d === "4"
              ? "bg-[#6B66FF]"
              : d === "5"
              ? "bg-[#59D99E]"
              : d === "8"
              ? "bg-[#FFD66B]"
              : d === "6"
              ? "ring-2 ring-[#6B66FF]"
              : "";

        return (
          <div
            key={i}
            className={
              "h-8 rounded-full text-[12px] leading-8 " +
              (dot ? "text-white " : "text-[#0F1B2D] ")
            }
          >
            <div
              className={
                "mx-auto h-8 w-8 rounded-full " +
                (dot.includes("ring") ? dot : dot ? dot : "")
              }
            >
              <span className="inline-block h-8 w-8 rounded-full align-middle">
                {d}
              </span>
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}

function StatRow({ chipBg, icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-7 w-7 items-center justify-center rounded-md text-[14px]"
          style={{ background: chipBg }}
          aria-hidden
        >
          {icon}
        </span>
        <span className="text-[13px] text-[#1F2937]">{label}</span>
      </div>
      <span className="text-[13px] font-bold text-[#0F1B2D]">{value}</span>
    </div>
  );
}

function DueRow({ day, month, title, sub, bg, border, tagBg, tagText }) {
  return (
    <div
      className="mb-3 rounded-xl border p-4"
      style={{ background: bg, borderColor: border }}
    >
      <div className="flex items-start gap-3">
        <div className="text-center">
          <div className="text-[18px] font-extrabold text-[#E24A57] leading-none">
            {day}
          </div>
          <div className="text-[11px] text-[#8A94A6] mt-1">{month}</div>
        </div>
        <div className="flex-1">
          <div className="text-[13px] font-semibold text-[#0F1B2D]">{title}</div>
          <div className="text-[12px] text-[#8A94A6] mt-1">{sub}</div>
          {tagText ? (
            <div
              className="mt-2 inline-flex rounded-md px-2 py-1 text-[11px] font-semibold text-[#4251FF]"
              style={{ background: tagBg }}
            >
              {tagText}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MemoRow({ dot, date, title, count }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#F7F9FC] px-3 py-2 +not-first:mt-2">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: dot }} />
      <span className="w-[56px] text-[12px] text-[#6B7686]">{date}</span>
      <span className="flex-1 text-[13px] text-[#0F1B2D]">{title}</span>
      <span className="text-[12px] text-[#98A2B3]">{count}</span>
    </div>
  );
}
