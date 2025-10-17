import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 레이아웃 & 페이지
import App from "./pages/App.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Course from "./pages/Course.jsx";
import CourseReview from "./pages/CourseReview.jsx";

// ⚠ 스타일 파일이 없으면 이 줄은 잠시 주석처리하세요.
// import "./styles/index.css";

const rootEl = document.getElementById("root");
createRoot(rootEl).render(
  <BrowserRouter>
    <Routes>
      {/* 공통 레이아웃 */}
      <Route element={<App />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="course/:slug" element={<Course />} />
        <Route path="course/:slug/review" element={<CourseReview />} />
        {/* 안전한 기본값 */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
