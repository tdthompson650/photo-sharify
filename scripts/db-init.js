import pg from 'pg';
const { Client } = pg;

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) throw new Error('Missing DATABASE_URL(_UNPOOLED)');

const sql = `
BEGIN;

CREATE TABLE IF NOT EXISTS photos (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  creator TEXT NOT NULL,
  creator_email TEXT NOT NULL
);

COMMIT;
`;

async function main() {
  const client = new Client({
    connectionString: url,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  });

  await client.connect();
  await client.query(sql);
  await client.end();

  console.log('DB schema initialized.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});