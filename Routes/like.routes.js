import express from "express";
import { getLikes, toggleLike } from "../Controllers/like.controller.js";
import { authenticate } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id", getLikes); // id can be post or comment ID
router.post("/toggle/:id", authenticate, toggleLike);

export default router;
