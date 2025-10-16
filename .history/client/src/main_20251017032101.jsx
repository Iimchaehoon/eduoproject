import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 전역 스타일
import "./styles/index.css";

// 레이아웃
import App from "./pages/App.jsx";

// 페이지
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import { Course } from "./pages/Course.jsx";
import CourseEval from "./pages/CourseEval.jsx";
import CourseReview from "./pages/CourseReview.jsx";
import Community from "./pages/Community.jsx";
import MyPage from "./pages/MyPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// 심플 에러 핸들러
function ErrorFallback() {
  return (
    <div className="min-h-[50vh] grid place-items-center">
      <div className="text-center">
        <div className="text-2xl font-semibold">페이지를 찾을 수 없어요</div>
        <a href="/" className="btn-primary mt-4 inline-flex">홈으로 가기</a>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorFallback />,
    children: [
      { index: true, element: <Home /> },

      // 전체 강좌
      { path: "search", element: <Search /> },

      // 강의 상세 (플레이어 포함)
      { path: "course/:slug", element: <Course /> },

      // 강의 평가 / 리뷰
      { path: "course-eval", element: <CourseEval /> },
      { path: "course-review", element: <CourseReview /> },

      // 기타
      { path: "community", element: <Community /> },
      { path: "mypage", element: <MyPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  // 와일드카드 → 에러
  { path: "*", element: <ErrorFallback /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
