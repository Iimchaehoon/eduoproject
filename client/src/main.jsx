import React from "react";
import { createRoot } from "react-dom/client";
<<<<<<< HEAD
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/tailwind.css";

import AppLayout from "./pages/App.jsx";   // 이름을 AppLayout으로 바꿔서 혼동 방지
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Course from "./pages/Course.jsx";
import CourseEval from "./pages/CourseEval.jsx";
import MyPage from "./pages/MyPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Community from "./pages/Community.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,           // 상단 공통 레이아웃
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <Search /> },

      // ▼ 중복 제거: slug 하나만 유지
      { path: "/course/:slug", element: <Course /> },

      { path: "/course-eval/:id?", element: <CourseEval /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/community", element: <Community /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
=======
import App from "./pages/App.jsx";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
>>>>>>> fd97afd2325a267145c5b014c17ea90741701eb6
);
