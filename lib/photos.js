import { pool } from './db.js';

export async function getPhotos() {
  const { rows } = await pool.query(
    `SELECT id, slug, title, image, location, description, creator
     FROM photos
     ORDER BY id DESC`
  );
  return rows;
}

// Returns public fields only (no creator_email) for use on the detail page.
export async function getPhoto(slug) {
  const { rows } = await pool.query(
    `SELECT id, slug, title, image, location, description, creator
     FROM photos
     WHERE slug = $1`,
    [slug]
  );
  return rows[0] ?? null;
}

// Expects photo.image to be a path string (e.g. /images/foo.jpg), not a File.
// If photo.slug is missing, it is derived from photo.title (lowercased, hyphenated, unique).
export async function savePhoto(photo) {
  let { slug, title, image, location, description, creator, creator_email } = photo;

  if (!slug || String(slug).trim() === '') {
    const base = String(title)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    slug = base || 'untitled';
    const { rows } = await pool.query(
      'SELECT slug FROM photos WHERE slug = $1 OR slug LIKE $2',
      [slug, `${slug}-%`]
    );
    const existing = new Set(rows.map((r) => r.slug));
    if (existing.has(slug)) {
      let n = 2;
      while (existing.has(`${slug}-${n}`)) n++;
      slug = `${slug}-${n}`;
    }
  }

  const { rowCount } = await pool.query(
    `INSERT INTO photos (slug, title, image, location, description, creator, creator_email)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     ON CONFLICT (slug) DO NOTHING`,
    [slug, title, image, location, description, creator, creator_email]
  );
  return rowCount > 0;
}