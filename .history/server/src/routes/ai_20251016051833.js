// server/src/routes/ai.js
import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const router = express.Router();

const getKey = () => process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
// 환경변수 우선, 없으면 flash 기본
const MODEL_ID = process.env.GEMINI_MODEL || "gemini-1.5-flash";

function getModel() {
  const key = getKey();
  if (!key) throw new Error("GOOGLE_API_KEY not set");
  const genAI = new GoogleGenerativeAI(key);
  return genAI.getGenerativeModel({ model: MODEL_ID });
}

router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "prompt is required" });

    const model = getModel();
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json({ ok: true, answer: text, model: MODEL_ID });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || "AI error" });
  }
});

// (summarize/quiz 엔드포인트도 동일하게 getModel() 사용)
export default router;
