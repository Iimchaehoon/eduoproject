import { Outlet, useLocation, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Home from "./Home.jsx";
import Search from "./Search.jsx";
import Course from "./Course.jsx";
import CourseEval from "./CourseEval.jsx"; // ← 강의평가
import CourseReview from "./CourseReview.jsx"; // (필요 시)
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import MyPage from "./MyPage.jsx";
import Community from "./Community.jsx";

function Layout() {
  const loc = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1"><Outlet key={loc.key} /></main>
      <Footer />
    </div>
  );
}

// 404용
function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-24 text-center">
      <div className="text-2xl font-bold">페이지를 찾을 수 없어요</div>
      <a href="/" className="btn btn-primary mt-5">홈으로 가기</a>
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <Search /> },
      { path: "/community", element: <Community /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/mypage", element: <MyPage /> },

      // 강의 본문
      { path: "/course/:courseId", element: <Course /> },

      // 강의 평가 (여기가 없으면 404 납니다)
      { path: "/course/:courseId/eval", element: <CourseEval /> },

      // (필요할 경우) 강의 상세 리뷰
      { path: "/course/:courseId/review", element: <CourseReview /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
