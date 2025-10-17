// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Course from "./pages/Course.jsx";
import CourseEval from "./pages/CourseEval.jsx";
import Community from "./pages/Community.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import MyPage from "./pages/MyPage.jsx";
import "./styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "course/:slug", element: <Course /> },
      { path: "course/:slug/eval", element: <CourseEval /> },
      { path: "community", element: <Community /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "mypage", element: <MyPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
