import "dotenv/config";
import express from "express";
import cors from "cors";
import kocw from "./routes/kocw.js";

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN?.split(",") ?? "*"
  })
);
app.use(express.json());

// ★ 간단한 요청 로그
app.use((req, _res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

app.use("/api", kocw);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API on http://localhost:${port}`);
});
