import express from "express"
import { signupController } from "../controllers/authcontroller/signupController";
import { signinController } from "../controllers/authcontroller/signinController";



const router  = express.Router()
router.post("/auth/signup",signupController);
router.post("/auth/signin",signinController);

export default router ;  