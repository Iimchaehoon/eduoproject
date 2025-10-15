
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();
const dataPath = path.join(__dirname, '..', 'data', 'courses.json');

router.get('/', (req, res) => {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  let list = JSON.parse(raw);
  const q = (req.query.q || '').toLowerCase();
  const tag = (req.query.tag || '').toLowerCase();
  if (q) list = list.filter(c => c.title.toLowerCase().includes(q) || c.provider.toLowerCase().includes(q));
  if (tag) list = list.filter(c => c.tags.map(t => t.toLowerCase()).includes(tag));
  res.json(list);
});

router.get('/:id', (req, res) => {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  const list = JSON.parse(raw);
  const item = list.find(c => c.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

export default router;
