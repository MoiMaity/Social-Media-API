import express from "express";
import {
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../Controllers/otp.controller.js";
import { authenticate } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post("/send", authenticate, sendOtp);
router.post("/verify", authenticate, verifyOtp);
router.post("/reset-password", authenticate, resetPassword);

export default router;
