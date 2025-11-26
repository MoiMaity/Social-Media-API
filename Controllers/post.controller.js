import Post from "../Models/post.model.js";
import User from "../Models/user.model.js";

export const createPost = async (req, res) => {
  try {
    const { caption, imageUrl } = req.body;
    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    const userId = req.user._id;

    const newPost = new Post({ caption, imageUrl, user: userId });
    await newPost.save();
    res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name email")
      .populate("likes", "name email")
      .populate("comments");
    res.json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("user", "name email")
      .populate("likes", "name email")
      .populate({
        path: "comments",
        populate: { path: "user", select: "name email" },
      });
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    res.json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    const { caption, imageUrl } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    if (post.user.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, message: "Unauthorized" });

    post.caption = caption || post.caption;
    post.imageUrl = imageUrl || post.imageUrl;
    await post.save();

    res.json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    const post = await Post.findById(req.params.postId);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    if (post.user.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, message: "Unauthorized" });

    // Use a safe delete API instead of the deprecated Document.remove()
    await Post.findByIdAndDelete(req.params.postId);
    res.json({ success: true, message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
