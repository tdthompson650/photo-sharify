import pg from 'pg';
const { Client } = pg;

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) throw new Error('Missing DATABASE_URL(_UNPOOLED)');

const dummyPhotos = [
  {
    title: "Golden Hour Over Paris",
    slug: "golden-hour-over-paris",
    image: "/images/eiffeltower.png",
    location: "Paris, France",
    description: `
      The Eiffel Tower rises above the River Seine as the sun sets over Paris, 
      casting warm golden and amber tones across the city. 
      Reflections shimmer on the water while historic bridges and classic Haussmann 
      architecture frame one of the world’s most iconic urban landscapes.
    `,
    creator: "John Doe",
    creator_email: "johndoe@example.com",
  },
  {
    title: "The Lost City in the Clouds",
    slug: "the-lost-city-in-the-clouds",
    image: "/images/machupicchu.png",
    location: "Machu Picchu, Peru",
    description: `
      Nestled high in the Andes Mountains, Machu Picchu emerges from the mist in soft afternoon light. 
      The ancient stone terraces and ruins contrast vividly with the surrounding green peaks, 
      creating a powerful sense of scale, mystery, and timeless human craftsmanship.
    `,
    creator: "Max Schwarz",
    creator_email: "max@example.com",
  },
  {
    title: "Canyon of Fire and Stone",
    slug: "canyon-of-fire-and-stone",
    image: "/images/grandcanyon.png",
    location: "Grand Canyon, Arizona, USA",
    description: `
      As daylight fades, the Grand Canyon glows with deep reds, purples, and golds, 
      revealing layers carved by millions of years of erosion. 
      The Colorado River winds through the vast landscape below, 
      emphasizing the immense depth and natural drama of the canyon at sunset.
    `,
    creator: "Emily Chen",
    creator_email: "emilychen@example.com",
  },
  {
    title: "Spring Tranquility in Kyoto",
    slug: "spring-tranquility-in-kyoto",
    image: "/images/fushimi.png",
    location: "Kyoto, Japan",
    description: `
      A traditional red torii gate stands amid blooming cherry blossoms as 
      Mount Fuji rises in the distance. Soft evening light bathes the scene, 
      blending natural beauty with cultural symbolism 
      and evoking the quiet elegance of Japan’s historic heart.
    `,
    creator: "Laura Smith",
    creator_email: "laurasmith@example.com",
  },
  {
    title: "City That Never Sleeps",
    slug: "city-that-never-sleeps",
    image: "/images/newyork.png",
    location: "New York City, USA",
    description: `
      New York’s skyline comes alive at dusk as the Empire State Building glows against a colorful twilight sky. 
      Skyscrapers stretch toward the horizon while rivers and bridges reflect the city’s energy, 
      capturing the pulse of one of the world’s most dynamic urban centers.
    `,
    creator: "Mario Rossi",
    creator_email: "mariorossi@example.com",
  },
  {
    title: "Alpine Reflections",
    slug: "alpine-reflections",
    image: "/images/morainelake.png",
    location: "Banff National Park, Alberta, Canada",
    description: `
      Moraine Lake mirrors the snow-capped peaks of the Canadian Rockies under warm sunset light. 
      Turquoise waters, evergreen forests, and rugged mountain faces combine to create 
      a serene yet powerful alpine landscape shaped by nature at its finest.
    `,
    creator: "Franz Huber",
    creator_email: "franzhuber@example.com",
  },
  {
    title: "Aegean Sunset",
    slug: "aegean-sunset",
    image: "/images/santorini.png",
    location: "Santorini, Greece",
    description: `
      Whitewashed buildings and blue-domed churches cascade along 
      the cliffs of Santorini as the sun sets over the Aegean Sea. 
      Soft pastel skies and glowing stone architecture capture the 
      island’s romantic atmosphere and timeless Mediterranean charm.
    `,
    creator: "Sophia Green",
    creator_email: "sophiagreen@example.com",
  },
];

async function main() {
  const client = new Client({
    connectionString: url,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  });

  await client.connect();

  const slugs = dummyPhotos.map((p) => p.slug);

  // re-seed safely: delete only these known seed slugs
  await client.query(`DELETE FROM photos WHERE slug = ANY($1::text[])`, [slugs]);

  for (const p of dummyPhotos) {
    await client.query(
      `INSERT INTO photos (slug, title, image, location, description, creator, creator_email)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        p.slug,
        p.title,
        p.image,
        p.location,
        p.description.trim(),
        p.creator,
        p.creator_email,
      ]
    );
  }

  await client.end();
  console.log('Seeded', dummyPhotos.length, 'photos.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
})