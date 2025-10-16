
import { Router } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
const router = Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY||'');

router.post('/chat', async (req,res)=>{
  try{
    const { message, context } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(`한국어로 친절히 답하라. 질문:${message}`);
    res.json({ text: result.response.text() });
  }catch(e){ console.error(e); res.status(500).json({error:'AI chat error'}); }
});
router.post('/summary', async (req,res)=>{
  try{
    const { transcript } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(`다음 내용을 5개 불릿으로 요약: ${transcript}`);
    res.json({ summary: result.response.text() });
  }catch(e){ console.error(e); res.status(500).json({error:'AI summary error'}); }
});
router.post('/quiz', async (req,res)=>{
  try{
    const { topic, count=5 } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const result = await model.generateContent(`"${topic}" 주제 객관식 퀴즈 ${count}문제를 JSON으로: [{"q":"","choices":["","","",""],"answerIndex":0,"explain":""}]`);
    let data; try{ data = JSON.parse(result.response.text()); } catch{ data = []; }
    res.json({ quiz: data });
  }catch(e){ console.error(e); res.status(500).json({error:'AI quiz error'}); }
});
router.post('/recommend', async (req,res)=>{
  try{
    const { history=[] } = req.body;
    const tags = [...new Set(history.flatMap(h=>h.tags||[]))];
    const recs = tags.slice(0,5).map((t,i)=>({id:`rec-${i}`, tag:t}));
    res.json({ recommendations: recs });
  }catch(e){ console.error(e); res.status(500).json({error:'AI recommend error'}); }
});
export default router;
