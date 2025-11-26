import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../Controllers/post.controller.js";
import { authenticate } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.get("/all", getAllPosts);
router.get("/:postId", getPostById);
// Protected endpoints — require authentication
router.post("/", authenticate, createPost);
router.put("/:postId", authenticate, updatePost);
router.delete("/:postId", authenticate, deletePost);

export default router;
