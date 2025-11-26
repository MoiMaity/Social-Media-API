import Post from "../Models/post.model.js";
import Comment from "../Models/comment.model.js";

export const toggleLike = async (req, res) => {
  try {
    // Try to find a Post first — if not found, try a Comment
    const id = req.params.id;
    let target = await Post.findById(id);
    let modelName = "Post";
    if (!target) {
      target = await Comment.findById(id);
      modelName = "Comment";
    }
    if (!target)
      return res
        .status(404)
        .json({ success: false, message: `${modelName} not found` });

    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    // Compare ObjectIds safely (convert to string) and toggle
    const userIdStr = req.user._id.toString();
    const index = target.likes.findIndex((l) => l.toString() === userIdStr);
    if (index === -1) target.likes.push(req.user._id);
    else target.likes.splice(index, 1);

    await target.save();
    res.json({
      success: true,
      likes: target.likes.length,
      resource: modelName,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    // Try to find target (post or comment) and return populated likes
    const id = req.params.id;
    let target = await Post.findById(id).populate("likes", "name email");
    let modelName = "Post";
    if (!target) {
      target = await Comment.findById(id).populate("likes", "name email");
      modelName = "Comment";
    }
    if (!target)
      return res
        .status(404)
        .json({ success: false, message: `${modelName} not found` });

    res.json({ success: true, likes: target.likes, resource: modelName });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
