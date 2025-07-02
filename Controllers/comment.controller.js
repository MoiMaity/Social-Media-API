import Comment from "../Models/comment.model.js";
import Post from "../Models/post.model.js";

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const comment = await Comment.create({
      text,
      user: req.user._id,
      post: req.params.postId,
    });

    await Post.findByIdAndUpdate(req.params.postId, {
      $push: { comments: comment._id },
    });

    res.status(201).json({ success: true, comment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    if (comment.user.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, message: "Unauthorized" });

    comment.text = req.body.text || comment.text;
    await comment.save();
    res.json({ success: true, comment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment)
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });

    if (comment.user.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, message: "Unauthorized" });

    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: comment._id },
    });
    await comment.remove();
    res.json({ success: true, message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
