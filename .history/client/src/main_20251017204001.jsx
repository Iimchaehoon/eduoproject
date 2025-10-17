// client/src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/tailwind.css";

import App from "./pages/App.jsx";
// 필요 시 다른 페이지 추가
// import Course from "./pages/Course.jsx";
// import Search from "./pages/Search.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  // { path: "/course", element: <Course /> },
  // { path: "/search", element: <Search /> },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
