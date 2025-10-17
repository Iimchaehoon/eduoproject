import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideChatTabs from "../components/SideChatTabs.jsx";

export default function Course(){
  const { slug } = useParams();
  const nav = useNavigate();

  const lessonContext = useMemo(()=>`
[강의 제목] 파이썬 객체지향 프로그래밍
[핵심] 클래스, 객체, 메서드, __init__ 생성자
`,[]);

  return (
    <div className="max-w-6xl mx-auto px-5 py-8 grid md:grid-cols-[1fr_360px] gap-6">
      <section className="card p-0 overflow-hidden bg-white rounded-2xl border">
        <div className="p-5 border-b">
          <div className="text-sm text-slate-500">컴퓨터공학 · 3강 · 15분 · 1,245명 수강중</div>
          <h1 className="text-xl font-bold mt-1">파이썬 객체지향 프로그래밍</h1>
        </div>

        <div className="bg-[#0D1626] h-[380px] grid place-items-center text-white">
          ▶ 플레이어 자리
        </div>

        <div className="p-5">
          <h3 className="font-semibold mb-3">핵심 개념</h3>
          <div className="space-y-4">
            <div className="rounded-xl border p-4">
              <div className="text-slate-500 text-sm mb-1">09:12 · <span className="text-[#5B66FF]">클래스 정의</span></div>
              <pre className="bg-[#0D1626] text-slate-100 p-4 rounded-xl overflow-x-auto text-sm">{`class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def study(self):
        return f"{'{'}self.name{'}'}(이/가) 공부를 합니다"`}</pre>
            </div>
            <div className="rounded-xl border p-4 bg-green-50 border-green-100">
              <div className="text-slate-500 text-sm mb-1">15:52 · <span className="text-green-600">객체 생성</span></div>
              <pre className="bg-[#0D1626] text-slate-100 p-4 rounded-xl overflow-x-auto text-sm">{`student1 = Student("김학생", 20)
student2 = Student("박학생", 22)
print(student1.study())`}</pre>
            </div>
          </div>

          <button
            className="mt-5 px-4 h-10 rounded-lg bg-[#2C6BFF] text-white text-sm"
            onClick={()=>nav(`/course/${slug}/eval`)}
          >강의평가로 가기</button>
        </div>
      </section>

      <aside className="p-0"><SideChatTabs contextText={lessonContext}/></aside>
    </div>
  );
}
