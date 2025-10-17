export default function Footer(){
  return (
    <footer className="border-t border-skin-ring bg-white mt-20">
      <div className="max-w-6xl mx-auto px-5 py-12 grid md:grid-cols-4 gap-10 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/img/main_logo.png" className="h-8 w-8 rounded-full" alt="" />
            <div className="font-semibold">EDUO</div>
          </div>
          <p className="text-slate-500 leading-6">AI 기반 교육으로 전 세계 학습자들에게 맞춤형 학습 스타일을 제안합니다. 누구나 고품질 수업을 경험할 수 있는 서비스를 제공합니다.</p>
        </div>
        <div>
          <div className="font-semibold mb-3">플랫폼</div>
          <ul className="space-y-2 text-slate-600">
            <li>강좌</li><li>AI 튜터</li><li>진행 상황 추적</li><li>인증서</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">자료</div>
          <ul className="space-y-2 text-slate-600">
            <li>도움 센터</li><li>커뮤니티</li><li>블로그</li><li>API 문서</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">회사</div>
          <ul className="space-y-2 text-slate-600">
            <li>회사 소개</li><li>채용 정보</li><li>개인정보 처리방침</li><li>서비스 약관</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-slate-400 text-sm py-6 border-t border-skin-ring">© 2025 EDUO. 모든 권리 보유. 인공지능을 통한 교육 혁신.</div>
    </footer>
  )
}
