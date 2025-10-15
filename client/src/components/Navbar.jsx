import { Link } from 'react-router-dom'
import { resolveImg } from '../utils/imgUtil'

export default function Navbar(){
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="container-6xl h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img src={resolveImg('main_logo')} alt="EDUO" className="h-7 w-auto" />
          <span>EDUO</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <Link to="/search" className="hover:text-indigo-600">전체강좌</Link>
          <Link to="/community" className="hover:text-indigo-600">커뮤니티</Link>
          <Link to="/mypage" className="hover:text-indigo-600">마이페이지</Link>
        </nav>
        <div className="flex items-center gap-2">
          <input
            className="hidden md:block w-72 h-9 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="강의 검색"
          />
          <Link to="/login" className="ml-2 btn btn-primary h-9">로그인</Link>
        </div>
      </div>
    </header>
  )
}
