import { useParams, Link } from "react-router-dom";

export default function Course() {
  const { slug } = useParams();
  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-xl font-bold">강의 페이지</h1>
        <p className="text-slate-600 mt-2">slug: {slug}</p>

        <div className="bg-slate-900 h-[240px] mt-6 rounded-xl grid place-items-center text-white">
          ▶ 플레이어 자리
        </div>

        <div className="mt-6">
          <Link
            to={`/course/${slug}/eval`}
            className="px-3 py-2 rounded-lg bg-[#2C6BFF] text-white"
          >
            강의평가로 가기
          </Link>
        </div>
      </div>
    </div>
  );
}
