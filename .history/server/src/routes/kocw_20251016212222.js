import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// 임시 MOCK 데이터(24개 정도)
function mockItems(page = 1, size = 12) {
  const all = Array.from({ length: 24 }).map((_, i) => ({
    slug: `mock-${i + 1}`,
    title: `MOCK 강좌 ${i + 1}`,
    teacher: `홍길동 · EDUO`,
    image: "/img/alfago.png",
    summary: "MOCK 데이터입니다.",
    weeks: "14주",
    learners: 23000,
    rating: 4.6
  }));
  const start = (page - 1) * size;
  return {
    page,
    size,
    total: all.length,
    items: all.slice(start, start + size)
  };
}

router.get("/search", async (req, res) => {
  try {
    const { q = "", page = 1, size = 12, lang, level, uni, sort = "latest" } = req.query;

    // ★ MOCK 모드
    if (process.env.KOCW_MOCK === "1") {
      console.log("[KOCW] MOCK mode on");
      return res.json(mockItems(Number(page), Number(size)));
    }

    const base = process.env.KOCW_BASE;         // ex) https://openapi.kocw.or.kr
    const apiKey = process.env.KOCW_API_KEY;    // 발급키

    // ★ 실제 KOCW 엔드포인트는 기관/버전에 따라 다릅니다.
    // 문서에 맞게 path/파라미터를 수정하세요.
    const url = new URL("/api/courses", base);
    url.searchParams.set("apikey", apiKey);
    if (q) url.searchParams.set("query", q);
    url.searchParams.set("page", page);
    url.searchParams.set("size", size);
    if (lang)  url.searchParams.set("lang", lang);
    if (level) url.searchParams.set("level", level);
    if (uni)   url.searchParams.set("university", uni);
    if (sort)  url.searchParams.set("sort", sort);

    console.log("[KOCW] fetch:", url.toString());
    const r = await fetch(url.toString());
    if (!r.ok) throw new Error(`KOCW ${r.status}`);

    const raw = await r.json();

    const items = (raw.items || raw.data || []).map((it) => ({
      slug: it.id || it.courseId || it.slug || `kocw-${it.code}`,
      title: it.title || it.name,
      teacher: `${it.professor || it.instructor || "강사미상"} · ${it.university || it.org || "기관미상"}`,
      image: it.thumbnail || it.image || "/img/alfago.png",
      summary: it.summary || it.description || "",
      weeks: it.weeks || it.durationWeeks || "14주",
      learners: it.learners || it.hits || 23000,
      rating: Number(it.rating || 4.6)
    }));

    res.json({
      page: Number(page),
      size: Number(size),
      total: raw.total || raw.totalCount || items.length,
      items
    });
  } catch (e) {
    console.error("[KOCW] error:", e.message);
    res.status(500).json({ error: e.message });
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (process.env.KOCW_MOCK === "1") {
      return res.json({ id, title: `MOCK 상세 ${id}`, body: "MOCK" });
    }
    const base = process.env.KOCW_BASE;
    const apiKey = process.env.KOCW_API_KEY;
    const url = new URL(`/api/courses/${id}`, base);
    url.searchParams.set("apikey", apiKey);

    const r = await fetch(url.toString());
    if (!r.ok) throw new Error(`KOCW ${r.status}`);
    const raw = await r.json();
    res.json(raw);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
