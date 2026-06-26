import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  userEmail: { type: String, index: true },
  date: String,
  aircraft: String,
  hardware: String,
  duration: String,
  status: String
}, { timestamps: true });

export default mongoose.model("Log", logSchema);
