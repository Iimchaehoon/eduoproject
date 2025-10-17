// client/src/utils/api.js
export async function fetchCourses(params = {}) {
  const {
    q = "",
    page = 1,
    size = 9,            // ✅ 기본 9개
    sort = "latest",
    category = "",
    uni = "",
    level = "",
    lang = "",
    teacher = "",
    free = "",
    cert = "",
  } = params;

  const qs = new URLSearchParams();
  if (q) qs.set("q", q);
  qs.set("page", String(page));
  qs.set("size", String(size));
  qs.set("sort", sort);
  if (category) qs.set("category", category);
  if (uni) qs.set("uni", uni);
  if (level) qs.set("level", level);
  if (lang) qs.set("lang", lang);
  if (teacher) qs.set("teacher", teacher);
  if (free) qs.set("free", "1");
  if (cert) qs.set("cert", "1");

  const url = `/api/search?${qs.toString()}`;

  const r = await fetch(url, { headers: { accept: "application/json" } });
  if (!r.ok) throw new Error(`API ${r.status}`);
  return r.json(); // { page, size, total, items: [...] }
}
