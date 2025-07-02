import express from "express";
import {
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../Controllers/otp.controller.js";

const router = express.Router();

router.post("/send", sendOtp);
router.post("/verify", verifyOtp);
router.post("/reset-password", resetPassword);

export default router;
