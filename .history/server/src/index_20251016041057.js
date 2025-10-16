
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));

import authRouter from './routes/auth.js';
import aiRouter from './routes/ai.js';
import coursesRouter from './routes/courses.js';
app.use('/api/auth', authRouter);
app.use('/api/ai', aiRouter);
app.use('/api/courses', coursesRouter);

app.get('/', (req,res)=>res.json({ok:true, service:'EDUO API'}));
app.listen(PORT, ()=>console.log(`API running on http://localhost:${PORT}`));
