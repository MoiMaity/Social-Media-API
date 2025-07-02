import Post from "../Models/post.model.js";

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const index = post.likes.indexOf(req.user._id);
    if (index === -1) {
      post.likes.push(req.user._id);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();
    res.json({ success: true, likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "likes",
      "name email"
    );
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    res.json({ success: true, likes: post.likes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
