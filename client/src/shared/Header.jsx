import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const nav = useNavigate();
  const loc = useLocation();

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
      <div className="container-xl h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/img/main_logo.png" alt="EDUO" className="h-7" />
            <span className="font-semibold text-lg">EDUO</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-ink-700">
            <Link to="/search" className="hover:text-ink-900">전체강좌</Link>
            <Link to="/mypage" className="hover:text-ink-900">마이페이지</Link>
            <Link to="/community" className="hover:text-ink-900">커뮤니티</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* 상단 작은 검색은 유지, 메인 대형 검색은 Hero에서 */}
          <input
            type="text"
            placeholder="강의 검색"
            className="hidden md:block w-64 h-10 rounded-lg border border-gray-200 px-3 bg-gray-50"
            onKeyDown={(e) => { if (e.key === "Enter") nav(`/search?q=${encodeURIComponent(e.currentTarget.value)}`);}}
          />
          <Link to="/login" className="btn-ghost">로그인</Link>
        </div>
      </div>
    </header>
  );
}
