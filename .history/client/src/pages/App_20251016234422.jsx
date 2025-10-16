import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function App() {
  const loc = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      <Navbar />
      <main className="flex-1">
        <Outlet key={loc.key} />
      </main>
      <Footer />
    </div>
  );
}
