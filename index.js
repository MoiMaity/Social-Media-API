import express from "express";
import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";
import postRoutes from "./Routes/post.routes.js";
import commentRoutes from "./Routes/comment.routes.js";
import likeRoutes from "./Routes/like.routes.js";
import friendshipRoutes from "./Routes/friendship.routes.js";
import otpRoutes from "./Routes/otp.routes.js";

const router = express.Router();

router.use("/api/users", authRoutes); // signup, signin, logout, logout-all-devices
router.use("/api/users", userRoutes); // user profile routes
router.use("/api/posts", postRoutes); // post routes
router.use("/api/comments", commentRoutes); // comment routes
router.use("/api/likes", likeRoutes); // like routes
router.use("/api/friends", friendshipRoutes); // friendship routes
router.use("/api/otp", otpRoutes); // OTP routes

export default router;
