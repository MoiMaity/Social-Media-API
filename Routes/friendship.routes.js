import express from "express";
import {
  getFriends,
  getPendingRequests,
  toggleFriendRequest,
  respondToFriendRequest,
} from "../Controllers/friendship.controller.js";

const router = express.Router();

router.get("/get-friends", getFriends);
router.get("/get-pending-requests", getPendingRequests);
router.post("/toggle-friendship/:friendId", toggleFriendRequest);
router.post("/response-to-request/:friendId", respondToFriendRequest);

export default router;
