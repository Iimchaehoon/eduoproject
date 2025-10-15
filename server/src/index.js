
import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import coursesRouter from './routes/courses.js';
import aiRouter from './routes/ai.js';
import authRouter from './routes/auth.js';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, service: 'EDUO API' }));

app.use('/api/auth', authRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/ai', aiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
