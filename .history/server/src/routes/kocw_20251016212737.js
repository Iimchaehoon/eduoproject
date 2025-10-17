import express from "express";
import fetch from "node-fetch";
import createCache from "../lib/cache.js";

const router = express.Router();
const cache = createCache({ ttlMs: 1000 * 60 * 5 }); // 5분 캐시

/** 디버그/헬스체크 */
router.get("/ping", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

/** 서버 내부 목업(외부 API 실패 시 서버가 대신 반환) */
function makeServerMock({ q = "", page = 1, size = 12 }) {
  const pick = [
    { title: "인류학의 이해", teacher: "전북대학교 · 김OO", image: "/img/seed.png" },
    { title: "파이썬으로 데이터 과학", teacher: "부산대학교 · 박OO", image: "/img/pyton_data.png" },
    { title: "리액트 고급 개발", teacher: "서울대학교 · 이OO", image: "/img/react.png" },
    { title: "데이터 시각화 마스터클래스", teacher: "연세대학교 · 박OO", image: "/img/data.png" },
    { title: "블록체인 기초부터 실무", teacher: "한양대학교 · 최OO", image: "/img/block.png" },
    { title: "신경망 및 딥러닝", teacher: "고려대학교 · 김OO", image: "/img/deep.png" },
  ];
  const items = Array.from({ length: Number(size) }).map((_, i) => {
    const src = pick[i % pick.length];
    return {
      slug: `mock-${page}-${i + 1}`,
      title: src.title,
      teacher: src.teacher,
      image: src.image,
      desc: "서버 목업 데이터입니다.",
      weeks: "14주",
      students: "23,000명",
      rating: "4.6",
    };
  });
  return {
    page: Number(page),
    size: Number(size),
    total: 240,
    items,
    source: "server-mock",
    query: q,
  };
}

/** 외부 KOCW → 우리 UI 포맷으로 매핑 */
function mapKocwToUi(raw) {
  const list = raw.items || raw.data || [];
  return list.map((it, idx) => ({
    slug: it.id || it.courseId || it.slug || `kocw-${idx + 1}`,
    title: it.title || it.name || "제목 미상",
    teacher: `${it.professor || it.instructor || "강사미상"} · ${it.university || it.org || "기관미상"}`,
    image: it.thumbnail || it.image || "/img/seed.png",
    desc: it.summary || it.description || "",
    weeks: (it.weeks || it.durationWeeks || 14) + "주",
    students: ((it.learners || it.hits) ?? 23000) + "명",
    rating: (it.rating ?? 4.6).toFixed ? (it.rating).toFixed(1) : "4.6",
  }));
}

/** 목록/검색 */
router.get("/search", async (req, res) => {
  try {
    const { q = "", page = 1, size = 12, lang, level, uni, sort = "latest" } = req.query;

    // 캐시 조회
    const key = `search:${q}:${page}:${size}:${lang || ""}:${level || ""}:${uni || ""}:${sort}`;
    const hit = cache.get(key);
    if (hit) return res.json(hit);

    // 외부 KOCW 설정 (스펙은 기관마다 다름 → 필요 시 쿼리명만 바꾸면 됨)
    const base = process.env.KOCW_BASE;
    const apiKey = process.env.KOCW_API_KEY;

    // 외부 API가 설정되어 있지 않으면 즉시 서버목업 반환
    if (!base || !apiKey) {
      const mock = makeServerMock({ q, page, size });
      cache.set(key, mock);
      return res.json(mock);
    }

    // 예시 URL — 실제 스펙에 맞게 파라미터명만 수정하면 됩니다.
    const url = new URL("/api/courses", base);
    url.searchParams.set("apikey", apiKey);
    if (q) url.searchParams.set("query", q);
    url.searchParams.set("page", page);
    url.searchParams.set("size", size);
    if (lang) url.searchParams.set("lang", lang);
    if (level) url.searchParams.set("level", level);
    if (uni) url.searchParams.set("university", uni);
    if (sort) url.searchParams.set("sort", sort);

    let data;
    try {
      const r = await fetch(url.toString());
      if (!r.ok) throw new Error(`KOCW ${r.status}`);
      const raw = await r.json();
      data = {
        page: Number(page),
        size: Number(size),
        total: raw.total || raw.totalCount || (raw.items?.length ?? 0),
        items: mapKocwToUi(raw),
        source: "kocw",
      };
    } catch (e) {
      // 외부 실패 → 서버 목업으로 대체
      data = makeServerMock({ q, page, size });
      data.error = String(e.message || e);
    }

    cache.set(key, data);
    res.json(data);
  } catch (e) {
    // 최후 방어
    const data = makeServerMock({ q: req.query.q, page: req.query.page, size: req.query.size });
    data.error = String(e.message || e);
    res.json(data);
  }
});

export default router;
