// src/pages/Course.jsx
import { useState } from 'react'
import { reply } from '../components/chatbot.js'

export default function Course(){
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState([
    {who:'bot', text:'안녕하세요, 지원님! 이번 강의와 관련된 질문이 있다면 언제든지 물어보세요. 더 효율적인 공부가 되도록 AI 학습코치가 도와드릴게요!'},
    {who:'bot', text:'클래스와 객체의 차이가 뭔가요?'},
    {who:'bot', text:'활용한 문제풀이에 앞서 실습팁을 알려드릴까요?'},
  ])

  const send = () => {
    if(!input.trim()) return
    const userMsg = {who:'me', text: input.trim()}
    const botMsg = {who:'bot', text: reply(input.trim())}
    setMsgs(m => [...m, userMsg, botMsg]); 
    setInput('')
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-8 grid md:grid-cols-[1fr_360px] gap-6">
      {/* 강의 본문 */}
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
      </section>

      {/* 오른쪽: AI 코치 (원래 간단 버전) */}
      <aside className="card p-0 overflow-hidden">
        <div className="border-b border-skin-ring px-5 py-3 flex gap-3">
          <button className="pill bg-indigo-50 border-indigo-100 text-indigo-700">AI 코치</button>
          <button className="pill">토론 게시판</button>
        </div>

        <div className="p-4 space-y-3 h-[540px] overflow-y-auto">
          {msgs.map((m,idx)=> (
            <div key={idx} className={m.who==='bot'?'flex gap-3':'flex gap-3 justify-end'}>
              {m.who==='bot' && <div className="w-8 h-8 rounded-full bg-primary/10 grid place-items-center">🤖</div>}
              <div className={"rounded-2xl px-3 py-2 text-sm " + (m.who==='bot'?'bg-slate-100':'bg-primary text-white max-w-[70%]')}>
                <pre className="whitespace-pre-wrap">{m.text}</pre>
              </div>
              {m.who==='me' && <div className="w-8 h-8 rounded-full bg-slate-200 grid place-items-center">🙂</div>}
            </div>
          ))}
        </div>

        <div className="border-t border-skin-ring p-3 flex items-center gap-2">
          <input
            className="flex-1 pill"
            placeholder="궁금한 점을 물어보세요..."
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={(e)=> e.key==='Enter' && send()}
          />
          <button onClick={send} className="btn btn-primary">전송</button>
        </div>
      </aside>
    </div>
  )
}
