import sql from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';

import slugify from 'slugify';
import xss from 'xss';

const db = sql(path.join(process.cwd(), 'photos.db'));

export function getPhotos() {
  return db.prepare('SELECT * FROM photos').all();
}

export function getPhoto(slug) {
  return db.prepare('SELECT * FROM photos WHERE slug = ?').get(slug) ?? null;
}

export async function savePhoto(photo) {
  photo.slug = slugify(photo.title, { lower: true });
  photo.description = xss(photo.description);

  const photos = getPhotos();
  const existingSlugs = new Set(photos.map((p) => p.slug));
  let slug = photo.slug;
  let counter = 2;
  while (existingSlugs.has(slug)) {
    slug = `${photo.slug}-${counter}`;
    counter++;
  }
  photo.slug = slug;

  const extension = photo.image.name.split('.').pop();
  const fileName = `${photo.slug}.${extension}`;
  const filePath = path.join(process.cwd(), 'public', 'images', fileName);
  const bufferedImage = await photo.image.arrayBuffer();

  fs.writeFileSync(filePath, Buffer.from(bufferedImage));

  photo.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO photos (slug, title, image, location, description, creator, creator_email)
    VALUES (@slug, @title, @image, @location, @description, @creator, @creator_email)
  `
  ).run({
    slug: photo.slug,
    title: photo.title,
    image: photo.image,
    location: photo.location,
    description: photo.description,
    creator: photo.creator,
    creator_email: photo.creator_email,
  });
}
