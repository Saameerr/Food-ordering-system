import express from "express";
import {
  registerUser,
  loginUser,
  requestPasswordReset,
  verifyOTPAndResetPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/requestPasswordReset", requestPasswordReset);
router.post("/verifyOTPAndResetPassword", verifyOTPAndResetPassword);

export default router;
