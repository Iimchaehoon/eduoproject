// src/main.jsx
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

function ErrorScreen() {
  return (
    <div style={{padding:20}}>
      <h2>페이지를 찾을 수 없습니다.</h2>
      <p>주소를 다시 확인해 주세요.</p>
      <a href="/" style={{color:"#4f6bff"}}>홈으로</a>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorScreen />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "course/:slug", element: <Course /> },
      // ✅ 강의평가 라우트 (탭에서 이동)
      { path: "course-eval", element: <CourseEval /> },
      // ✅ 마지막 catch-all
      { path: "*", element: <ErrorScreen /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
