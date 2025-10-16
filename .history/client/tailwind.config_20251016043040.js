
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#5b5ef7",     // CTA 보라 버튼
          600: "#4a4df0",
          700: "#3e42d7",
        },
        ink: {
          900: "#0f172a",     // 거의 검정
          700: "#334155",     // 본문
          500: "#64748b",     // 보조 텍스트
        },
        card: "#ffffff",
        bg: "#f7f8fb",       // 페이지 배경(피그마 회백)
      },
      boxShadow: {
        card: "0 10px 30px rgba(16, 24, 40, 0.08)",
        soft: "0 4px 14px rgba(16,24,40,0.06)",
      },
      borderRadius: {
        xl2: "16px",
      },
    },
    fontFamily: {
      sans: ["Pretendard", "Inter", "system-ui", "apple-system", "Segoe UI", "sans-serif"],
    },
  },
  plugins: [],
};
