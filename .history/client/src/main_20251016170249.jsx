import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/tailwind.css'
import App from './pages/App.jsx'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Course from './pages/Course.jsx'
import CourseEval from './pages/CourseEval.jsx'
import MyPage from './pages/MyPage.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Community from './pages/Community.jsx'

const router = createBrowserRouter([{
  element: <App />,
  children: [
    { path: '/', element: <Home /> },
    { path: "/course/:slug", element: <Course /> },
    { path: '/search', element: <Search /> },
    { path: '/course/:id', element: <Course /> },
    { path: '/course-eval/:id?', element: <CourseEval /> },
    { path: '/mypage', element: <MyPage /> },
    { path: '/community', element: <Community /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> }
  ]
}])

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
