import { useMemo } from "react";
import SideChatTabs from "../components/sidechat/SideChatTabs.jsx";

export default function Course() {
  const lessonContext = useMemo(
    () => `
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
`,
    []
  );

  return (
    <div className="max-w-6xl mx-auto px-5 py-8 grid md:grid-cols-[1fr_360px] gap-6">
      {/* 좌측: 강의 본문 */}
      <section className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
        <div className="p-5 border-b border-slate-200">
          <div className="text-sm text-slate-500">컴퓨터공학 · 3강 · 15분 · 1,245명 수강중</div>
          <h1 className="text-xl font-bold mt-1">파이썬 객체지향 프로그래밍</h1>
        </div>

        <div className="bg-slate-900 h-[380px] flex items-center justify-center">
          <button className="w-20 h-20 rounded-full bg-[#2C6BFF] text-white text-2xl shadow-soft">▶</button>
        </div>

        <div className="p-5">
          <h3 className="font-semibold mb-3">핵심 개념</h3>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-slate-500 text-sm mb-1">
                09:12 · <span className="text-[#2C6BFF]">클래스 정의</span>
              </div>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-sm">{`class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def study(self):
        return f"{'{'}self.name{'}'}(이/가) 공부를 합니다"`}</pre>
            </div>

            <div className="rounded-xl border border-green-100 p-4 bg-green-50/40">
              <div className="text-slate-500 text-sm mb-1">
                15:52 · <span className="text-green-600">객체 생성</span>
              </div>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-sm">{`student1 = Student("김학생", 20)
student2 = Student("박학생", 22)
print(student1.study())`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* 우측: AI 코치 / 토론 탭 */}
      <aside>
        <SideChatTabs contextText={lessonContext} />
      </aside>
    </div>
  );
}
