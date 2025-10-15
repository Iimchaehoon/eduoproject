
import { Router } from 'express';
const router = Router();

// 아주 간단한 데모용 (토큰 없이)
router.post('/login', (req, res) => {
  const { email } = req.body;
  return res.json({ user: { id: 'u_demo', email }, token: 'dev-token' });
});

router.post('/register', (req, res) => {
  const { email } = req.body;
  return res.json({ user: { id: 'u_demo', email }, token: 'dev-token' });
});

export default router;
