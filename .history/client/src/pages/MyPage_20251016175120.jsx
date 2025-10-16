// client/src/pages/MyPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

/* =============== 공통 소도구 =============== */
function ProgressBar({ value = 0, color = "#5B66FF" }) {
  return (
    <div className="h-2.5 w-full rounded-full bg-[#EEF2F7]">
      <div className="h-2.5 rounded-full" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

function Chip({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[12px] ${className}`}
    >
      {children}
    </span>
  );
}

/* =============== 달력 =============== */
function CalendarCard() {
  // 현재 달 기준 캘린더 (피그마 스타일)
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-11
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  const startDay = monthStart.getDay(); // 0=Sun
  const days = monthEnd.getDate();

  // 이벤트 샘플(색상은 범례와 매칭)
  const events = {
    4: "class", // 수업
    6: "class",
    8: "deadline", // 과제 마감
    12: "deadline",
  };

  const weeks = [];
  let cells = [];
  // 앞쪽 빈칸
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= days; d++) {
    cells.push(d);
  }
  // 뒤쪽 빈칸
  while (cells.length % 7 !== 0) cells.push(null);

  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const monthLabel = `${year}년 ${month + 1}월`;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_10px_32px_rgba(16,24,40,0.06)]">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[15px] font-extrabold text-[#0F172A]">학습 일정</div>
        <div className="text-[12px] text-[#6B7280]">{monthLabel}</div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center text-[12px] text-[#9CA3AF]">
        {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
          <div key={d} className="py-2">{d}</div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-y-1">
        {weeks.map((row, idx) => (
          <React.Fragment key={idx}>
            {row.map((d, i) => {
              const isToday =
                d &&
                d === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

              const ev = d ? events[d] : null;
              const evDot =
                ev === "class"
                  ? "bg-[#5B66FF]" // 수업
                  : ev === "deadline"
                  ? "bg-[#F59E0B]" // 마감
                  : "";

              return (
                <div
                  key={`${idx}-${i}`}
                  className="h-10 flex items-center justify-center"
                >
                  {d ? (
                    <div
                      className={`relative h-8 w-8 flex items-center justify-center rounded-full text-[12px] 
                      ${isToday ? "bg-[#EEF1FF] text-[#3B66FF] font-bold" : "text-[#111827]"}
                      `}
                    >
                      {d}
                      {ev && (
                        <span className={`absolute -bottom-1 h-1.5 w-1.5 rounded-full ${evDot}`} />
                      )}
                    </div>
                  ) : (
                    <div className="h-8 w-8" />
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* 범례 */}
      <div className="mt-3 flex items-center gap-4 text-[12px]">
        <div className="flex items-center gap-1 text-[#6B7280]">
          <span className="h-2 w-2 rounded-full bg-[#5B66FF]" />
          <span>수업</span>
        </div>
        <div className="flex items-center gap-1 text-[#6B7280]">
          <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
          <span>과제 마감</span>
        </div>
      </div>
    </div>
  );
}

/* =============== 메인 페이지 =============== */
export default function MyPage() {
  const nav = useNavigate();

  return (
    <div className="bg-[#F7F9FC] min-h-screen">
      {/* 상단바 (간단) */}
      <header className="sticky top-0 z-10 bg-white/85 backdrop-blur border-b border-[#EEF0F4]">
        <div className="mx-auto max-w-[1200px] px-5 h-14 flex items-center justify-between">
          <img src="/img/main_logo.png" alt="EDUO" className="h-6" />
          <div className="hidden md:flex items-center gap-6 text-[14px] text-[#4B5563]">
            <button onClick={() => nav("/mypage")} className="font-semibold text-[#2C3E94]">
              마이페이지
            </button>
            <button onClick={() => nav("/search")}>전체강좌</button>
            <button onClick={() => nav("/community")}>커뮤니티</button>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => nav("/login")}
              className="px-3 py-1.5 rounded-lg text-sm bg-[#EEF1FF] text-[#4450FF] hover:brightness-105"
            >
              로그인
            </button>
            <button
              onClick={() => nav("/register")}
              className="px-3 py-1.5 rounded-lg text-sm bg-[#242A38] text-white hover:brightness-110"
            >
              회원가입
            </button>
          </div>
        </div>
      </header>

      {/* 본문 */}
      <main className="mx-auto max-w-[1200px] px-5 py-8">
        {/* 웰컴 박스 */}
        <section className="rounded-2xl bg-white shadow-[0_10px_32px_rgba(16,24,40,0.06)] p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/img/my_img.png" alt="profile" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <h2 className="text-[20px] font-extrabold text-[#0F172A]">
                  다시 돌아온 것을 환영합니다, 동우!
                </h2>
                <p className="text-[13px] text-[#6B7280] mt-1">
                  학습의 연결을 계속하세요! 당신은 멋진 목표를 달성할 길에 있어요.
                </p>
              </div>
            </div>
            {/* 인사이트 3개 */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-2 text-[13px]">
                <img src="/img/fire.png" className="h-4 w-4" alt="" />
                <span className="text-[#6B7280]">12일 연속</span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <img src="/img/tro.png" className="h-4 w-4" alt="" />
                <span className="text-[#6B7280]">취득한 자격증 3개</span>
              </div>
              <div className="flex items-center gap-2 text-[13px]">
                <img src="/img/clock.png" className="h-4 w-4" alt="" />
                <span className="text-[#6B7280]">이번 주 8.5시간</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2열 레이아웃 */}
        <div className="grid grid-cols-12 gap-6">
          {/* 좌측 */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* 현재 수업 */}
            <div className="rounded-2xl bg-white p-5 shadow-[0_10px_32px_rgba(16,24,40,0.06)]">
              <h3 className="text-[15px] font-extrabold text-[#0F172A] mb-4">현재 수업</h3>
              {/* 카드 1 */}
              <div className="rounded-xl border border-[#EEF0F4] p-4 hover:scale-[1.05] transition-transform duration-200 ease-out">
                <div className="flex items-center gap-3">
                  <img src="/img/edu_pro1.png" alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold text-[#111827]">초보자를 위한 파이썬</div>
                    <div className="text-[12px] text-[#6B7280]">모듈: 객체 지향 프로그래밍</div>
                    <div className="mt-2"><ProgressBar value={75} color="#5B66FF" /></div>
                  </div>
                  <div className="ml-3 text-[13px] font-bold text-[#4B5563]">75%</div>
                </div>
              </div>
              {/* 카드 2 */}
              <div className="mt-3 rounded-xl border border-[#EEF0F4] p-4 hover:scale-[1.05] transition-transform duration-200 ease-out">
                <div className="flex items-center gap-3">
                  <img src="/img/edu_pro2.png" alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="text-[14px] font-semibold text-[#111827]">기계 학습 기초</div>
                    <div className="text-[12px] text-[#6B7280]">모듈: 비용 함수</div>
                    <div className="mt-2"><ProgressBar value={35} color="#22C55E" /></div>
                  </div>
                  <div className="ml-3 text-[13px] font-bold text-[#4B5563]">35%</div>
                </div>
              </div>
            </div>

            {/* 이번 주 목표 */}
            <div className="rounded-2xl bg-white p-5 shadow-[0_10px_32px_rgba(16,24,40,0.06)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[15px] font-extrabold text-[#0F172A]">이번 주 목표</h3>
                <span className="text-[12px] text-[#9CA3AF]">{new Date().toLocaleDateString("ko-KR")} 기준</span>
              </div>
              <div className="space-y-2">
                <GoalItem status="done" text="파이썬 OOP 모듈 완료" />
                <GoalItem status="progress" text="ML 실행 과제 프로젝트" />
                <GoalItem status="todo" text="코딩 챌린지 연습" />
              </div>
            </div>

            {/* AI 조언 (피그마 보라 그라데이션 + 아이콘 3종) */}
            <div className="rounded-2xl p-5 shadow-[0_10px_32px_rgba(16,24,40,0.06)] bg-gradient-to-tr from-[#6C63FF] via-[#7B60FF] to-[#A45DFF] text-white">
              <div className="flex items-center gap-2 text-[15px] font-extrabold">
                <img src="/img/robot.png" className="h-5 w-5" alt="" />
                <span>AI 조언</span>
              </div>

              <div className="mt-4 grid md:grid-cols-3 gap-3">
                <Advice
                  icon="/img/think.png"
                  title="데이터 구조에 집중"
                  desc="이해가 평면이 아닌 입체로 올라갑니다."
                />
                <Advice
                  icon="/img/grap.png"
                  title="최적의 학습 시간"
                  desc="오전 2시간에 집중도가 가장 높았어요."
                />
                <Advice
                  icon="/img/comu.png"
                  title="커뮤니티 참여"
                  desc="비슷한 진도의 학습자 그룹에 합류해 보세요."
                />
              </div>
            </div>
          </div>

          {/* 우측 */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <CalendarCard />

            {/* 빠른 통계 */}
            <div className="rounded-2xl bg-white p-5 shadow-[0_10px_32px_rgba(16,24,40,0.06)]">
              <h3 className="text-[15px] font-extrabold text-[#0F172A] mb-3">빠른 통계</h3>
              <Stat label="등록된 과정" value="3" />
              <Stat label="완료한 강의" value="47" />
              <Stat label="평균 점수" value="87%" />
              <div className="mt-2 flex items-center gap-2">
                <img src="/img/clock.png" className="h-4 w-4" alt="" />
                <span className="text-[13px] text-[#6B7280]">이번 주 8.5시간</span>
              </div>
            </div>

            {/* 다가오는 마감일 */}
            <div className="rounded-2xl bg-white p-5 shadow-[0_10px_32px_rgba(16,24,40,0.06)]">
              <h3 className="text-[15px] font-extrabold text-[#0F172A] mb-3">다가오는 마감일</h3>
              <DeadlineItem date="11/08" title="ML 프로젝트 제출" badge="전형 실험 과제" />
              <DeadlineItem date="11/12" title="파이썬 프로젝트" badge="기록부, 레포트 템플릿" color="bg-[#FEF3C7] text-[#B45309]" />
            </div>

            {/* 나의 강의 메모 */}
            <div className="rounded-2xl bg-white p-5 shadow-[0_10px_32px_rgba(16,24,40,0.06)]">
              <h3 className="text-[15px] font-extrabold text-[#0F172A] mb-3">나의 강의 메모</h3>
              <MemoItem color="bg-[#EEF1FF] text-[#4450FF]" title="철학의 이해" count="12" />
              <MemoItem color="bg-[#EAF7FF] text-[#2A86B6]" title="AI 리터러시" count="8" />
              <MemoItem color="bg-[#EAF9F0] text-[#1E824C]" title="시각디자인 리서치" count="5" />
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <footer className="mt-10 pt-10 border-t border-[#EDF0F4] text-[13px] text-[#6B7280]">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img src="/img/main_logo.png" alt="" className="h-6 mb-3" />
              <p>AI 기반 교육으로 전 세계 학습자들에게 맞춤형 학습을 제공합니다.</p>
            </div>
            <div>
              <h4 className="font-semibold text-[#0F172A] mb-2">플랫폼</h4>
              <ul className="space-y-1">
                <li>강좌</li>
                <li>AI 튜터</li>
                <li>진행 상황 추적</li>
                <li>인증서</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#0F172A] mb-2">자료</h4>
              <ul className="space-y-1">
                <li>도움 센터</li>
                <li>커뮤니티</li>
                <li>블로그</li>
                <li>API 문서</li>
              </ul>
            </div>
          </div>
          <p className="text-center mt-8 text-[12px] opacity-70">
            © 2025 EDUO. 모든 권리 보유. 인공지능을 통한 교육 혁신.
          </p>
        </footer>
      </main>
    </div>
  );
}

/* ====== 하위 요소 ====== */
function GoalItem({ status = "todo", text }) {
  const tone =
    status === "done"
      ? "bg-[#E7F7EF] text-[#18794E]"
      : status === "progress"
      ? "bg-[#EBF2FF] text-[#3B66FF]"
      : "bg-[#F3F4F6] text-[#6B7280]";
  const label = status === "done" ? "완료" : status === "progress" ? "진행중" : "대기 중";

  return (
    <div className="rounded-xl border border-[#EEF0F4] px-4 py-3 flex items-center justify-between hover:scale-[1.05] transition-transform duration-200 ease-out">
      <div className="flex items-center gap-2">
        <Chip className={tone}>{label}</Chip>
        <span className="text-[14px] text-[#111827]">{text}</span>
      </div>
      <button className="text-[12px] text-[#9CA3AF] hover:text-[#6B7280]">…</button>
    </div>
  );
}

function Advice({ icon, title, desc }) {
  return (
    <div className="rounded-xl bg-white/8 p-4 hover:scale-[1.05] transition-transform duration-200 ease-out">
      <div className="flex items-center gap-2">
        <img src={icon} alt="" className="h-5 w-5" />
        <div className="font-semibold">{title}</div>
      </div>
      <div className="mt-2 text-sm opacity-90">{desc}</div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex items-center justify-between text-[13px] py-1.5">
      <span className="text-[#6B7280]">{label}</span>
      <span className="font-semibold text-[#0F172A]">{value}</span>
    </div>
  );
}

function DeadlineItem({ date, title, badge, color = "bg-[#EEF7FF] text-[#2D6ADF]" }) {
  return (
    <div className="rounded-xl border border-[#EEF0F4] p-4 mb-3 hover:scale-[1.05] transition-transform duration-200 ease-out">
      <div className="text-[12px] text-[#9CA3AF] mb-1">{date}</div>
      <div className="font-semibold text-[#111827]">{title}</div>
      <Chip className={`mt-2 ${color}`}>{badge}</Chip>
    </div>
  );
}

function MemoItem({ title, count, color }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#EEF0F4] px-4 py-3 mb-2 hover:scale-[1.05] transition-transform duration-200 ease-out">
      <Chip className={color}>{title}</Chip>
      <div className="text-[12px] text-[#9CA3AF]">{count}</div>
    </div>
  );
}
