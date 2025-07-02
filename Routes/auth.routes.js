import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  logoutAll,
} from "../Controllers/user.controller.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/logout", logoutUser);
router.post("/logout-all-devices", logoutAll);

export default router;
