# PhotoSharify Security Audit Report

**Auditor**: CTO (acting)
**Date**: 2026-02-06
**Scope**: All files in `tdthompson650/photo-sharify` at commit `fdd7d2a`
**Methodology**: Manual static analysis of every source file

---

## 1. Authentication Bypass

- **Status**: Not Detected (N/A - no auth system exists)
- **Location**: Entire codebase
- **Details**: There is no authentication layer whatsoever - no login, signup, password reset, JWT, session, API key, or OAuth flow. Every route (`/`, `/photos`, `/photos/[slug]`, `/photos/share`, `/community`) is fully public.
- **Impact**: This is by design for a demo portfolio app. However, if this were ever promoted to a real multi-user app, every server action and database mutation would be unprotected.
- **Confidence**: High

---

## 2. Weak Password Handling

- **Status**: Not Detected (N/A)
- **Location**: N/A
- **Details**: No passwords exist in the system. No user accounts, no hashing, no credential storage.
- **Confidence**: High

---

## 3. Missing or Flawed Authorization

- **Status**: **Present** (latent)
- **Location**: `lib/photos.js:3-9` (`getPhotos`), `lib/photos.js:13-21` (`getPhoto`), `lib/photos.js:25-58` (`savePhoto`), `lib/actions.js:23` (`sharePhoto`)
- **Attack Vector**: Every database function is callable without any authorization check. `savePhoto()` can write arbitrary rows to the database. While `sharePhoto` in `lib/actions.js:23` is currently **not exported** (the only mitigation), `savePhoto` in `lib/photos.js:25` **is exported** and could be imported and called by any server component or future API route without restriction.
- **Impact**: If any code path is added that reaches `savePhoto` (e.g., a new API route, re-exporting the server action), an attacker could insert or overwrite any photo record, including overwriting existing slugs via the `ON CONFLICT ... DO UPDATE` upsert at `lib/photos.js:47-56`.
- **Confidence**: Medium (currently mitigated by the unexported action, but fragile)

---

## 4. Cross-Site Scripting (XSS) - CWE-80

- **Status**: **Not Detected** (with caveats)
- **Location**: All React components in `app/` and `components/`
- **Details**: React 19 with JSX auto-escapes all interpolated values by default. No usage of `dangerouslySetInnerHTML` was found anywhere. All user-sourced data (`photo.title`, `photo.creator`, `photo.location`, `photo.description`) is rendered via JSX expressions like `{photo.title}`, which are safe.
- **Caveats**:
  - `app/photos/error.js:10` renders `{error.message}` directly. While React escapes this, error messages from database drivers or unexpected exceptions could leak internal details (information disclosure, not XSS).
  - CSP in `next.config.mjs:9` includes `'unsafe-inline'` for both `script-src` and `style-src`, which weakens XSS mitigations. In production, `'unsafe-eval'` is removed but `'unsafe-inline'` persists for scripts.
- **Impact**: Low risk due to React's auto-escaping. CSP `unsafe-inline` for scripts is a defense-in-depth gap.
- **Confidence**: High (no XSS), Medium (CSP weakness)

---

## 5. SQL Injection - CWE-89

- **Status**: **Not Detected**
- **Location**: `lib/photos.js` (all 3 queries), `scripts/db-init.js`, `scripts/db-seed.js`
- **Details**: All runtime queries use parameterized placeholders (`$1`, `$2`, etc.) via the `pg` driver:
  - `getPhoto` at `lib/photos.js:14-18`: `WHERE slug = $1` with `[slug]`
  - `savePhoto` at `lib/photos.js:47-57`: 7 parameters, all bound
  - `getPhotos` at `lib/photos.js:4-8`: No user input at all
  - Seed script at `scripts/db-seed.js:122-123`: Parameterized inserts with hardcoded data
- **One area to flag**: `lib/photos.js:36-37` uses a `LIKE` query with `${slug}-%`. The `slug` variable here is derived from the sanitized title (regex-stripped to `[a-z0-9-]` at line 31-33), so SQL wildcards (`%`, `_`) cannot be injected. This is safe but warrants monitoring if the sanitization logic changes.
- **Confidence**: High

---

## 6. Command Injection - CWE-78

- **Status**: Not Detected
- **Location**: Entire codebase
- **Details**: No usage of `child_process`, `exec`, `spawn`, `execSync`, `execFile`, or any shell execution APIs anywhere in the codebase.
- **Confidence**: High

---

## 7. Code Injection - CWE-94

- **Status**: Not Detected
- **Location**: Entire codebase
- **Details**: No usage of `eval()`, `Function()`, `vm.runInContext`, dynamic `import()` with user input, or any template engine with raw execution. The React Compiler (`babel-plugin-react-compiler`) is a build-time tool and doesn't introduce runtime code injection risk.
- **Confidence**: High

---

## 8. Additional Vulnerabilities

### 8a. Information Disclosure via Error Boundaries

- **Status**: **Present**
- **Location**: `app/photos/error.js:10`
- **Attack Vector**: The `error.js` error boundary renders `{error.message}` directly to the user. If a database query fails, the `pg` driver's error message may contain connection strings, table names, column names, or query fragments.
- **Impact**: Internal database schema details, hostnames, or partial connection info could be exposed to end users.
- **Confidence**: Medium

### 8b. CSRF (Cross-Site Request Forgery)

- **Status**: **Not Detected** (mitigated by framework + disabled action)
- **Location**: `lib/actions.js`
- **Details**: Next.js Server Actions include built-in CSRF protection (actions are bound to the origin, validated server-side). The `sharePhoto` action is also **not exported**, so it's unreachable. The share form at `app/photos/share/page.js:41` has `onSubmit={(e) => e.preventDefault()}` and no `action` attribute - it never submits.
- **Confidence**: High

### 8c. Upsert Allows Data Overwrite (IDOR-adjacent)

- **Status**: **Present** (latent)
- **Location**: `lib/photos.js:47-56`
- **Attack Vector**: `savePhoto` uses `ON CONFLICT (slug) DO UPDATE SET ...`. If an attacker could call `savePhoto` with an existing slug, they could **overwrite all fields** of any existing photo record - title, image path, description, creator, and creator_email. This is an upsert-by-design that becomes an IDOR if the function is ever exposed without authorization.
- **Impact**: Full overwrite of any photo record by slug. Currently mitigated only by the fact that `sharePhoto` is unexported.
- **Confidence**: Medium (latent; would become High if the action is ever re-exported)

### 8d. SSL Configuration in Development

- **Status**: **Inconclusive**
- **Location**: `lib/db.js:8-11`
- **Details**: In development, `ssl: true` is used, which sets `rejectUnauthorized: false` by default in the `pg` driver. This means dev connections accept self-signed or invalid certificates, which is acceptable for local dev but could be a risk if dev ever connects to a remote database.
- **Impact**: Man-in-the-middle on database connections in development environments connecting to remote hosts.
- **Confidence**: Low

### 8e. No Rate Limiting

- **Status**: **Present**
- **Location**: All routes, particularly `lib/photos.js:3` (`getPhotos`), `lib/photos.js:13` (`getPhoto`)
- **Attack Vector**: No rate limiting on any route. An attacker could send high volumes of requests to `/photos` or `/photos/[slug]` causing excessive database queries.
- **Impact**: Database resource exhaustion, increased infra costs. Mitigated somewhat by connection pooling in `lib/db.js`.
- **Confidence**: Medium

### 8f. File Upload Security

- **Status**: Not Detected (feature disabled)
- **Location**: `components/ui/image-picker.js`, `app/photos/share/page.js`
- **Details**: The image picker reads files client-side via `FileReader` for preview only. The form never submits (`onSubmit` calls `preventDefault`). The `accept` attribute limits to `image/png, image/jpeg`, and a 5MB size check exists client-side. `sharePhoto` (server action) also checks size server-side at `lib/actions.js:45`, but the action is unexported. No actual file upload to the server occurs.
- **Confidence**: High

### 8g. Image Path Injection (Stored XSS via `src`)

- **Status**: **Inconclusive**
- **Location**: `app/photos/[photoSlug]/page.js:44`, `components/photos/photo-item.js:26`
- **Attack Vector**: `photo.image` from the database is passed directly to `<Image src={photo.image} />`. If an attacker could write to the `photos` table (via `savePhoto`), they could set `image` to an arbitrary URL. The `next/image` component does have a domains/remotePatterns allowlist (not configured here, so it would reject unknown remote URLs), but `data:` URLs or path traversal strings could potentially be set.
- **Impact**: If `savePhoto` is ever exposed, crafted image paths could cause unexpected behavior. The CSP restricts `img-src` to `'self' data: blob:`, which limits but doesn't eliminate the risk.
- **Confidence**: Low (requires `savePhoto` to be exposed first)

---

## Summary Matrix

| # | Vulnerability | Status | Severity | Confidence |
|---|---|---|---|---|
| 1 | Authentication Bypass | N/A (no auth) | - | High |
| 2 | Weak Password Handling | N/A (no passwords) | - | High |
| 3 | Missing Authorization | **Present** (latent) | Medium | Medium |
| 4 | XSS (CWE-80) | Not Detected | - | High |
| 5 | SQL Injection (CWE-89) | Not Detected | - | High |
| 6 | Command Injection (CWE-78) | Not Detected | - | High |
| 7 | Code Injection (CWE-94) | Not Detected | - | High |
| 8a | Info Disclosure via Error | **Present** | Low | Medium |
| 8b | CSRF | Not Detected | - | High |
| 8c | Upsert Data Overwrite | **Present** (latent) | Medium | Medium |
| 8d | Weak Dev SSL | Inconclusive | Low | Low |
| 8e | No Rate Limiting | **Present** | Low | Medium |
| 8f | File Upload Security | Not Detected (disabled) | - | High |
| 8g | Image Path Injection | Inconclusive | Low | Low |

---

## CTO Assessment

**Bottom line**: For a portfolio demo, this is in good shape. The SQL layer is clean (parameterized everywhere), React auto-escaping handles XSS, CSP headers are deployed, and the dangerous server action is correctly unexported.

**The three things to flag for the roadmap if this ever goes to production:**

1. **The exported `savePhoto` function** (`lib/photos.js:25`) is the single biggest latent risk. Any future route that imports it gets unauthenticated, unauthorized write access with upsert/overwrite capability. The unexported `sharePhoto` action is a good control, but it's one `export` keyword away from being wide open.

2. **Error message leakage** (`app/photos/error.js:10`) - rendering raw `error.message` to users is a classic info-disclosure vector. Database errors from `pg` can be verbose.

3. **`unsafe-inline` in CSP script-src** (`next.config.mjs:9`) - weakens the primary XSS defense-in-depth layer. This is a known Next.js trade-off but worth noting.

No blockers for a demo. Would become blockers if user-generated content or auth were added.
