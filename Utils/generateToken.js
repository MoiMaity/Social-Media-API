import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  // Use userId key in the payload so it matches the rest of the codebase
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Adjust as needed
  });
};

export default generateToken;
