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
import Community from "./pages/Community.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyPage from "./pages/MyPage.jsx";

function NotFound() {
  return (
    <div className="min-h-[50vh] grid place-items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">페이지를 찾을 수 없어요 (404)</h1>
        <p className="mt-2 text-slate-600">
          주소를 확인하시거나 상단 “전체강좌”에서 다시 이동해 주세요.
        </p>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },          // 검색 결과
      { path: "course/:slug", element: <Course /> },    // 강의 상세
      { path: "course-eval", element: <CourseEval /> }, // 강의 평가
      { path: "community", element: <Community /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "mypage", element: <MyPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
