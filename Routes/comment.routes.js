import express from "express";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../Controllers/comment.controller.js";
import { authenticate } from "../Middlewares/auth.middleware.js";

const router = express.Router();

// Protected endpoints — require authentication
router.post("/:postId", authenticate, addComment);
router.delete("/:commentId", authenticate, deleteComment);
router.put("/:commentId", authenticate, updateComment);

export default router;
