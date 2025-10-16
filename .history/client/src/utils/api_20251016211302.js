// client/src/utils/api.js
export async function searchCourses({
  q = "",
  category = "",
  uni = "",
  level = "",
  lang = "",
  page = 1,
  size = 12,
  sort = "latest",
} = {}) {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  if (category) p.set("category", category);
  if (uni) p.set("uni", uni);
  if (level) p.set("level", level);
  if (lang) p.set("lang", lang);
  p.set("page", String(page));
  p.set("size", String(size));
  p.set("sort", sort);

  const r = await fetch(`/api/search?${p.toString()}`);
  if (!r.ok) throw new Error(`API ${r.status}`);
  // 서버(kocw.js)가 {page,size,total,items:[...]} 형태로 내려줍니다.
  return r.json();
}
