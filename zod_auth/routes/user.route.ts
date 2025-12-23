import { Router } from "express";
import { RegisterUser, LoginUser } from "../controllers/user.controller";

const router = Router()


router.route("/signup").post(RegisterUser)


router.route("/signin").post(LoginUser)


export default router