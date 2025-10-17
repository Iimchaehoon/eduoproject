// client/src/pages/App.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* 자식 라우트가 여기 렌더링 됩니다 */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
