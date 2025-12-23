import { Router } from "express";
import { RegisterUser, LoginUser, Home } from "../controllers/user.controller";
import { verifyJwt } from "../middleware/auth";

const router = Router()


router.route("/signup").post(RegisterUser)


router.route("/signin").post(LoginUser)

router.route("/secured").get(verifyJwt,Home)

export default router