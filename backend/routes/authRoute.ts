import { Router } from "express";
import { signup } from "../controllers/auth/signup";
import { login } from "../controllers/auth/login";
import { forgotPassword } from "../controllers/auth/forgotPassword";
import { changePassword } from "../controllers/auth/changePassword";
import { sendOTP } from "../controllers/auth/sendOTP";
import { verifyOTP } from "../controllers/auth/verifyOTP";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/sendOTP", sendOTP);
router.post("/changePassword/:id", changePassword);
router.post("/verifyOTP", verifyOTP);

export default router;
