import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import SideChatTabs from "../components/SideChatTabs.jsx";

export default function Course() {
  const { slug } = useParams();

  // AI 코치에 제공할 컨텍스트 (요약/코드/키워드)
  const lessonContext = useMemo(
    () => `
[강의] 파이썬 객체지향 프로그래밍
- 클래스, 객체, 메서드, 생성자(__init__), 인스턴스
예시:
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def study(self):
        return f"{'{'}self.name{'}'}(이/가) 공부를 합니다"
student1 = Student("김학생", 20)
print(student1.study())
`, []
  );

  return (
    <div className="max-w-6xl mx-auto px-5 py-8 grid md:grid-cols-[1fr_360px] gap-6">
      <section className="card p-0 overflow-hidden">
        <div className="p-5 border-b border-skin-ring">
          <div className="text-sm text-slate-500">
            컴퓨터공학 · 3강 · 15분 · 1,245명 수강중
          </div>
          <h1 className="text-xl font-bold mt-1">파이썬 객체지향 프로그래밍</h1>
        </div>

        <div className="bg-slate-900 h-[380px] flex items-center justify-center text-white">
          ▶ 플레이어 자리
        </div>

        <div className="p-5">
          <h3 className="font-semibold mb-3">핵심 개념</h3>

          <div className="space-y-4">
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

          <div className="mt-6">
            <Link to="/course-eval" className="btn btn-primary">강의평가로 가기</Link>
          </div>
        </div>
      </section>

      <aside className="p-0">
        <SideChatTabs contextText={lessonContext} />
      </aside>
    </div>
  );
}
