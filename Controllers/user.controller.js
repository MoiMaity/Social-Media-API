import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, gender });
    await user.save();
    res
      .status(201)
      .json({ success: true, user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.tokens.push(token);
    await user.save();

    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => t !== req.token);
    await req.user.save();
    res.json({ success: true, message: "Logged out" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.json({ success: true, message: "Logged out from all devices" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "-password -tokens"
    );
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.userId, updates, {
      new: true,
    }).select("-password");
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
