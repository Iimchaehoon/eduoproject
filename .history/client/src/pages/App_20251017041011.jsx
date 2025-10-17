import { Outlet, useLocation, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Home from "./Home.jsx";           // 기존 파일 그대로 사용
import Search from "./Search.jsx";
import Course from "./Course.jsx";
import CourseEval from "./CourseEval.jsx";
import Community from "./Community.jsx"; // 기존 파일 그대로 사용
import MyPage from "./MyPage.jsx";       // 기존 파일 그대로 사용
import Login from "./Login.jsx";         // 기존 파일 그대로 사용
import Register from "./Register.jsx";   // 기존 파일 그대로 사용

function Shell() {
  const loc = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1"><Outlet key={loc.key} /></main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-24 text-center">
      <h1 className="text-2xl font-bold text-slate-900">페이지를 찾을 수 없어요</h1>
      <a href="/" className="btn btn-primary mt-6 inline-block">홈으로 가기</a>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Shell />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <Search /> },
      { path: "/course/:slug", element: <Course /> },
      { path: "/course/:slug/eval", element: <CourseEval /> },
      { path: "/community", element: <Community /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
