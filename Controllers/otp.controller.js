import OTP from "../Models/otp.model.js";
import User from "../Models/user.model.js";
import sendEmail from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await OTP.create({ email, otp });
  await sendEmail(email, `Your OTP is ${otp}`);
  res.json({ message: "OTP sent" });
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = await OTP.findOne({ email, otp });
  if (!record) return res.status(400).json({ error: "Invalid OTP" });
  res.json({ message: "OTP verified" });
};

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  user.password = await bcrypt.hash(password, 10);
  await user.save();
  res.json({ message: "Password updated" });
};
