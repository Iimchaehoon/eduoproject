import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { prompt } = req.body || {};
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (!key) return res.status(500).json({ error: "GOOGLE_API_KEY not set" });
  if (!prompt) return res.status(400).json({ error: "prompt is required" });

  // 일단 연결/흐름 확인용 더미응답
  return res.json({
    ok: true,
    echo: prompt,
    model: "gemini-pro (dummy)",
  });
});

export default router;
