
import { Router } from 'express';
import { chatWithGemini, promptOnce } from '../services/gemini.js';

const router = Router();

router.post('/chat', async (req, res) => {
  try {
    const { history = [] } = req.body;
    const text = await chatWithGemini(history);
    res.json({ text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'AI chat failed' });
  }
});

// Return structured JSON for recommendations

router.post('/recommend', async (req, res) => {
  try {
    const { profile } = req.body;
    const prompt = `
      다음은 사용자의 학습 프로필입니다.
      ${JSON.stringify(profile, null, 2)}

      1) 사용자의 수준/관심사를 바탕으로 추천 기준 3~5가지를 bullet로 제시하고,
      2) 추천 카테고리 4~6개를 다음 JSON 배열 형태로만 반환하세요.
      형식: [{"name": "...", "reason": "..."}]
      한국어로 작성.
    `;
    const text = await promptOnce(prompt);

    let parsed = null;
    try { parsed = JSON.parse(text); } catch (_) {
      const match = text.match(/\[\s*{[\s\S]*}\s*\]/);
      if (match) { try { parsed = JSON.parse(match[0]); } catch(e) {} }
    }
    if (!Array.isArray(parsed)) parsed = [];

    // --- Mapping: keywords -> course ids ---
    const fs = await import('fs');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const mapPath = path.join(__dirname, '..', 'data', 'reco_map.json');
    const coursesPath = path.join(__dirname, '..', 'data', 'courses.json');
    const map = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
    const courses = JSON.parse(fs.readFileSync(coursesPath, 'utf-8'));

    const keys = Object.keys(map);
    const hitKeys = new Set();
    for (const it of parsed) {
      const name = (it?.name || '').toLowerCase();
      for (const k of keys) {
        if (name.includes(k.toLowerCase())) hitKeys.add(k);
      }
    }
    for (const p of (profile?.interests || [])) {
      for (const k of keys) {
        if (p.toLowerCase().includes(k.toLowerCase())) hitKeys.add(k);
      }
    }

    const idSet = new Set();
    for (const k of hitKeys) {
      for (const id of (map[k]||[])) idSet.add(id);
    }
    let matched = courses.filter(c => idSet.has(c.id));
    if (!matched.length) {
      matched = [...courses].sort((a,b)=>(b.rating||0)-(a.rating||0)).slice(0,3);
    }

    res.json({ items: parsed, matchKeys: Array.from(hitKeys), courses: matched, raw: text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'AI recommend failed' });
  }
});
router.post('/summary', async (req, res) => {
  try {
    const { text, lines = 3 } = req.body;
    const out = await promptOnce(
      `다음 강의 내용을 ${lines}줄로 핵심만 요약해줘.\n\n` + text
    );
    res.json({ summary: out });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'AI summary failed' });
  }
});

// Quiz generation endpoint
router.post('/quiz', async (req, res) => {
  try {
    const { text, count = 3, type = 'mixed' } = req.body;
    const prompt = `
      아래 학습 내용을 기반으로 ${count}문항의 퀴즈를 생성합니다.
      - 타입: ${type} (ox 또는 obj 또는 mixed)
      - JSON 배열만 반환: 
        [{"q":"문항","type":"ox|obj","choices":["A","B","C","D"],"answer":"정답","explain":"해설"}]
      - obj일 때만 choices 사용, ox는 choices 없이 "answer":"O" 또는 "X".
      내용:\n${text}
    `;
    const textOut = await promptOnce(prompt);
    let quiz = null;
    try {
      quiz = JSON.parse(textOut);
    } catch (_) {
      const m = textOut.match(/\[\s*{[\s\S]*}\s*\]/);
      if (m) { try { quiz = JSON.parse(m[0]); } catch(e){} }
    }
    if (!Array.isArray(quiz)) quiz = [];
    res.json({ quiz, raw: textOut });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'AI quiz failed' });
  }
});

export default router;
