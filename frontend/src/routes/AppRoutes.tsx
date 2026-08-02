import Signin from "@/pages/authSection/Signin"
import Signup from "@/pages/authSection/Signup"
import ChatRoom from "@/pages/chatSection/chatRoom"
import { HomePage } from "@/pages/HomeSection/HomePage"
import RoomDashboard from "@/pages/roomSection/RoomDashboard"
import Navbar from "@/pages/Nav/NavBar" // Adjust path as per your folder structure
import { Route, Routes, Outlet } from "react-router-dom"

// 1. Layout Component banaya jo Navbar render karega aur saare child routes ko Outlet se
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Pages with Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/room" element={<RoomDashboard />} />
        <Route path="/room/:roomId" element={<ChatRoom />} />
      </Route>

      {/* Auth Pages without Navbar (Separate layout for full screen signin/signup) */}
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/signin" element={<Signin />} />
    </Routes>
  );
};