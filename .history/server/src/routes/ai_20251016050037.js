import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Gemini 예시 (Flash 모델)
router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    const API_KEY = process.env.GOOGLE_API_KEY; // 네가 발급한 키
    if (!API_KEY) {
      return res.status(500).json({ error: "GOOGLE_API_KEY not set" });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const payload = {
      contents: [{ parts: [{ text: prompt || "" }] }]
    };

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!r.ok) {
      const t = await r.text();
      return res.status(500).json({ error: "Gemini error", detail: t });
    }

    const data = await r.json();
    // 응답 파싱(단일 텍스트로 합치기)
    const text =
      data?.candidates?.[0]?.content?.parts?.map(p => p.text).join("\n") ||
      "응답이 비어 있습니다.";

    res.json({ text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server_error" });
  }
});

export default router;
console.log('[AI] key present?', !!process.env.GOOGLE_API_KEY);
