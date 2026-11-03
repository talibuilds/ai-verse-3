import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';

import registrationRouter from './routes/registration.js';
import { initDb } from './db/init.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api', registrationRouter);

// ─── Serve Frontend (production) ─────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');

app.use(express.static(frontendDist));

// Root and any unmatched route → serve frontend index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`✅  AI Verse backend running on http://localhost:${PORT}`);
  try {
    await initDb();
  } catch (err) {
    console.error('⚠️  DB init failed (check DATABASE_URL):', err.message);
  }
});
