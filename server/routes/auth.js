import express from 'express';
import { users } from '../data/users.js';

const router = express.Router();

/**
 * POST /api/auth/register
 */
router.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const exists = users.find((u) => u.email === email);
  if (exists) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const newUser = {
    id: users.length + 1,
    email,
    password, // plaintext for now (dev only)
    role: 'free',
  };

  users.push(newUser);

  res.json({
    token: `token-${newUser.id}`,
    user: {
      email: newUser.email,
      role: newUser.role,
    },
  });
});

/**
 * POST /api/auth/login
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({
    token: `token-${user.id}`,
    user: {
      email: user.email,
      role: user.role,
    },
  });
});

export default router;
