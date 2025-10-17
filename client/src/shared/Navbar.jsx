
import { Link, useNavigate } from 'react-router-dom'
export default function Navbar(){
  const nav = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="container-6xl h-14 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <img src="/img/main_logo.png" className="h-6" alt="logo"/><span>EDUO</span>
        </Link>
        <nav className="hidden sm:flex gap-6 text-gray-700">
          <Link to="/search">전체강좌</Link><Link to="/mypage">마이페이지</Link>
        </nav>
        <div className="ml-auto flex gap-2">
          <input placeholder="강의 검색" className="h-9 w-64 rounded-md border px-3"/>
          <button onClick={()=>nav('/search')} className="btn-primary h-9">검색</button>
          <Link to="/login" className="btn h-9 border">로그인</Link>
        </div>
      </div>
    </header>
  )
}
