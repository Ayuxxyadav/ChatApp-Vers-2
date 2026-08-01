import Signin from "@/pages/authSection/Signin"
import Signup from "@/pages/authSection/Signup"
import { HomePage } from "@/pages/HomePage"
import RoomPage from "@/pages/roomSection/CreateRoom"
import RoomDashboard from "@/pages/roomSection/RoomDashboard"
import { Route ,Routes } from "react-router-dom"


export const AppRoutes = () => {



  return (
   <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/auth/signup" element={<Signup/>}></Route>
    <Route path="/auth/signin" element={<Signin/>}></Route>
    <Route path="/room" element={<RoomDashboard/>}></Route>
   </Routes>
  )
}
