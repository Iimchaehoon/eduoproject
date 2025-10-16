
export default function Footer(){
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="container-6xl py-10 grid grid-cols-1 sm:grid-cols-4 gap-8 text-sm text-gray-600">
        <div><div className="flex items-center gap-2 font-semibold mb-2">
          <img src="/img/main_logo.png" className="h-6" alt="logo"/> EDUO</div>
          <p>AI 기반 교육으로 전 세계 학습자들에게 맞춤형 학습을 제공합니다.</p></div>
        <div><h4 className="font-semibold mb-2">플랫폼</h4><ul className="space-y-1"><li>강좌</li><li>AI 튜터</li><li>인증서</li></ul></div>
        <div><h4 className="font-semibold mb-2">자료</h4><ul className="space-y-1"><li>도움 센터</li><li>블로그</li><li>API 문서</li></ul></div>
        <div><h4 className="font-semibold mb-2">회사</h4><ul className="space-y-1"><li>회사 소개</li><li>채용 정보</li><li>개인정보 처리방침</li></ul></div>
      </div>
      <div className="text-center text-xs text-gray-400 py-4 border-t">© 2025 EDUO. 인공지능을 통한 교육 혁신.</div>
    </footer>
  )
}
