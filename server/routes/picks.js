import express from 'express';
import { picks } from '../data/picks.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

/**
 * GET /api/picks
 */
router.get('/', requireAuth(['free', 'premium', 'admin']), (req, res) => {
  const user = req.user;

  const visiblePicks =
    user.role === 'free' ? picks.filter((p) => p.access === 'free') : picks;

  res.json(visiblePicks);
});

/**
 * POST /api/picks (admin)
 */
router.post('/', requireAuth(['admin']), (req, res) => {
  const newPick = {
    id: picks.length + 1,
    status: 'pending',
    ...req.body,
  };

  picks.push(newPick);
  res.json(newPick);
});

/**
 * PUT /api/picks/:id (admin)
 */
router.put('/:id', requireAuth(['admin']), (req, res) => {
  const pick = picks.find((p) => p.id === Number(req.params.id));
  if (!pick) return res.sendStatus(404);

  Object.assign(pick, req.body);
  res.json(pick);
});

/**
 * POST /api/picks/:id/grade (admin)
 */
router.post('/:id/grade', requireAuth(['admin']), (req, res) => {
  const { status } = req.body;
  const pick = picks.find((p) => p.id === Number(req.params.id));

  if (!pick) return res.sendStatus(404);

  pick.status = status;
  res.json(pick);
});

export default router;
