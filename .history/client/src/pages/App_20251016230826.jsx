// src/pages/App.jsx
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function App() {
  const loc = useLocation();

  // 라우트가 바뀔 때마다 최상단으로 스크롤
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [loc.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <Navbar />
      <main className="flex-1">
        {/* 자식 라우트가 바뀔 때 재마운트되도록 key 유지 */}
        <Outlet key={loc.key} />
      </main>
      <Footer />
    </div>
  );
}
