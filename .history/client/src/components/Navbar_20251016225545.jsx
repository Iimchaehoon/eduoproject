// /src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const nav = useNavigate();
  const [kw, setKw] = useState("");

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

  const goSearch = () => {
    const q = kw.trim();
    if (!q) return;
    // 전체강좌 페이지(검색 결과)로 이동
    nav(`/search?q=${encodeURIComponent(q)}&page=1&size=9&sort=latest`);
  };

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-50 border-b border-skin-ring">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center gap-6">
        {/* 로고: 비율 깨짐 방지 (w-auto 유지) */}
        <Link to="/" className="flex items-center gap-2" aria-label="EDUO 홈으로">
          <img
            src="/img/main_logo.png"
            alt="EDUO"
            className="h-9 sm:h-10 w-auto object-contain"
            draggable={false}
          />
          <span className="sr-only">EDUO</span>
        </Link>

        {/* GNB */}
        <nav className="hidden md:flex items-center gap-2">
          <Item to="/mypage">마이페이지</Item>
          <Item to="/search">전체강좌</Item>
          <Item to="/reviews">강의평가</Item> {/* ✅ 신규 탭 */}
          <Item to="/community">커뮤니티</Item>
        </nav>

        {/* 오른쪽 영역 */}
        <div className="ml-auto flex items-center gap-3">
          {/* 검색 박스 */}
          <div className="hidden md:flex items-center gap-2 rounded-full bg-slate-50 border border-skin-ring px-3 py-2">
            <button
              onClick={goSearch}
              className="shrink-0"
              aria-label="검색 실행"
              type="button"
            >
              <img src="/img/search.png" className="w-4 h-4 opacity-60" alt="" />
            </button>
            <input
              placeholder="강의 검색"
              className="bg-transparent outline-none text-sm w-56"
              value={kw}
              onChange={(e) => setKw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && goSearch()}
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
