import { pool } from './db.js';

export async function getPhotos() {
  const { rows } = await pool.query(
    `SELECT id, slug, title, image, location, description, creator
     FROM photos
     ORDER BY id DESC`
  );
  return rows;
}

export async function getPhoto(slug) {
  const { rows } = await pool.query(
    `SELECT id, slug, title, image, location, description, creator, creator_email
     FROM photos
     WHERE slug = $1`,
    [slug]
  );
  return rows[0] ?? null;
}

// Expects photo.image to be a path string (e.g. /images/foo.jpg), not a File.
export async function savePhoto(photo) {
  const { slug, title, image, location, description, creator, creator_email } = photo;

  await pool.query(
    `INSERT INTO photos (slug, title, image, location, description, creator, creator_email)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     ON CONFLICT (slug) DO UPDATE SET
       title = EXCLUDED.title,
       image = EXCLUDED.image,
       location = EXCLUDED.location,
       description = EXCLUDED.description,
       creator = EXCLUDED.creator,
       creator_email = EXCLUDED.creator_email`,
    [slug, title, image, location, description, creator, creator_email]
  );
}