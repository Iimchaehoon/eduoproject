// server/src/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import kocw from "./routes/kocw.js";

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN?.split(",") ?? "*",
  })
);
app.use(express.json());
import { createRoot } from "react-dom/client";

const root = document.getElementById("root");
createRoot(root).render(
  <div style={{padding:24,fontFamily:"system-ui, sans-serif"}}>
    <h1>✅ Vite+React OK</h1>
    <p>지금 이 화면이 보이면 번들/엔트리는 문제 없습니다.</p>
  </div>
);

