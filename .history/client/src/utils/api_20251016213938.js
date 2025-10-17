// client/src/utils/api.js
const BASE = "/api"; // 절대경로(슬래시 1개!)

export async function searchCourses(params = {}) {
  const {
    q = "",
    page = 1,
    size = 12,
    lang = "",
    level = "",
    uni = "",
    sort = "latest",
  } = params;

  const url = new URL(`${BASE}/search`, window.location.origin);
  url.searchParams.set("q", q);
  url.searchParams.set("page", page);
  url.searchParams.set("size", size);
  if (lang) url.searchParams.set("lang", lang);
  if (level) url.searchParams.set("level", level);
  if (uni) url.searchParams.set("uni", uni);
  url.searchParams.set("sort", sort);

  const r = await fetch(url.toString(), { credentials: "include" });
  if (!r.ok) throw new Error(`search ${r.status}`);
  return r.json();
}
