// server/src/routes/kocw.js
import express from "express";
import fetch from "node-fetch";
import createCache from "../lib/cache.js";

const router = express.Router();
const cache = createCache({ ttlMs: 1000 * 60 * 5 }); // 5분 캐시

// KOCW 목록/검색 → 우리 UI가 필요로 하는 필드로 매핑
router.get("/search", async (req, res) => {
  try {
    const { q = "", page = 1, size = 12, lang, level, uni } = req.query;

    const key = `search:${q}:${page}:${size}:${lang || ""}:${level || ""}:${uni || ""}`;
    const hit = cache.get(key);
    if (hit) return res.json(hit);

    const base = process.env.KOCW_BASE;
    const apiKey = process.env.KOCW_API_KEY;

    // ⚠️ 실제 KOCW 스펙에 맞게 엔드포인트/파라미터는 필요 시 조정
    const url = new URL("/api/courses", base);
    url.searchParams.set("query", q);
    url.searchParams.set("page", page);
    url.searchParams.set("size", size);
    url.searchParams.set("apikey", apiKey);
    if (lang) url.searchParams.set("lang", lang);
    if (level) url.searchParams.set("level", level);
    if (uni) url.searchParams.set("university", uni);

    const r = await fetch(url.toString());
    if (!r.ok) throw new Error(`KOCW ${r.status}`);
    const raw = await r.json();

    const items = (raw.items || raw.data || []).map((it, i) => ({
      slug: it.id || it.courseId || it.slug || `kocw-${it.code || i}`,
      title: it.title || it.name || "제목 없음",
      teacher: `${it.professor || it.instructor || "강사미상"} · ${it.university || it.org || "기관미상"}`,
      image: it.thumbnail || it.image || "/img/placeholder.png",
      desc: it.summary || it.description || "",
      weeks: it.weeks || it.durationWeeks || "14주",
      students: `${it.learners || it.hits || 23000}명`,
      rating: Number(it.rating || 4.6).toFixed(1)
    }));

    const data = {
      ok: true,
      page: Number(page),
      size: Number(size),
      total: raw.total || raw.totalCount || items.length,
      items
    };

    cache.set(key, data);
    res.json(data);
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// 강좌 상세 (옵션)
router.get("/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const base = process.env.KOCW_BASE;
    const apiKey = process.env.KOCW_API_KEY;

    const url = new URL(`/api/courses/${id}`, base);
    url.searchParams.set("apikey", apiKey);

    const r = await fetch(url.toString());
    if (!r.ok) throw new Error(`KOCW ${r.status}`);
    const raw = await r.json();

    res.json({ ok: true, ...raw });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;
