import Header from "../shared/Header";
import Footer from "../shared/Footer";
import AICoach from "../shared/AICoach";

const DUMMY_CONTEXT = `
클래스는 객체를 생성하기 위한 템플릿이다. 속성과 메서드를 정의한다.
class Student: 
  def __init__(self, name, age): ...
`;

export default function Course() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section className="container-xl py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 영상 영역 */}
        <div className="lg:col-span-8 card overflow-hidden">
          <div className="aspect-video bg-black flex items-center justify-center">
            {/* 공공데이터 대신 안내된 대체 링크 사용 */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/PRz4NVM3CVw"
              title="강의 영상"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-5">
            <h1 className="text-xl font-semibold">파이썬 객체지향 프로그래밍</h1>
            <div className="mt-4">
              <div className="p-4 border rounded-lg bg-slate-50">
                <div className="font-semibold mb-2">핵심 개념</div>
                <pre className="text-sm text-ink-700 whitespace-pre-wrap">{DUMMY_CONTEXT}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* AI 코치 */}
        <div className="lg:col-span-4">
          <AICoach contextText={DUMMY_CONTEXT} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
