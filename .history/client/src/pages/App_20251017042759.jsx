import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

import Home from "./Home.jsx";
import Search from "./Search.jsx";
import Course from "./Course.jsx";
import CourseEval from "./CourseEval.jsx";
import CourseReview from "./CourseReview.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import MyPage from "./MyPage.jsx";
import Community from "./Community.jsx";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* 이 안에 자식 라우트가 렌더링됩니다 */}
        <Routes>
          {/* ✅ 루트(index) 라우트 */}
          <Route index element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/community" element={<Community />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />

          {/* 강의 */}
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/course/:courseId/eval" element={<CourseEval />} />
          <Route path="/course/:courseId/review" element={<CourseReview />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-24 text-center">
      <div className="text-2xl font-bold">페이지를 찾을 수 없어요</div>
      <a href="/" className="btn btn-primary mt-5">홈으로 가기</a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* 최상위에서 Layout 아래에 index 라우트가 홈을 렌더링합니다 */}
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}
