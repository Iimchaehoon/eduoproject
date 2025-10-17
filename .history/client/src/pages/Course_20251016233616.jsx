import { useMemo } from "react";
import SideChatTabs from "../components/SideChatTabs.jsx"; // ← AI 코치/토론 게시판 탭

export default function Course() {
  // 👉 AI에게 건네줄 컨텍스트(강의 요약/코드/핵심개념). 필요하면 더 붙이세요.
  const lessonContext = useMemo(
    () =>
      `
[강의 제목] 파이썬 객체지향 프로그래밍
[주요 키워드] 클래스, 객체, 메서드, 생성자(__init__), 인스턴스

[핵심 개념]
- 클래스는 객체를 생성하기 위한 설계도입니다.
- __init__(self, ...)는 생성자로서 인스턴스 초기화를 담당합니다.
- 메서드는 클래스 내부 함수로, self로 인스턴스 상태를 다룹니다.

[예시 코드 1: 클래스 정의]
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def study(self):
        return f"{'{'}self.name{'}'}(이/가) 공부를 합니다"

[예시 코드 2: 객체 생성]
student1 = Student("김학생", 20)
student2 = Student("박학생", 22)
print(student1.study())

[참고 질문]
- 클래스와 객체의 차이?
- 설계(클래스 분리/책임 배분) 시 주의할 점?
`,
    []
  );

  return (
    <div className="max-w-6xl mx-auto px-5 py-8 grid md:grid-cols-[1fr_360px] gap-6">
      {/* --------- 좌측: 강의 본문(기존 UI 유지) --------- */}
      <section className="card p-0 overflow-hidden">
        {/* 헤더 */}
        <div className="p-5 border-b border-skin-ring">
          <div className="text-sm text-slate-500">
            컴퓨터공학 · 3강 · 15분 · 1,245명 수강중
          </div>
          <h1 className="text-xl font-bold mt-1">파이썬 객체지향 프로그래밍</h1>
        </div>

        {/* 플레이어 자리 */}
        <div className="bg-slate-900 h-[380px] flex items-center justify-center">
          <button className="w-20 h-20 rounded-full bg-primary text-white text-2xl shadow-soft">
            ▶
          </button>
        </div>

        {/* 핵심 개념 */}
        <div className="p-5">
          <h3 className="font-semibold mb-3">핵심 개념</h3>

          <div className="space-y-4">
            {/* 카드 1 */}
            <div className="card border border-skin-ring p-4">
              <div className="text-slate-500 text-sm mb-1">
                09:12 · <span className="text-primary">클래스 정의</span>
              </div>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-sm">
{`class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def study(self):
        return f"{'{'}self.name{'}'}(이/가) 공부를 합니다"`}
              </pre>
            </div>

            {/* 카드 2 */}
            <div className="card border border-green-100 p-4">
              <div className="text-slate-500 text-sm mb-1">
                15:52 · <span className="text-green-600">객체 생성</span>
              </div>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-sm">
{`student1 = Student("김학생", 20)
student2 = Student("박학생", 22)
print(student1.study())`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* --------- 우측: 피그마형 탭( AI 코치 | 토론 게시판 ) --------- */}
      <aside className="p-0">
        <SideChatTabs contextText={lessonContext} />
      </aside>
    </div>
  );
}
