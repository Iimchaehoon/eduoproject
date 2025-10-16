// server/src/index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import aiRouter from './routes/ai.js';

const app = express();

const ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json());

app.use('/api/ai', aiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
