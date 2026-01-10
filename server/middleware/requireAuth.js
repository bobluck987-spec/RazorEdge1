import { users } from '../data/users.js';

export function requireAuth(roles = []) {
  return (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth) {
      return res.status(401).json({ error: 'No token' });
    }

    const id = Number(auth.replace('Bearer token-', ''));
    const user = users.find((u) => u.id === id);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = user;
    next();
  };
}
