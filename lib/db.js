import pg from 'pg';
const { Pool } = pg;

const url = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: url,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});