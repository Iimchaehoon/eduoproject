// src/pages/Search.jsx
import { useMemo, useState } from "react";
import CourseCard from "../components/CourseCard.jsx";

const RAW = [
  // 9개 예시 (이미지 파일은 /public/img 에 있어야 함)
  { id: 1, title: "인류학의 이해",   school: "전북대학교", teacher: "김OO", weeks: 14, rating: 4.6, students:"12.4만", img: "/img/seed.png", slug:"mock-1-1", tags:["교양","인문"] },
  { id: 2, title: "파이썬으로 데이터 과학", school: "부산대학교", teacher: "박OO", weeks: 14, rating: 4.6, students:"12.4만", img: "/img/data.png", slug:"mock-1-2", tags:["데이터","AI"] },
  { id: 3, title: "리액트 고급 개발", school: "서울대학교", teacher: "이OO", weeks: 14, rating: 4.6, students:"12.4만", img: "/img/react.png", slug:"mock-1-3", tags:["웹","프론트"] },
  { id: 4, title: "데이터 시각화 마스터클래스", school: "연세대학교", teacher: "박OO", weeks: 14, rating: 4.6, students:"12.4만", img: "/img/python_data.png", slug:"mock-1-4", tags:["데이터","시각화"] },
  { id: 5, title: "블록체인 기초부터 실무", school: "한양대학교", teacher: "최OO", weeks: 14, rating: 4.6, students:"12.4만", img: "/img/block.png", slug:"mock-1-5", tags:["블록체인","개발"] },
  { id: 6, title: "신경망 및 딥러닝",   school: "고려대학교", teacher: "김OO", weeks: 14, rating: 4.6, students:"12.4만", img: "/img/deep.png", slug:"mock-1-6", tags:["AI","딥러닝"] },
  { id: 7, title: "컴퓨터과학 개론", school: "한국대학교", teacher: "정OO", weeks: 14, rating: 4.6, students:"12.4만", img: "/img/edu_pro1.png", slug:"mock-1-7", tags:["컴퓨터","CS"] },
  { id: 8, title: "알파고로 배우는 AI", school: "카이스트", teacher: "오OO", weeks: 14, rating: 4.6, students:"12.4만", img: "/img/alfago.png", slug:"mock-1-8", tags:["AI","머신러닝"] },
  { id: 9, title: "배터리 시스템 이해", school: "산업대", teacher: "윤OO", weeks: 14, rating: 4.6, students:"12.4만", img: "/img/battery.png", slug:"mock-1-9", tags:["공학","전기"] },
];

export default function Search() {
  const [q, setQ] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const tags = ["전체", "AI", "데이터", "웹", "프론트", "시각화", "블록체인", "컴퓨터", "공학", "교양", "인문"];
  const filtered = useMemo(() => {
    const k = q.trim().toLowerCase();
    return RAW.filter((c) => {
      const hit =
        c.title.toLowerCase().includes(k) ||
        c.school.toLowerCase().includes(k) ||
        c.teacher.toLowerCase().includes(k);
      const tagOk = !selectedTag || selectedTag === "전체" || c.tags.includes(selectedTag);
      return hit && tagOk;
    });
  }, [q, selectedTag]);

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-8">
      {/* 상단 필터 */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_12px_28px_rgba(16,24,40,.08)]">
        <div className="grid md:grid-cols-3 gap-3">
          <select className="h-11 rounded-lg border px-3 text-sm">
            <option>카테고리 선택</option>
            <option>인문학</option>
            <option>자연과학</option>
            <option>컴퓨터과학</option>
          </select>
          <select className="h-11 rounded-lg border px-3 text-sm">
            <option>교육기관명</option>
            <option>서울대학교</option>
            <option>연세대학교</option>
            <option>부산대학교</option>
          </select>
          <select className="h-11 rounded-lg border px-3 text-sm">
            <option>난이도 선택</option>
            <option>입문</option>
            <option>중급</option>
            <option>고급</option>
          </select>
          <select className="h-11 rounded-lg border px-3 text-sm md:col-span-2">
            <option>기간 선택</option>
            <option>4주</option>
            <option>8주</option>
            <option>12주</option>
          </select>
          <input
            className="h-11 rounded-lg border px-3 text-sm"
            placeholder="찾고 싶은 강좌를 검색해보세요"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        {/* 추천 칩(태그) */}
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t === "전체" ? "" : t)}
              className={`px-3 h-9 rounded-full text-sm border transition
                ${selectedTag === t || (t === "전체" && !selectedTag)
                  ? "bg-[#EEF1FF] text-[#5560FF] border-[#DDE3FF]"
                  : "bg-white text-[#374151] hover:bg-slate-50 border-slate-200"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* 결과(카드 9개) */}
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <CourseCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}
