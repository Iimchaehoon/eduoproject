// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./pages/App.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import MyPage from "./pages/MyPage.jsx";
import Community from "./pages/Community.jsx";
import Course from "./pages/Course.jsx";
import CourseEval from "./pages/CourseEval.jsx";      // (쓰면 라우팅 추가)
import CourseReview from "./pages/CourseReview.jsx";  // ✅ 강의평가 페이지
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import "./styles/index.css"; // 전역 스타일 사용 중이면 유지

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <Search /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/community", element: <Community /> },
      { path: "/course/:slug", element: <Course /> },   // 상세 강의 페이지
      { path: "/reviews", element: <CourseReview /> },  // ✅ 강의평가 (네비 탭과 연결)
      // 필요 시: { path: "/courseeval", element: <CourseEval /> },

      // 인증
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
