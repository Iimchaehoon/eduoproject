import { Router } from "express";
import fetch from "node-fetch";
import { GoogleGenAI } from "@google/genai";
const router = Router();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) console.warn("[AI] GEMINI_API_KEY not set in .env");

const ai = new GoogleGenAI({ apiKey });

// 채팅
router.post("/chat", async (req, res) => {
  try {
    const { message, context } = req.body || {};
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: `Context: ${context || ""}\n\nQuestion: ${message}` }] }
      ],
    });
    res.json({ text: response.text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "AI chat failed" });
  }
});

// 요약
router.post("/summary", async (req, res) => {
  try {
    const { text } = req.body || {};
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `다음 텍스트를 학습 요점 5줄로 한국어 요약:\n\n${text || ""}`,
    });
    res.json({ text: response.text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "AI summary failed" });
  }
});

// 퀴즈 생성 (객관식)
router.post("/quiz", async (req, res) => {
  try {
    const { text, n = 5 } = req.body || {};
    const prompt = `다음 내용을 바탕으로 한국어 객관식 퀴즈 ${n}문제 생성. 각 문항은 text, choices[], answerIndex, explanation 포함 JSON 배열로만 반환:\n\n${text || ""}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    const raw = response.text || "[]";
    // 모델이 코드블록으로 줄 수도 있으므로 파싱 보정
    const json = JSON.parse(raw.replace(/```json|```/g, "").trim());
    res.json({ items: json });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "AI quiz failed" });
  }
});

export default router;
