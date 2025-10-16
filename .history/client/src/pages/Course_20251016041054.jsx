
import { useState } from 'react'
import { api } from '../utils/api'
import { useParams } from 'react-router-dom'
export default function Course(){
  const { id } = useParams()
  const [chat, setChat] = useState('')
  const [answer, setAnswer] = useState('')
  const [summary, setSummary] = useState('')
  const [quiz, setQuiz] = useState([])
  const ask = async()=>{ const r = await api.post('/ai/chat', {message: chat, context:{courseId:id}}); setAnswer(r.data.text) }
  const makeSummary = async()=>{ const r = await api.post('/ai/summary', {transcript:'예시 자막'}); setSummary(r.data.summary) }
  const makeQuiz = async()=>{ const r = await api.post('/ai/quiz', {topic:'파이썬', count:3}); setQuiz(r.data.quiz||[]) }
  return (<main className="container-6xl py-8 grid lg:grid-cols-3 gap-6">
    <section className="lg:col-span-2 card">
      <div className="aspect-video bg-black/80 rounded-t-xl overflow-hidden flex items-center justify-center">
        <a className="text-white" href="https://www.youtube.com/watch?v=PRz4NVM3CVw&t=1s" target="_blank">강의 영상 보기 (유튜브)</a>
      </div>
      <div className="p-6"><h2 className="font-semibold text-lg">핵심 개념</h2>
        <div className="mt-3 grid gap-3"><div className="card p-4 bg-blue-50/60">클래스 정의 …</div><div className="card p-4 bg-green-50/60">객체 생성 …</div></div>
      </div>
    </section>
    <aside className="card p-4">
      <h3 className="font-semibold mb-2">AI 학습코치</h3>
      <div className="space-y-2">
        <textarea className="w-full h-24 border rounded-md p-2" placeholder="질문을 입력하세요" value={chat} onChange={e=>setChat(e.target.value)}></textarea>
        <button className="btn-primary w-full" onClick={ask}>질문하기</button>
        <div className="min-h-20 whitespace-pre-line text-sm text-gray-800">{answer}</div>
        <hr className="my-3"/>
        <button className="btn w-full border" onClick={makeSummary}>요약 생성</button>
        <div className="mt-2 text-sm whitespace-pre-line">{summary}</div>
        <hr className="my-3"/>
        <button className="btn w-full border" onClick={makeQuiz}>퀴즈 생성</button>
        <div className="mt-2 space-y-2">
          {quiz.map((q,i)=>(<div key={i} className="border rounded p-2">
            <div className="font-medium">{q.q}</div>
            <ul className="text-sm list-disc ml-5">{q.choices?.map((c,ci)=><li key={ci}>{c}</li>)}</ul>
            <div className="text-xs text-gray-500 mt-1">정답: {q.answerIndex!==undefined? String.fromCharCode(65+q.answerIndex):'-'} / {q.explain}</div>
          </div>))}
        </div>
      </div>
    </aside>
  </main>)
}
