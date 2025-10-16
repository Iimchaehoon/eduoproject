import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRouter from "./routes/ai.js";

dotenv.config(); // ★ 반드시 가장 위에서 호출

const app = express();

// CORS/Body
const origin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
app.use(cors({ origin, credentials: true }));
app.use(express.json());

// health check
app.get("/health", (req, res) => res.json({ ok: true }));

// API
app.use("/api/ai", aiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
