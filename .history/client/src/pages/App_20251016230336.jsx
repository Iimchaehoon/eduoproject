import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import CourseReview from "./pages/CourseReview.jsx";

export default function App(){
  const loc = useLocation()
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1"><Outlet key={loc.key}/></main>
      <Footer />
    </div>
  )
}
