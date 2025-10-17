/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C6BFF",
        // 'text-ink'가 나오도록 DEFAULT 추가 (나머지 shade는 유지)
        ink: {
          DEFAULT: "#0F1B2D",   // ← 이 줄 추가
          900: "#0f172a",
          700: "#334155",
          500: "#64748b",
        },
        // border-skin-ring 클래스는 이미 작동함
        skin: { base: "#f7f9fc", ring: "rgba(15,23,42,0.08)" },
      },
      boxShadow: {
        soft: "0 6px 18px rgba(2, 6, 23, 0.06)",
        // 카드 그림자 추가 (tailwind.css의 shadow-card 대응)
        card: "0 18px 44px rgba(23,38,80,0.20)",  // ← 이 줄 추가
      },
      // tailwind.css에서 쓰는 ease-pleasant 대응
      transitionTimingFunction: {
        pleasant: "cubic-bezier(.22,.61,.36,1)", // ← 이 블록 추가
      },
      // 필요하면 쓰고, 안 쓰면 그대로 둬도 됨
      borderRadius: { xl2: "1rem" },
    },
  },
  plugins: [],
};
