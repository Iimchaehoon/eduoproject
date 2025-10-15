
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function chatWithGemini(messages) {
  // messages: [{role:'user'|'model', content:'...'}]
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  const chat = model.startChat({ history: messages });
  const res = await chat.sendMessage('응답은 600자 이내로 해줘.');
  return res.response.text();
}

export async function promptOnce(prompt) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  const result = await model.generateContent(prompt);
  return result.response.text();
}
