import { Link, useParams } from "react-router-dom";
import SideChatTabs from "../components/SideChatTabs.jsx";
import { useMemo } from "react";

export default function Course() {
  const { slug } = useParams();

  const context = useMemo(
    () => `
[강의제목] 파이썬 객체지향 프로그래밍
[핵심] 클래스, 객체, 메서드, 생성자(__init__), 인스턴스
[샘플코드]
class Student:
    def __init__(self, name, age):
        self.name = name; self.age = age
    def study(self):
        return f"{'{'}self.name{'}'}(이/가) 공부를 합니다"
student1 = Student("김학생", 20)
print(student1.study())
`, 
    []
  );

  return (
    <div className="max-w-6xl mx-auto px-5 py-6 grid md:grid-cols-[1fr_360px] gap-6">
      {/* 좌측 */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <div className="text-sm text-slate-500">컴퓨터공학 · 3강 · 15분 · 1,245명 수강중</div>
          <h1 className="text-xl font-bold mt-1">파이썬 객체지향 프로그래밍</h1>
        </div>

        {/* 플레이어 */}
        <div className="bg-slate-900 h-[380px] grid place-items-center relative">
          <button className="w-20 h-20 rounded-full bg-primary text-white text-3xl shadow-lg">▶</button>
          <div className="absolute bottom-4 left-0 right-0 px-5">
            <div className="flex items-center gap-3 text-white/80">
              <button>⏮</button>
              <button>⏯</button>
              <button>⏭</button>
              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-[35%] bg-white/70" />
              </div>
              <div className="text-xs">5:23 / 15:47</div>
            </div>
          </div>
        </div>

        {/* 본문 */}
        <div className="p-5 space-y-4">
          <h3 className="font-semibold">핵심 개념</h3>

          <div className="rounded-xl border bg-white p-4">
            <div className="text-slate-500 text-sm mb-2">
              09:12 · <span className="text-indigo-600">클래스 정의</span>
            </div>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">{`class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def study(self):
        return f"{'{'}self.name{'}'}(이/가) 공부를 합니다"`}</pre>
          </div>

          <div className="rounded-xl border bg-white p-4">
            <div className="text-slate-500 text-sm mb-2">
              15:52 · <span className="text-emerald-600">객체 생성</span>
            </div>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">{`student1 = Student("김학생", 20)
student2 = Student("박학생", 22)
print(student1.study())`}</pre>
          </div>

          <Link to={`/course/${slug}/review`} className="btn btn-primary mt-2 w-fit">강의평가로 가기</Link>
        </div>
      </section>

      {/* 우측 */}
      <aside className="p-0">
        <SideChatTabs contextText={context} />
      </aside>
    </div>
  );
}
