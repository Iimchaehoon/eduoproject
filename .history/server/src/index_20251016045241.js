import express from "express";
import cors from "cors";
import aiRouter from "./routes/ai.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRouter);

app.get("/", (_, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
