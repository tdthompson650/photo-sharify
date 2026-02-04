import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise(resolve => setTimeout(resolve, 5000));

    //throw new Error('Failed to fetch meals');
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    //slug is injected into the ? placeholder
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    //create a slug from the title
    meal.slug = slugify(meal.title, { lower: true });
    //sanitize the instructions to prevent XSS attacks
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    //write the image to the public/images directory
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    //convert the image to a buffer
    const bufferedImage = await meal.image.arrayBuffer();

    //create a stream to write the image to the public/images directory
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed');
        }
    });

    //update the meal object with the image path
    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals 
        (title, summary, instructions, creator, creator_email, image, slug) 
        VALUES (
        @title, @summary, @instructions, @creator, @creator_email, @image, @slug
        )` ).run(meal);
}