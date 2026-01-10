import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import pickRoutes from './routes/picks.js';
import analyticsRoutes from './routes/analytics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ THIS WAS MISSING OR MOVED
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory store (StackBlitz-safe)
app.locals.picks = [];

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/picks', pickRoutes);
app.use('/api/analytics', analyticsRoutes);

// Serve client build
app.use(express.static(path.join(__dirname, '../client/dist')));

// SPA fallback (HashRouter-safe)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
