import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const Item = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-lg hover:bg-slate-100 ${
          isActive ? "text-primary" : "text-slate-700"
        }`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-50 border-b border-skin-ring">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/img/main_logo.png"
            alt="EDUO"
            className="h-8 sm:h-10 w-auto object-contain"
            draggable={false}
          />
          <span className="sr-only">EDUO</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Item to="/mypage">마이페이지</Item>
          <Item to="/search">전체강좌</Item>
          <Item to="/course-eval">강의평가</Item> {/* ✅ 추가 */}
          <Item to="/community">커뮤니티</Item>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 rounded-full bg-slate-50 border border-skin-ring px-3 py-2">
            <img src="/img/search.png" className="w-4 h-4 opacity-60" alt="" />
            <input
              placeholder="강의 검색"
              className="bg-transparent outline-none text-sm w-56"
            />
          </div>
          <Link to="/login" className="btn btn-ghost">
            로그인
          </Link>
          <Link to="/register" className="btn btn-primary">
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
}
