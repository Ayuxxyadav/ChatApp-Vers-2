import express from "express"
import { signupController } from "../controllers/authController/signupController";
import { signinController } from "../controllers/authController/signinController";
import { createRoomController } from "../controllers/roomController/createRoom";
import { middleware } from "../middlewares/auth.middleware";



const router  = express.Router()
router.post("/auth/signup",signupController);
router.post("/auth/signin",signinController);
router.post("/create-room",middleware,createRoomController);

export default router ;  