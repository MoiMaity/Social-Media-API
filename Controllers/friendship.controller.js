import User from "../Models/user.model.js";

export const toggleFriendRequest = async (req, res) => {
  try {
    const receiver = await User.findById(req.params.friendId);
    const sender = req.user;

    if (!receiver)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const hasRequested = receiver.friendRequests.includes(sender._id);
    if (hasRequested) {
      receiver.friendRequests.pull(sender._id);
    } else {
      receiver.friendRequests.push(sender._id);
    }

    await receiver.save();
    res.json({
      success: true,
      message: hasRequested ? "Request removed" : "Request sent",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const respondToFriendRequest = async (req, res) => {
  try {
    const receiver = req.user;
    const sender = await User.findById(req.params.friendId);
    const { action } = req.body; // 'accept' or 'reject'

    if (!sender)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (!receiver.friendRequests.includes(sender._id))
      return res
        .status(400)
        .json({ success: false, message: "No such request" });

    receiver.friendRequests.pull(sender._id);

    if (action === "accept") {
      receiver.friends.push(sender._id);
      sender.friends.push(receiver._id);
    }

    await receiver.save();
    await sender.save();

    res.json({
      success: true,
      message: action === "accept" ? "Friend added" : "Request rejected",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "friends",
      "name email"
    );
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, friends: user.friends });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "friendRequests",
      "name email"
    );
    res.json({ success: true, requests: user.friendRequests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
