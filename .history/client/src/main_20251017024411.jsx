// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 레이아웃 & 페이지
import App from "./pages/App.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Course from "./pages/Course.jsx";
import CourseEval from "./pages/CourseEval.jsx";   // ← 강의평가
import CourseReview from "./pages/CourseReview.jsx";
import Community from "./pages/Community.jsx";
import MyPage from "./pages/MyPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// 간단한 에러 엘리먼트
function ErrorPage() {
  return (
    <div style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ fontSize: 20, fontWeight: 800 }}>페이지를 찾을 수 없어요</h1>
      <p style={{ marginTop: 8, color: "#6B7280" }}>
        주소가 변경되었거나 잘못 입력했을 수 있어요. 상단 네비게이션을 이용해 이동해 주세요.
      </p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, // ← 기본 에러 화면
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "community", element: <Community /> },
      { path: "mypage", element: <MyPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // 강의 상세 + 강의평가
      { path: "course/:slug", element: <Course /> },
      { path: "course/:slug/eval", element: <CourseEval /> },   // ← 반드시 추가
      { path: "course/:slug/review", element: <CourseReview /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
