// client/src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 페이지
import App from "./pages/App.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Course from "./pages/Course.jsx";
import MyPage from "./pages/MyPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Community from "./pages/Community.jsx";
import CourseEval from "./pages/CourseEval.jsx";
import CourseReview from "./pages/CourseReview.jsx";

// 전역 스타일(있다면)
import "./styles/index.css"; // 없으면 이 줄 삭제

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <Search /> },
      { path: "/course/:slug?", element: <Course /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/community", element: <Community /> },
      { path: "/course-eval", element: <CourseEval /> },
      { path: "/course-review", element: <CourseReview /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
