# CLAUDE.md - PhotoSharify

## Project Overview

PhotoSharify is a photo-sharing portfolio demo built with Next.js 16 (App Router), React 19, PostgreSQL, and Tailwind CSS. It showcases server components, server actions, image optimization, and security best practices. The share/upload feature is intentionally disabled for demo purposes.

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router, React Server Components)
- **UI**: React 19.2.3
- **Database**: PostgreSQL via `pg` driver (raw SQL, no ORM)
- **Styling**: Tailwind CSS 3.4.19 + PostCSS + Autoprefixer
- **Compiler**: Babel React Compiler 1.0.0
- **Module System**: ES Modules (`"type": "module"` in package.json)
- **Linting**: ESLint 9 + eslint-config-next
- **Package Manager**: npm

## Commands

```bash
npm run dev       # Start dev server (hot reload)
npm run build     # Production build
npm run start     # Run production server
npm run lint      # Run ESLint
npm run db:init   # Create database schema (requires DATABASE_URL)
npm run db:seed   # Seed sample photo data
```

## Project Structure

```
app/                        # Next.js App Router pages & layouts
  layout.js                 # Root layout (header, fonts, metadata)
  page.js                   # Home page (/)
  globals.css               # Global Tailwind styles
  not-found.js              # 404 page
  photos/
    page.js                 # Photo gallery (/photos)
    error.js                # Error boundary
    [photoSlug]/page.js     # Photo detail (/photos/:slug)
    share/
      page.js               # Share form (/photos/share) - demo only
      error.js              # Error boundary
  community/page.js         # Community page (/community)
components/                 # Reusable React components
  main-header/              # Header, nav, background SVG
  photos/                   # Grid, item, skeleton components
  images/                   # Image slideshow (client component)
  ui/                       # Shared UI (image picker)
lib/                        # Server-side logic
  db.js                     # PostgreSQL connection pool + SSL config
  photos.js                 # Database queries (getPhotos, getPhoto, savePhoto)
  actions.js                # Server actions (sharePhoto - unexported)
scripts/                    # Database scripts
  db-init.js                # Creates photos table schema
  db-seed.js                # Seeds 7 sample photos
public/images/              # Static image assets
assets/                     # Bundled assets (logo, icons, slideshow images)
```

## Architecture & Patterns

### Server vs. Client Components
- Components are **server components by default** (React Server Components)
- Client components are marked with `'use client'` at the top of the file
- Client components: `image-slideshow.js`, `nav-link.js`, `image-picker.js`, `share/page.js`, all `error.js` files
- Keep data fetching in server components; use client components only when browser APIs or interactivity are needed

### Data Fetching
- Server components call database functions directly via async/await
- Use `Suspense` boundaries with skeleton fallbacks for async data loading
- Pages that need fresh data export `const dynamic = 'force-dynamic'`
- Use `generateMetadata()` for dynamic page titles and descriptions

### Database
- Raw SQL with parameterized queries (`$1`, `$2`) - never interpolate user input into SQL
- Connection pool managed in `lib/db.js` with SSL enabled in production
- Schema: single `photos` table with columns: `id`, `slug`, `title`, `image`, `location`, `description`, `creator`, `creator_email`
- Slug auto-generation from title (lowercase, hyphenated, unique suffix)
- Upsert pattern: `ON CONFLICT (slug) DO UPDATE SET`

### Styling
- Tailwind CSS utility classes throughout
- Custom color palette: `beige-50`, `beige-100`, `beige-200`, `beige-300` (defined in `tailwind.config.js`)
- Custom font: `dm-sans` (DM Sans via Google Fonts, loaded in root layout)
- Mobile-first responsive design using Tailwind breakpoints (`sm:`, `md:`, `lg:`)

### Error Handling
- Page-level error boundaries via `error.js` files (must be client components)
- 404 handling via `notFound()` from `next/navigation`
- Server-side validation in server actions with descriptive error messages

## File Naming & Conventions

- **Files**: kebab-case (`photo-item.js`, `main-header.js`)
- **Components**: One default export per file, PascalCase function names
- **Imports**: Use `@/` path alias for all project imports (e.g., `@/components/photos/photo-grid`)
- **Import order**: Next.js built-ins, React, then project modules
- **Images**: Use `next/image` with `fill` + `sizes` for responsive images; set `priority` only on above-fold images

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `DATABASE_URL_UNPOOLED` | Unpooled connection for scripts (falls back to `DATABASE_URL`) | No |
| `NODE_ENV` | Set automatically by Next.js | Auto |

## Security Considerations

- **CSP headers** configured in `next.config.mjs` (stricter in production)
- **Parameterized SQL queries** - never concatenate user input into SQL strings
- **SSL verification** enabled in production (`rejectUnauthorized: true`)
- **Security headers**: X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options
- `sharePhoto` server action is **intentionally unexported** to prevent production use
- `creator_email` is **excluded** from `getPhoto()` query results for privacy

## Key Constraints

- No authentication or user sessions
- No testing framework (no Jest, Vitest, or test files)
- No API routes - mutations use Next.js Server Actions only
- No ORM or migration tooling - schema managed via `scripts/db-init.js`
- No Docker or CI/CD configuration
- Upload/share functionality is disabled (demo mode)
