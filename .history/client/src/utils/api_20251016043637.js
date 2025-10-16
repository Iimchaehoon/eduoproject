const BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function aiChat(message, context="") {
  const r = await fetch(`${BASE}/api/ai/chat`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ message, context })
  });
  return r.json();
}

export async function aiSummary(text) {
  const r = await fetch(`${BASE}/api/ai/summary`, {
    method: "POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ text })
  });
  return r.json();
}

export async function aiQuiz(text, n=5) {
  const r = await fetch(`${BASE}/api/ai/quiz`, {
    method: "POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ text, n })
  });
  return r.json();
}
