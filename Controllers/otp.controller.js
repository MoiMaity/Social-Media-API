import OTP from "../Models/otp.model.js";
import User from "../Models/user.model.js";
import sendEmail from "../Utils/sendEmail.js";
import bcrypt from "bcryptjs";

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });

    // Only send OTP to registered users (password reset flow)
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const record = await OTP.create({ email, otp });

    try {
      await sendEmail(email, "OTP for your account", `Your OTP is ${otp}`);
    } catch (err) {
      // remove OTP record if email sending failed
      await OTP.findByIdAndDelete(record._id).catch(() => {});
      return res
        .status(502)
        .json({
          success: false,
          message: "OTP could not be sent (email failure)",
        });
    }

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    // bubble up to error middleware for logging
    throw err;
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res
        .status(400)
        .json({ success: false, message: "email and otp are required" });

    const record = await OTP.findOne({ email, otp });
    if (!record)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    // OTP is one-time use
    await OTP.findByIdAndDelete(record._id).catch(() => {});
    res.json({ success: true, message: "OTP verified" });
  } catch (err) {
    throw err;
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "email and password are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    throw err;
  }
};
