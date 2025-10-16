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

// ✅ 클라이언트가 호출하는 경로와 일치시키기
app.use("/api/kocw", kocw);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API on http://localhost:${port}`);
});
