import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const createToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, gender } = req.body;
    const user = await User.create({ name, email, password, gender });
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // Normal match against stored hash
    let match = false;
    if (user) match = await bcrypt.compare(password, user.password);

    // Support accounts with double-hashed passwords from earlier bug.
    if (!match && user) {
      const onceHashed = await bcrypt.hash(password, 10);
      if (await bcrypt.compare(onceHashed, user.password)) {
        // double-hash detected — migrate stored password back to single-round hash
        await User.findByIdAndUpdate(user._id, { password: onceHashed });
        user.password = onceHashed;
        match = true;
      }
    }

    if (!user || !match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = createToken(user._id);
    user.tokens.push(token);
    await user.save();
    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const user = req.user;
    const token = req.token;
    user.tokens = user.tokens.filter((t) => t !== token);
    await user.save();
    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

export const logoutAll = async (req, res, next) => {
  try {
    const user = req.user;
    user.tokens = [];
    await user.save();
    res.json({ message: "Logged out from all devices" });
  } catch (err) {
    next(err);
  }
};
