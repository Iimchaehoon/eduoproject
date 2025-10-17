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
export async function searchCourses({ q = "", page = 1, size = 12, lang, level, uni } = {}) {
  const url = new URL("/api/search", window.location.origin);
  url.searchParams.set("q", q);
  url.searchParams.set("page", page);
  url.searchParams.set("size", size);
  if (lang) url.searchParams.set("lang", lang);
  if (level) url.searchParams.set("level", level);
  if (uni) url.searchParams.set("uni", uni);

  const r = await fetch(url.toString());
  if (!r.ok) throw new Error("검색 실패");
  return r.json();
}
