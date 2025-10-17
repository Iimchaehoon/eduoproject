// ...기존 import/코드 유지
export default function Navbar() {
  return (
    <header className="w-full bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8 max-w-[1200px]">
        {/* ✅ 로고: 비율 유지, 오토 폭, object-contain */}
        <a href="/" className="inline-flex items-center gap-2">
          <img
            src="/img/main_logo.png"
            alt="EDUO"
            className="h-8 sm:h-10 w-auto object-contain"
            draggable={false}
          />
          <span className="sr-only">EDUO</span>
        </a>

        {/* ...우측 메뉴/검색 등 기존 코드 유지 */}
      </div>
    </header>
  );
}
