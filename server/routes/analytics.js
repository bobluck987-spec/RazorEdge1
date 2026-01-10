import express from 'express';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

/**
 * GET /api/analytics/summary
 * Auth: any logged-in user
 */
router.get('/summary', requireAuth(), (req, res) => {
  const picks = req.app.locals.picks || [];

  const graded = picks.filter((p) => p.status !== 'pending');

  const wins = graded.filter((p) => p.status === 'win').length;
  const losses = graded.filter((p) => p.status === 'loss').length;
  const pushes = graded.filter((p) => p.status === 'push').length;

  const roi = graded.length
    ? (((wins - losses) / graded.length) * 100).toFixed(2)
    : '0.00';

  res.json({
    total: graded.length,
    wins,
    losses,
    pushes,
    roi,
  });
});

/**
 * GET /api/analytics/history
 * Auth: any logged-in user
 */
router.get('/history', requireAuth(), (req, res) => {
  const picks = req.app.locals.picks || [];

  const history = picks
    .filter((p) => p.status !== 'pending')
    .map((p) => ({
      date: p.date,
      result: p.status,
    }));

  res.json(history);
});

export default router;
