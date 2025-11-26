import express from "express";
import {
  getFriends,
  getPendingRequests,
  toggleFriendRequest,
  respondToFriendRequest,
} from "../Controllers/friendship.controller.js";
import { authenticate } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.get("/get-friends", authenticate, getFriends);
router.get("/get-pending-requests", authenticate, getPendingRequests);
router.post("/toggle-friendship/:friendId", authenticate, toggleFriendRequest); //id of the user to send/cancel friend request or unfriend
router.post("/response-to-request/:friendId", authenticate, respondToFriendRequest); //id of the user which has sent the request

export default router;
