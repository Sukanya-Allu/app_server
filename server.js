import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import logRoutes from "./routes/logRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(",").map(origin => origin.trim()).filter(Boolean)
  : [];

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  }
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "Flight Command OS API" });
});

app.use("/api/user", userRoutes);
app.use("/api/logs", logRoutes);

app.use(express.static(path.join(__dirname, "public")));

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
