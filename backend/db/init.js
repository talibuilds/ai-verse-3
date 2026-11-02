import pool from '../db/pool.js';

/**
 * Ensures the registrations table exists.
 * Call once on server startup (optional).
 */
export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS registrations (
      id            SERIAL PRIMARY KEY,
      name          VARCHAR(120)  NOT NULL,
      email         VARCHAR(150)  NOT NULL UNIQUE,
      phone         VARCHAR(20),
      college       VARCHAR(200),
      team_name     VARCHAR(100),
      track         VARCHAR(100),
      created_at    TIMESTAMPTZ   DEFAULT NOW()
    );
  `);
  console.log('✅  Database table "registrations" is ready.');
}
