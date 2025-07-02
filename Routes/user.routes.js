import express from "express";
import {
  getUserDetails,
  updateUser
} from "../Controllers/user.controller.js";
import multer from "multer";

const upload = multer({ dest: "uploads/avatars/" });

const router = express.Router();

router.get("/get-details/:userId", getUserDetails);
router.put("/update-details/:userId", updateUser);

export default router;
