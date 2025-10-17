// client/src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/tailwind.css";

import App from "./pages/App.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Community from "./pages/Community.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyPage from "./pages/MyPage.jsx";
import Course from "./pages/Course.jsx";
import CourseEval from "./pages/CourseEval.jsx";
import CourseReview from "./pages/CourseReview.jsx";

// 간단한 NotFound 컴포넌트(원하면 별도 파일로 빼도 됨)
const NotFound = () => (
  <div className="max-w-6xl mx-auto px-5 py-24 text-center">
    <div className="text-2xl font-bold">페이지를 찾을 수 없어요</div>
    <a href="/" className="btn btn-primary mt-5">홈으로 가기</a>
  </div>
);

const router = createBrowserRouter([
  {
    element: <App />,        // 공통 레이아웃
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "community", element: <Community /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "mypage", element: <MyPage /> },

      { path: "course/:courseId", element: <Course /> },
      { path: "course/:courseId/eval", element: <CourseEval /> },
      { path: "course/:courseId/review", element: <CourseReview /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
