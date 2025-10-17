export default function Register(){
  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <h1 className="text-center text-2xl font-bold mb-8">회원가입</h1>
      <div className="card p-8">
        <div className="grid md:grid-cols-2 gap-4">
          <input className="pill" placeholder="이름" />
          <div className="flex gap-2"><input className="pill flex-1" placeholder="아이디" /><button className="btn btn-ghost">중복확인</button></div>
          <input className="pill" placeholder="비밀번호" type="password" />
          <input className="pill" placeholder="이메일" />
          <div className="grid grid-cols-2 gap-2"><input className="pill" placeholder="출생년도" /><select className="pill"><option>성별</option><option>남</option><option>여</option></select></div>
          <div className="grid grid-cols-3 gap-2"><select className="pill"><option>전공</option></select><select className="pill"><option>관심분야</option></select><select className="pill"><option>희망직종</option></select></div>
        </div>
        <div className="mt-6 text-slate-500 text-sm">개인정보 수집 · 이용에 동의합니다.</div>
        <button className="btn btn-primary w-full mt-4">회원가입</button>
      </div>
    </div>
  )
}
