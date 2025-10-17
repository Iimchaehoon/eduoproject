import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./pages/App.jsx";

import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Course from "./pages/Course.jsx";
import CourseEval from "./pages/CourseEval.jsx";
import CourseReview from "./pages/CourseReview.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyPage from "./pages/MyPage.jsx";
import Community from "./pages/Community.jsx";

import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div style={{ padding: 24 }}>
        <h2>페이지를 찾을 수 없어요 (404)</h2>
        <p>주소를 확인하거나 상단 네비게이션으로 이동하세요.</p>
      </div>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "course/:slug", element: <Course /> },
      { path: "course/:slug/eval", element: <CourseEval /> },
      { path: "review", element: <CourseReview /> },

      // 기타
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "mypage", element: <MyPage /> },
      { path: "community", element: <Community /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
