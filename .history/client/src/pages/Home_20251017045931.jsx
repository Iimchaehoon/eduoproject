// src/pages/Home.jsx
import { COURSES } from "../shared/courseData.js";
import CourseCard from "../components/shard/CourseCard.jsx";

export default function Home() {
  // 메인 섹션에는 앞에서 다양한 썸네일을 가진 코스 몇 개만 노출
  const picks = COURSES.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      {/* ... (기존 히어로/검색바 등 다른 영역은 건드리지 않음) ... */}

      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">인기 강좌</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {picks.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
