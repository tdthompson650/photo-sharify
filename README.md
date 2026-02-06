# PhotoSharify

PhotoSharify is a portfolio demo project built with Next.js that showcases a modern App Router architecture, server components, and a PostgreSQL-backed data layer. The app allows users to browse a community photo gallery and view individual photo pages, with a polished UI and responsive layout.

Uploads are intentionally disabled in the live demo — the project focuses on UI, routing, data fetching, and component design rather than full media storage.

## Tech Stack

- **Next.js 16** (App Router, Server Components) with **React 19**
- **PostgreSQL** via `pg` (raw SQL, no ORM)
- **Tailwind CSS** for styling

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

- **Home** – Responsive landing page with image slideshow and clear calls to action
- **Photo gallery** – Community grid layout with optimized images and hover interactions
- **Photo detail pages** – Dynamic routes by slug with server-side data fetching and metadata
- **Share form (demo)** – Styled form UI demonstrating validation and UX (uploads disabled in demo)

## Design & Architecture Notes

- Uses the Next.js App Router with a clear separation between server and client components
- Data access is handled via raw SQL using `pg` to keep the data layer explicit and transparent
- Images are optimized with `next/image` and responsive sizing
- UI is built with Tailwind CSS, focusing on readability, spacing, and accessibility
- Demo constraints (no uploads) are clearly communicated in the UI

## Database

The app uses **PostgreSQL**. Set `DATABASE_URL` (and optionally `DATABASE_URL_UNPOOLED` for scripts) in `.env.local`. Schema is created with `npm run db:init`; sample data is loaded with `npm run db:seed`. There is no ORM or migrations tool—queries live in `lib/photos.js` and scripts in `scripts/`. Seed images are served from `public/images/`; the home-page slideshow uses bundled assets from `assets/`.

## Learn More 

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)

## License

This project is licensed under the [MIT License](LICENSE).
