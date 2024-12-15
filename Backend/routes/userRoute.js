import express from "express";
import {
    registerUser,
    loginUser,
    requestPasswordReset,
    verifyOTP,
    resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/requestPasswordReset", requestPasswordReset);
router.post("/verifyOTP", verifyOTP);
router.post("/resetPassword", resetPassword);

export default router;
