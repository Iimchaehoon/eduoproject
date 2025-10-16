// server/src/routes/kocw.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

/** -------------------------------------------------
 * 1) 임시 MOCK 스위치
 *    .env 에서 MOCK=1 로 켜두면 KOCW 대신
 *    아래 demoItems 를 서버에서 필터/페이지 처리해서 돌려줍니다.
 *    연결 확인/검색동작 검증 후 KOCW BASE/필드만 맞추면 바로 실운영 가능.
 * ------------------------------------------------- */
const MOCK = process.env.MOCK === "1";

/** 프록시가 붙었는지/서버가 살아있는지 간단 확인용 */
router.get("/ping", (req, res) => res.json({ ok: true }));

/** 데모 데이터(서버측) - 프론트의 9개와 동일 스키마 */
const demoItems = [
  {
    id: "cloud-sec",
    title: "클라우드 보안 엔지니어 실무과정",
    professor: "최시윤",
    university: "한동대학교",
    thumbnail: "/img/cloud.png",
    summary: "",
    weeks: "14주",
    learners: 23000,
    rating: 4.9,
    level: "중급",
    lang: "한국어",
  },
  {
    id: "human-under",
    title: "인류학의 이해",
    professor: "최신",
    university: "전북대학교",
    thumbnail: "/img/human.png",
    summary: "",
    weeks: "14주",
    learners: 23000,
    rating: 4.6,
    level: "입문",
    lang: "한국어",
  },
  {
    id: "battery-sys",
    title: "전기자동차 배터리 시스템",
    professor: "정시윤",
    university: "한국폴리텍",
    thumbnail: "/img/battery.png",
    summary: "",
    weeks: "14주",
    learners: 23000,
    rating: 4.7,
    level: "중급",
    lang: "한국어",
  },
  {
    id: "pandas-basic",
    title: "Python 및 Pandas 활용 데이터 분석 기초 과정",
    professor: "김도형",
    university: "부산대학교",
    thumbnail: "/img/pandas.png",
    summary: "",
    weeks: "14주",
    learners: 23000,
    rating: 4.6,
    level: "입문",
    lang: "한국어",
  },
  {
    id: "react-advanced",
    title: "리액트 고급 개발",
    professor: "이명환",
    university: "서울대학교",
    thumbnail: "/img/react.png",
    summary: "",
    weeks: "14주",
    learners: 23000,
    rating: 4.8,
    level: "고급",
    lang: "한국어",
  },
  {
    id: "dataviz-master",
    title: "데이터 시각화 마스터클래스",
    professor: "박시경",
    university: "연세대학교",
    thumbnail: "/img/data.png",
    summary: "",
    weeks: "14주",
    learners: 23000,
    rating: 4.7,
    level: "중급",
    lang: "한국어",
  },
  {
    id: "block-basic",
    title: "블록체인 기초부터 실무",
    professor: "최필윤희",
    university: "한양대학교",
    thumbnail: "/img/block.png",
    summary: "",
    weeks: "14주",
    learners: 23000,
    rating: 4.6,
    level: "입문",
    lang: "한국어",
  },
  {
    id: "dl-nn",
    title: "신경망 및 딥러닝",
    professor: "김세라",
    university: "고려대학교",
    thumbnail: "/img/deep.png",
    summary: "",
    weeks: "14주",
    learners: 23000,
    rating: 4.9,
    level: "고급",
    lang: "한국어",
  },
  {
    id: "bio-ai",
    title: "생체데이터와 인공지능의 이해",
    professor: "유현",
    university: "중앙대학교",
    thumbnail: "/img/seed.png",
    summary: "",
    weeks: "14주",
    learners: 23000,
    rating: 4.6,
    level: "중급",
    lang: "한국어",
  },
];

function mapToCard(it) {
  return {
    slug: it.id ?? it.courseId ?? `kocw-${Math.random().toString(36).slice(2, 9)}`,
    title: it.title ?? it.name,
    teacher: `${it.professor ?? it.instructor ?? "강사미상"} · ${it.university ?? it.org ?? "기관미상"}`,
    image: it.thumbnail ?? it.image ?? "/img/cloud.png",
    desc: it.summary ?? it.description ?? "",
    weeks: it.weeks ?? it.durationWeeks ?? "14주",
    students: `${it.learners ?? it.hits ?? 23000}명`,
    rating: Number(it.rating ?? 4.6).toFixed(1),
  };
}

/** 목록/검색 */
router.get("/search", async (req, res) => {
  const { q = "", page = "1", size = "12", lang = "", level = "", uni = "" } = req.query;
  const pageNum = Math.max(1, Number(page) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(size) || 12));

  // 1) MOCK 모드: 서버에서 필터 + 페이지네이션
  if (MOCK) {
    let list = [...demoItems];
    const qLower = String(q).toLowerCase();

    if (qLower) list = list.filter(it => `${it.title} ${it.professor} ${it.university}`.toLowerCase().includes(qLower));
    if (lang)  list = list.filter(it => it.lang === lang);
    if (level) list = list.filter(it => it.level === level);
    if (uni)   list = list.filter(it => it.university.includes(uni));

    const total = list.length;
    const start = (pageNum - 1) * pageSize;
    const slice = list.slice(start, start + pageSize);

    return res.json({
      page: pageNum,
      size: pageSize,
      total,
      items: slice.map(mapToCard),
      source: "mock",
    });
  }

  // 2) 실 API 모드: 실제 KOCW 엔드포인트 맞추기
  try {
    const base = process.env.KOCW_BASE; // ex) https://openapi.kocw.or.kr
    const apiKey = process.env.KOCW_API_KEY;

    // ⭐ 여기를 실제 스펙에 맞게만 바꿔주면 됩니다.
    const url = new URL("/api/courses", base);
    url.searchParams.set("query", q);
    url.searchParams.set("page", String(pageNum));
    url.searchParams.set("size", String(pageSize));
    url.searchParams.set("apikey", apiKey);
    if (lang) url.searchParams.set("lang", lang);
    if (level) url.searchParams.set("level", level);
    if (uni) url.searchParams.set("university", uni);

    const r = await fetch(url.toString());
    if (!r.ok) throw new Error(`KOCW ${r.status}`);
    const raw = await r.json();

    const items = (raw.items || raw.data || []).map(mapToCard);
    res.json({
      page: pageNum,
      size: pageSize,
      total: raw.total || raw.totalCount || items.length,
      items,
      source: "kocw",
    });
  } catch (e) {
    console.error("[/api/search] error:", e);
    // 네트워크/스펙 오류시라도 빈배열 대신 안전 리턴
    res.status(200).json({ page: pageNum, size: pageSize, total: 0, items: [], source: "error" });
  }
});

/** 상세 (원하면) */
router.get("/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (MOCK) {
      const one = demoItems.find(d => d.id === id);
      if (!one) return res.status(404).json({ error: "not found" });
      return res.json(one);
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
    console.error("[/api/detail] error:", e);
    res.status(500).json({ error: e.message });
  }
});

export default router;
