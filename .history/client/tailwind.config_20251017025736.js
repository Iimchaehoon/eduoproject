/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C6BFF",
        ink: {
          900: "#0f172a",
          700: "#334155",
          500: "#64748b",
        },
        skin: {
          base: "#f7f9fc",
          ring: "rgba(15, 23, 42, 0.08)",
        },
      },
      boxShadow: {
        soft: "0 6px 18px rgba(2, 6, 23, 0.06)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};
