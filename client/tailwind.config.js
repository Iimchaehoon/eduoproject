/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#575DFB",
        ink: "#0F172A",
        muted: "#64748B",
        skin: { card: "#FFFFFF", base: "#F6F7FB", ring: "#E2E8F0" }
      },
      boxShadow: { card: "0 10px 20px rgba(2, 8, 23, 0.06)", soft: "0 6px 12px rgba(2,8,23,0.10)" },
      borderRadius: { xl2: "1rem" },
      transitionTimingFunction: { pleasant: "cubic-bezier(.2,.8,.2,1)" }
    },
  },
  plugins: [],
}
