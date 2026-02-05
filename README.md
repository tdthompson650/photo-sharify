# Photo Sharify

A photo-sharing app built with Next.js. Browse a community photo gallery, view individual photos, and share your own with title, location, and description.

## Tech Stack

- **Next.js 16** (App Router) with **React 19**
- **SQLite** via `better-sqlite3` (raw SQL, no ORM)
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

2. **Initialize the database** (creates `photos.db` and seeds sample photos)

   ```bash
   node initdb.js
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Project Scripts

| Script   | Description              |
| -------- | ------------------------ |
| `npm run dev`   | Start dev server (Next.js) |
| `npm run build` | Production build          |
| `npm run start` | Run production server     |
| `npm run lint`  | Run ESLint                |

## Features

- **Home** – Landing page with links to community and share
- **Community** – Grid of all shared photos
- **Photo detail** – Individual photo page by slug (e.g. `/photos/golden-hour-over-paris`)
- **Share** – Form to upload a photo with title, location, description, and creator info

## Database

The app uses a single SQLite file, `photos.db`, created and seeded by `initdb.js`. Schema and sample data are defined there; there is no separate ORM or migrations setup. To reset the database, run `node initdb.js` again (this drops and recreates the `photos` table).

## Learn More 

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)

## License

This project is licensed under the [MIT License](LICENSE).
