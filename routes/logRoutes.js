import express from "express";
import Log from "../models/Log.js";

const router = express.Router();

const DEFAULT_LOGS = [
  { date: "2026-06-22", aircraft: "Training Quad Alpha", hardware: "MAD 80A AMPX ESC", duration: "2.5 hrs", status: "Completed" },
  { date: "2026-06-18", aircraft: "Observation Hex", hardware: "SIYI A2 Mini Gimbal", duration: "1.8 hrs", status: "Completed" },
  { date: "2026-06-15", aircraft: "Heavy Lift Mk1", hardware: "MK32 Ground Station", duration: "3.0 hrs", status: "Under Review" }
];

router.get("/", async (req, res) => {
  try {
    const userEmail = req.query.email || process.env.DEFAULT_USER_EMAIL || "student@acceluav.local";
    const logs = await Log.find({ $or: [{ userEmail }, { userEmail: { $exists: false } }] })
      .sort({ date: -1, createdAt: -1 })
      .lean();

    res.json(logs.length ? logs : DEFAULT_LOGS);
  } catch (err) {
    console.error("GET /api/logs failed:", err.message);
    res.status(500).json({ error: "Server error while loading logs" });
  }
});

router.post("/", async (req, res) => {
  try {
    const userEmail = req.body.userEmail || process.env.DEFAULT_USER_EMAIL || "student@acceluav.local";
    const log = await Log.create({ ...req.body, userEmail });
    res.status(201).json(log);
  } catch (err) {
    console.error("POST /api/logs failed:", err.message);
    res.status(400).json({ error: "Invalid log data" });
  }
});

export default router;
