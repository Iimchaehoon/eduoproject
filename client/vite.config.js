// client/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 5173,
    open: true,
    proxy: { "/api": "http://localhost:5000" },
    // hmr: { overlay: true } // ← 굳이 안 써도 기본값이 true
  },
});
