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

// 여기 중요: /api + (위 라우터의 '/search', '/ping' 등) => /api/search, /api/ping
app.use("/api", kocw);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API on http://localhost:${port}`);
});
