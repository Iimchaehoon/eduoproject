// src/components/shard/CourseCard.jsx
import { useNavigate, Link } from "react-router-dom";

/**
 * props.course 예시
 * {
 *   id: "c01",
 *   title: "인류학의 이해",
 *   teacher: "김○○",
 *   uni: "전북대학교",
 *   weeks: 14,
 *   learners: "12.4만",
 *   rating: 4.6,
 *   badge: "입문",          // 좌상단 배지
 *   thumb: "seed",         // /public/img/seed.png 처럼 파일 키
 *   slug: "anthropology-basics"
 * }
 */
export default function CourseCard({ course }) {
  const nav = useNavigate();
  const {
    title,
    teacher,
    uni,
    weeks,
    learners,
    rating,
    badge,
    thumb,
    slug,
  } = course;

  const imgSrc = `/img/${thumb}.png`;

  const gotoCourse = () => nav(`/course/${slug}`);

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden hover:shadow-lg transition">
      {/* 배지 */}
      {badge && (
        <div className="absolute z-10 mt-3 ml-3">
          <span className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700">
            {badge}
          </span>
        </div>
      )}

      {/* 썸네일 */}
      <div className="h-[180px] w-full bg-slate-100 overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          onError={(e) => (e.currentTarget.src = "/img/main_logo.png")}
          className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-300"
        />
      </div>

      {/* 본문 */}
      <div className="p-4">
        <div className="text-slate-400 text-xs">{uni} · {teacher}</div>
        <h3 className="font-semibold mt-1 line-clamp-1">{title}</h3>

        <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-sky-500" />
            {weeks}주
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-violet-500" />
            {learners} 학습
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
            {rating}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Link
            to={`/course/${slug}`}
            className="px-4 h-10 rounded-xl border text-slate-700 grid place-items-center text-sm hover:bg-slate-50"
          >
            강좌 보기
          </Link>
          <button
            onClick={gotoCourse}
            className="px-4 h-10 rounded-xl bg-primary text-white grid place-items-center text-sm hover:brightness-105"
          >
            수강신청
          </button>
        </div>
      </div>
    </div>
  );
}
