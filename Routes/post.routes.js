import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../Controllers/post.controller.js";

const router = express.Router();

router.get("/all", getAllPosts);
router.get("/:postId", getPostById);
router.post("/", createPost);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);

export default router;
