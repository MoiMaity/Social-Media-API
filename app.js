// app.js
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./Config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";
import postRoutes from "./Routes/post.routes.js";
import commentRoutes from "./Routes/comment.routes.js";
import likeRoutes from "./Routes/like.routes.js";
import friendRoutes from "./Routes/friendship.routes.js";
import otpRoutes from "./Routes/otp.routes.js";

import { errorHandlerMiddleware } from "./Middlewares/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/users", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/otp", otpRoutes);

// Root
app.get("/", (req, res) => {
  res.send("✅ Social Media API Running...");
});

// Error Handling Middleware
app.use(errorHandlerMiddleware);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
