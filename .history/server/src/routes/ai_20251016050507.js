// server/src/routes/ai.js
import { Router } from 'express';
import 'dotenv/config';
import fetch from 'node-fetch';

const router = Router();

// 두 이름 모두 지원 (하나라도 있으면 OK)
const GEMINI_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

// 서버 시작 시 1회 확인용 로그
console.log('[AI] key present?', !!GEMINI_KEY);

router.post('/chat', async (req, res) => {
  try {
    if (!GEMINI_KEY) {
      return res.status(500).json({ error: 'GOOGLE_API_KEY not set' }); // 클라에서 확인 용
    }

    const { prompt } = req.body ?? {};
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'prompt is required' });
    }

    // --- Gemini 1.5-flash API 호출 (REST) ---
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + GEMINI_KEY;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }],
        },
      ],
    };

    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const text = await r.text();
      return res.status(500).json({ error: 'Gemini API error', detail: text });
    }

    const data = await r.json();
    // 응답 파싱 (안전 처리)
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      data?.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') ??
      '';

    return res.json({ text });
  } catch (e) {
    console.error('[AI] error', e);
    return res.status(500).json({ error: 'server_error' });
  }
});

export default router;
