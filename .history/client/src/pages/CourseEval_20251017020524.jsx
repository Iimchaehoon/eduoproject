import { useParams } from "react-router-dom";

export default function CourseEval(){
  const { slug } = useParams();
  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      <div className="bg-white rounded-2xl border p-5 flex items-center justify-between">
        <div>
          <div className="text-slate-500 text-sm">서울대학교 컴퓨터공학과 김교수</div>
          <h1 className="text-xl font-bold mt-1">강의 평가</h1>
        </div>
        <div className="rounded-xl bg-[#F5F8FF] px-4 py-3 text-right">
          <div className="text-xs text-slate-500">종합 평점</div>
          <div className="text-2xl font-bold text-[#2C6BFF]">4.8/5.0</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        {/* 전체 만족도 */}
        <div className="bg-white rounded-2xl border p-4 lg:col-span-2">
          <div className="font-semibold mb-3">전체 만족도</div>
          {[
            "강의 전체 평가","강의 내용의 명확성","교수님의 설명력","실습 자료의 퀄리티","학습 난이도 적절성","AI 튜터 도움 정도"
          ].map((t,i)=>(
            <div key={i} className="flex items-center justify-between py-2 border-b last:border-none">
              <div>{t}</div>
              <div className="text-[#5B66FF]">★ 5.0</div>
            </div>
          ))}
        </div>

        {/* 추천 의향 */}
        <div className="bg-white rounded-2xl border p-4">
          <div className="font-semibold mb-3">추천 의향</div>
          <div className="rounded-xl border p-3 bg-[#F6FFED]">
            이 강의를 다른 학습자에게 추천하시겠습니까?
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-2 rounded-lg bg-[#2C6BFF] text-white text-sm">적극 추천</button>
              <button className="px-3 py-2 rounded-lg border text-sm">추천하지 않음</button>
            </div>
          </div>
          <div className="mt-4 rounded-xl border p-3">
            <div className="font-medium">수료증 획득</div>
            <div className="text-sm text-slate-500 mt-1">과정을 성공적으로 완료했습니다</div>
          </div>
        </div>
      </div>

      {/* 상세 후기 */}
      <div className="bg-white rounded-2xl border p-4 mt-5">
        <div className="font-semibold mb-3">상세 후기 작성</div>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="border rounded-lg px-3 py-2 text-sm" placeholder="좋았던 점(예: 예제가 좋아요)"/>
          <input className="border rounded-lg px-3 py-2 text-sm" placeholder="개선점(예: 더 많은 미션)"/>
        </div>
        <textarea className="mt-3 w-full h-28 border rounded-lg px-3 py-2 text-sm" placeholder="구체적인 의견을 남겨주세요."/>
        <div className="mt-3 flex justify-end gap-2">
          <button className="px-3 py-2 rounded-lg border text-sm">임시저장</button>
          <button className="px-3 py-2 rounded-lg bg-[#2C6BFF] text-white text-sm">평가 올리기</button>
        </div>
      </div>
    </div>
  );
}
