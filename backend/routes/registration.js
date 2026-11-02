import { Router } from 'express';
import pool from '../db/pool.js';

const router = Router();

// ─── POST /api/register ───────────────────────────────────────────────────────
// Body: { name, email, phone, college, team_name, track }
router.post('/register', async (req, res) => {
  const { name, email, phone, college, team_name, track } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO registrations (name, email, phone, college, team_name, track)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, created_at`,
      [name, email, phone || null, college || null, team_name || null, track || null]
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful!',
      data: result.rows[0],
    });
  } catch (err) {
    // Unique constraint → duplicate email
    if (err.code === '23505') {
      return res.status(409).json({ success: false, message: 'This email is already registered.' });
    }
    console.error('Registration error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// ─── GET /api/registrations (admin — protect this in production) ──────────────
router.get('/registrations', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, college, team_name, track, created_at FROM registrations ORDER BY created_at DESC'
    );
    return res.json({ success: true, count: result.rowCount, data: result.rows });
  } catch (err) {
    console.error('Fetch registrations error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;
