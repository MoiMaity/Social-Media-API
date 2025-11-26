import express from "express";
import {
  signup,
  signin,
  logout,
  logoutAll,
} from "../Controllers/auth.controller.js";

const router = express.Router();
// POST endpoints (API consumers should use these)
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/logout-all-devices", logoutAll);

// Helpful GET endpoints for people opening the URL in a browser
router.get("/signup", (req, res) => {
  res
    .status(200)
    .send(
      "Sign-up endpoint — POST JSON { name, email, password, gender } to this URL (use an API client like Postman or fetch from frontend)."
    );
});

router.get("/signin", (req, res) => {
  res
    .status(200)
    .send(
      "Sign-in endpoint — POST JSON { email, password } to this URL to receive an auth token."
    );
});

export default router;
