// server/src/routes/ai.js
import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

const router = express.Router();

const getKey = () => process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

// 공용 헬퍼: 모델 핸들러
function getModel() {
  const key = getKey();
  if (!key) throw new Error("GOOGLE_API_KEY not set");
  const genAI = new GoogleGenerativeAI(key);
  return genAI.getGenerativeModel({ model: "gemini-pro" });
}

/**
 * 1) 일반 질의응답
 *    req.body = { prompt: string }
 *    res = { ok: true, answer: string }
 */
router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body || {};
    if (!prompt) return res.status(400).json({ error: "prompt is required" });

    const model = getModel();
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.json({ ok: true, answer: text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || "AI error" });
  }
});

/**
 * 2) 요약
 *    req.body = { text: string }
 *    res = { ok: true, summary: string }
 */
router.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body || {};
    if (!text) return res.status(400).json({ error: "text is required" });

    const model = getModel();
    const prompt = `다음 내용을 5줄 이내의 핵심 bullet로 한국어로 요약해줘:\n\n${text}`;
    const result = await model.generateContent(prompt);
    const summary = result.response.text();
    res.json({ ok: true, summary });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || "AI error" });
  }
});

/**
 * 3) 퀴즈 생성
 *    req.body = { text: string, type?: "mcq"|"ox", count?: number }
 *    res = { ok: true, quizzes: Array }
 */
router.post("/quiz", async (req, res) => {
  try {
    const { text, type = "mcq", count = 5 } = req.body || {};
    if (!text) return res.status(400).json({ error: "text is required" });

    const model = getModel();
    const prompt =
`다음 학습 내용을 기반으로 ${count}문항의 ${type==="ox"?"O/X":"객관식(보기 4개)"} 퀴즈를 JSON으로 만들어줘.
필드는 다음 스키마를 지켜줘:
- id: number
- question: string
- options: string[] (O/X는 ["O","X"]로 고정)
- answer: string (정답 텍스트)
- explanation: string (해설)
JSON만 반환해.

<내용>
${text}
</내용>`;

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();

    // 코드 fence 제거 대응
    const jsonStr = raw.replace(/^```json|```$/gim, "").trim();
    const quizzes = JSON.parse(jsonStr);

    res.json({ ok: true, quizzes });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || "AI error" });
  }
});

export default router;
