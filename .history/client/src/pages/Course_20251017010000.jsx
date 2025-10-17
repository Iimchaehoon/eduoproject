// src/pages/Course.jsx
import { useMemo } from "react";
import SideChatTabs from "../components/SideChatTabs.jsx";

export default function Course() {
  const lessonContext = useMemo(
    () => `
[강의 제목] 파이썬 객체지향 프로그래밍
[키워드] 클래스, 객체, 메서드, 생성자(__init__), 인스턴스
class Student:
    def __init__(self, name, age):
        self.name=name; self.age=age
    def study(self):
        return f"{'{'}self.name{'}'}(이/가) 공부를 합니다"
student1 = Student("김학생", 20)
student2 = Student("박학생", 22)
`, []
  );

  return (
    <div className="max-w-6xl mx-auto px-5 py-8 grid md:grid-cols-[1fr_360px] gap-6">
      <section className="card p-0 overflow-hidden">
        <div className="p-5 border-b border-skin-ring">
          <div className="text-sm text-slate-500">컴퓨터공학 · 3강 · 15분 · 1,245명 수강중</div>
          <h1 className="text-xl font-bold mt-1">파이썬 객체지향 프로그래밍</h1>
        </div>

        <div className="bg-slate-900 h-[380px] flex items-center justify-center">
          <button className="w-20 h-20 rounded-full bg-primary text-white text-2xl shadow-soft">▶</button>
        </div>

        <div className="p-5">
          <h3 className="font-semibold mb-3">핵심 개념</h3>

          <div className="space-y-4">
            <div className="card border border-skin-ring p-4">
              <div className="text-slate-500 text-sm mb-1">09:12 · <span className="text-primary">클래스 정의</span></div>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-sm">{`class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def study(self):
        return f"{'{'}self.name{'}'}(이/가) 공부를 합니다"`}</pre>
            </div>

            <div className="card border border-green-100 p-4">
              <div className="text-slate-500 text-sm mb-1">15:52 · <span className="text-green-600">객체 생성</span></div>
              <pre className="bg-slate-900 text-slate-100 p-4 rounded-xl overflow-x-auto text-sm">{`student1 = Student("김학생", 20)
student2 = Student("박학생", 22)
print(student1.study())`}</pre>
            </div>
          </div>
        </div>

        <div className="px-5 pb-5">
          <div className="mt-4 flex gap-2">
            <button className="pill bg-indigo-50 border-indigo-100 text-indigo-700">더 많은 예시</button>
            <button className="pill">심화 설명</button>
            <button className="pill">코딩 실습</button>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="px-4 h-10 rounded-lg bg-rose-400 text-white hover:brightness-110">수업 종료</button>
          </div>
        </div>
      </section>

      <aside className="p-0">
        <SideChatTabs contextText={lessonContext}/>
      </aside>
    </div>
  );
}
