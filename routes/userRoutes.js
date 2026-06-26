import express from "express";
import User from "../models/User.js";

const router = express.Router();

const DEFAULT_USER = {
  email: "student@acceluav.local",
  name: "Hemanth",
  role: "student",
  hours: 142.5,
  certificate: "Pending",
  assessmentScore: 88,
  simHours: 45,
  modules: [
    { name: "Drone Basics", progress: 100, score: 90 },
    { name: "Flight Principles", progress: 100, score: 75 },
    { name: "Flight Controls", progress: 60, score: null },
    { name: "Battery Management", progress: 0, score: null }
  ],
  stages: [
    { name: "Registration", status: "completed" },
    { name: "Theory Training", status: "completed" },
    { name: "Simulator Training", status: "active" },
    { name: "Flying Lessons", status: "locked" },
    { name: "Certification", status: "locked" }
  ]
};

router.get("/", async (req, res) => {
  try {
    const email = req.query.email || process.env.DEFAULT_USER_EMAIL || DEFAULT_USER.email;
    const user = await User.findOneAndUpdate(
      { email },
      { $setOnInsert: { ...DEFAULT_USER, email } },
      { new: true, upsert: true }
    ).lean();

    res.json(user);
  } catch (err) {
    console.error("GET /api/user failed:", err.message);
    res.status(500).json({ error: "Server error while loading user" });
  }
});

router.put("/", async (req, res) => {
  try {
    const email = req.body.email || req.query.email || process.env.DEFAULT_USER_EMAIL || DEFAULT_USER.email;
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { ...req.body, email } },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    res.json(user);
  } catch (err) {
    console.error("PUT /api/user failed:", err.message);
    res.status(400).json({ error: "Invalid user update" });
  }
});

export default router;
