import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  name: String,
  title: String,
  progress: { type: Number, default: 0 },
  score: { type: Number, default: null },
  status: String
}, { _id: false });

const stageSchema = new mongoose.Schema({
  name: String,
  title: String,
  status: { type: String, enum: ["completed", "active", "locked"], default: "locked" }
}, { _id: false });

const userSchema = new mongoose.Schema({
  email: { type: String, index: true, unique: true, sparse: true },
  name: { type: String, default: "Hemanth" },
  role: { type: String, default: "student" },
  hours: { type: Number, default: 0 },
  certificate: { type: String, default: "Pending" },
  assessmentScore: { type: Number, default: 0 },
  simHours: { type: Number, default: 0 },
  modules: { type: [moduleSchema], default: [] },
  stages: { type: [stageSchema], default: [] }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
