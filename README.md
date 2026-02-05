# Photo Sharify

A photo-sharing app built with Next.js. Browse a community photo gallery, view individual photos, and share your own with title, location, and description.

## Tech Stack

- **Next.js 16** (App Router) with **React 19**
- **PostgreSQL** via `pg` (raw SQL, no ORM)
- **Tailwind CSS** for styling
- **slugify** and **xss** for safe slugs and sanitized content

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn, pnpm, bun)

### Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment** – Create `.env.local` with your PostgreSQL connection string:

   ```
   DATABASE_URL=postgresql://user:password@host:5432/database
   ```

   For local dev you can use a [Neon](https://neon.tech), [Supabase](https://supabase.com), or local Postgres URL.

3. **Initialize the database** (creates the `photos` table)

   ```bash
   npm run db:init
   ```

4. **Seed sample photos** (optional)

   ```bash
   npm run db:seed
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Project Scripts

| Script   | Description              |
| -------- | ------------------------ |
| `npm run dev`     | Start dev server (Next.js) |
| `npm run build`   | Production build          |
| `npm run start`   | Run production server     |
| `npm run lint`    | Run ESLint                |
| `npm run db:init` | Create DB schema (photos table) |
| `npm run db:seed` | Seed sample photos        |

## Features

- **Home** – Landing page with links to community and share
- **Community** – Grid of all shared photos
- **Photo detail** – Individual photo page by slug (e.g. `/photos/golden-hour-over-paris`)
- **Share** – Form to upload a photo with title, location, description, and creator info

## Database

The app uses **PostgreSQL**. Set `DATABASE_URL` (and optionally `DATABASE_URL_UNPOOLED` for scripts) in `.env.local`. Schema is created with `npm run db:init`; sample data is loaded with `npm run db:seed`. There is no ORM or migrations tool—queries live in `lib/photos.js` and scripts in `scripts/`.

## Learn More 

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)

## License

This project is licensed under the [MIT License](LICENSE).
