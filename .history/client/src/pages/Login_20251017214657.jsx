export default function Login(){
  return (
    <div className="max-w-xl mx-auto px-5 py-16">
      <h1 className="text-center text-2xl font-bold mb-8">로그인</h1>
      <div className="card p-8 space-y-4">
        <input className="pill w-full" placeholder="아이디를 입력해주세요" />
        <input className="pill w-full" type="password" placeholder="비밀번호를 입력해주세요" />
        <button className="btn btn-ghost w-full">로그인</button>
        <button className="btn btn-primary w-full">회원가입</button>
      </div>
      
    </div>
  )
}
