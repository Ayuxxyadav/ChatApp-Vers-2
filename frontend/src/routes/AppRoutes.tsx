import Signup from "@/pages/authSection/Signup"
import { HomePage } from "@/pages/HomePage"
import { Route ,Routes } from "react-router-dom"


export const AppRoutes = () => {



  return (
   <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="/auth/signup" element={<Signup/>}></Route>
   </Routes>
  )
}
