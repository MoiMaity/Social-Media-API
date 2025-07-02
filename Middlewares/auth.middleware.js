import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

export const authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || !user.tokens.includes(token)) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
};
