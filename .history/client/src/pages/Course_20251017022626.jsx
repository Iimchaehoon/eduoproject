import { Link, useParams } from "react-router-dom";
import SideChatTabs from "../components/SideChatTabs.jsx";

export default function Course(){
  const { slug } = useParams();

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-8 grid lg:grid-cols-[1fr_360px] gap-6">
      {/* 왼쪽 */}
      <section>
        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="p-4 border-b">
            <div className="text-xs text-slate-500">컴퓨터공학 · 3강 · 15분 · 1,245명 수강중</div>
            <h1 className="text-xl font-bold mt-1">파이썬 객체지향 프로그래밍</h1>
          </div>

          {/* 플레이어 자리 (버튼 포함) */}
          <div className="p-4">
            <div className="bg-[#0e1726] rounded-xl p-5">
              <div className="h-[320px] md:h-[360px] w-full grid place-items-center text-white">
                <button className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition grid place-items-center text-2xl">▶</button>
              </div>
              <div className="mt-3 flex items-center justify-between text-white/80 text-sm">
                <div className="flex items-center gap-3">
                  <button>⏮</button><button>⏯</button><button>⏭</button>
                  <div className="w-72 max-w-[40vw] h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-white/40" />
                  </div>
                </div>
                <div>5:23 / 15:47</div>
              </div>
            </div>
          </div>
        </div>

        {/* 핵심 개념 */}
        <div className="mt-6 bg-white rounded-2xl border">
          <div className="p-4 pb-0 font-semibold">핵심 개념</div>
          <div className="p-4 space-y-4">
            <div className="rounded-xl border bg-[#F1F6FF] p-3">
              <div className="text-sm text-slate-700 mb-2">🕘 09:12 · <span className="text-[#2C6BFF]">클래스 정의</span></div>
              <div className="bg-[#0e1726] text-white rounded-xl p-4 text-sm overflow-x-auto">
                <pre>{`class Student:
    def __init__(self, name, age):
        self.name = name
        self.age  = age
    def study(self):
        return f"{'{'}self.name{'}'}(이/가) 공부를 합니다"`}</pre>
              </div>
            </div>

            <div className="rounded-xl border bg-[#F3FBF7] p-3">
              <div className="text-sm text-slate-700 mb-2">🕒 15:52 · <span className="text-green-700">객체 생성</span></div>
              <div className="bg-[#0e1726] text-white rounded-xl p-4 text-sm overflow-x-auto">
                <pre>{`student1 = Student("김학생", 20)
student2 = Student("박학생", 22)
print(student1.study())`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* 라우트에 맞춰 경로만 확인해서 바꾸기 */}
        <Link to={`/courseeval/${slug ?? "mock-1-1"}`} className="mt-6 inline-block px-4 h-10 rounded-lg bg-[#2C6BFF] text-white">강의평가로 가기</Link>
      </section>

      {/* 오른쪽 탭 */}
      <aside className="h-full">
        <SideChatTabs contextText="클래스/객체/메서드/생성자" />
      </aside>
    </div>
  );
}
