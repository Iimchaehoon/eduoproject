export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="container-xl py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm text-ink-700">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/img/main_logo.png" className="h-7" />
            <span className="font-semibold text-lg">EDUO</span>
          </div>
          <p className="text-ink-500">AI 기반 교육으로 전 세계 학습자들에게 맞춤형 학습을 제공합니다.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">플랫폼</h4>
          <ul className="space-y-2">
            <li>강좌</li><li>AI 튜터</li><li>진행 상황 추적</li><li>인증서</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">자료</h4>
          <ul className="space-y-2">
            <li>도움 센터</li><li>커뮤니티</li><li>블로그</li><li>API 문서</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">회사</h4>
          <ul className="space-y-2">
            <li>회사 소개</li><li>채용 정보</li><li>개인정보 처리방침</li><li>서비스 약관</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-ink-500 py-6 border-t border-gray-100">© 2025 EDUO. 인공지능을 통한 교육 혁신.</div>
    </footer>
  );
}

