// client/src/utils/api.js
export async function searchCourses(params = {}) {
  const url = new URL("/api/search", window.location.origin);

  // 필요한 파라미터만 붙임 (서버가 사용하는 키만)
  if (params.q) url.searchParams.set("q", params.q);
  if (params.page) url.searchParams.set("page", params.page);
  if (params.size) url.searchParams.set("size", params.size);
  if (params.lang) url.searchParams.set("lang", params.lang);
  if (params.level) url.searchParams.set("level", params.level);
  if (params.uni) url.searchParams.set("uni", params.uni);
  if (params.sort) url.searchParams.set("sort", params.sort);

  // vite proxy가 /api -> http://localhost:5000 으로 보내줌
  const res = await fetch(url.pathname + url.search, { credentials: "omit" });
  if (!res.ok) throw new Error(`API ${res.status}`);

  const data = await res.json();
  // 항상 { page, size, total, items } 형태를 기대
  return {
    page: Number(data.page ?? 1),
    size: Number(data.size ?? 0),
    total: Number(data.total ?? (Array.isArray(data.items) ? data.items.length : 0)),
    items: Array.isArray(data.items) ? data.items : [],
  };
}
