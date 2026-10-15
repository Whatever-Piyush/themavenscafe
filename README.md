# The Mavens Cafe

Café · Bakery · Desserts — Chirawa, Rajasthan.

The marketing website. **V1 is deliberately infrastructure-light: no database, no paid services, no API keys, and no required environment variables.** Clone it, install, and it runs.

> Design direction, brand system and roadmap: [`THE-MAVENS-CAFE-WEBSITE-PLAN.md`](./THE-MAVENS-CAFE-WEBSITE-PLAN.md)

---

## Quick start

```bash
npm install     # installs both workspaces
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
npm run typecheck
```

No `.env` file is needed. There is nothing to configure.

---

## What this is

A statically generated Next.js site with six pages and one health endpoint. That is the whole system.

| | |
|---|---|
| Framework | Next.js (App Router), React, TypeScript `strict` |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Fonts | Playfair Display, Inter, Great Vibes — self-hosted at build time |
| Hosting | Vercel |
| Database | None |
| External services | **None** |
| Required env vars | **None** |
| Runtime dependencies | `next`, `react`, `react-dom` |

Three runtime dependencies is not an accident. Every package is a supply-chain surface, and on a site with no forms and no data there was nothing for a validation library, an animation library or an icon set to do. Animation is CSS keyframes; icons are nine hand-drawn SVGs in `components/ui/Icons.tsx`.

---

## Architecture

```
the-mavens-cafe/
├── frontend/            everything that renders
│   ├── app/             routes, layout, metadata, sitemap, robots
│   │   └── api/health/  thin adapter → backend
│   ├── components/      layout · home · menu · gallery · ui
│   ├── content/         ← EDIT THE SITE HERE
│   ├── hooks/ lib/      scroll state, class helper, JSON-LD
│   ├── styles/          globals.css — design tokens live here
│   ├── public/images/   site imagery
│   └── next.config.ts   security headers
│
├── backend/             server-side logic — no React, no Next.js
│   └── api/health.ts    the only server logic in V1
│
├── resources/           reference material — NOT deployed
│   ├── renders/ brand/ originals/
│
├── vercel.json
└── package.json         npm workspaces
```

**The rule:** anything that renders goes in `frontend/`. Anything that validates, decides, or touches a secret goes in `backend/`. The backend imports nothing from the frontend, so it can be lifted into its own service unchanged.

`backend/` is nearly empty, and that is correct. V1 has no dynamic functionality, so there is no server work to do. The package exists to hold the boundary so that the first piece of real server logic has somewhere obvious to go, and a working pattern to follow.

---

## Editing the site

Everything a non-developer needs is in four files. No JSX hunting.

| Edit | File |
|---|---|
| Phone, address, hours, Instagram, WhatsApp, maps | `frontend/content/site.ts` |
| The menu | `frontend/content/menu.ts` |
| Photographs | `frontend/content/gallery.ts` |
| Page wording | `frontend/content/copy.ts` |

### Contact details

Every contact field is currently `pending()`, which renders as "Coming soon" everywhere and is automatically excluded from search-engine structured data. To go live, replace the value:

```ts
phone: pending()              →   phone: '+91 00000 00000',
phoneHref: pending()          →   phoneHref: 'tel:+910000000000',
```

Nothing else needs changing — the footer, contact page and JSON-LD all read from this file.

### The menu

`frontend/content/menu.ts` exports an empty array, so the menu page shows a designed "coming soon" state. The full menu UI — categories, search, filtering, dietary badges, price variants, sold-out states, print stylesheet — is already built and waiting for data. Populating the array is the only step. The file contains a worked example.

### Images

Drop files into `frontend/public/images/gallery/`, then add entries to `frontend/content/gallery.ts`. `alt` text is a required field, deliberately.

---

## What is intentionally NOT built

Listed so these read as decisions rather than omissions:

- **No contact form.** There is no email service in V1, and a form that silently discards messages is worse than no form. Direct phone, WhatsApp and Instagram links go live as soon as those details exist.
- **No database, accounts, payments, ordering, admin panel or CMS.** Nothing on this site needs them.
- **No analytics, cookies, or tracking.** Hence no cookie banner — there is nothing to consent to.
- **No testimonials section.** No real customer quotes exist, and inventing reviews for a real business is not on the table.
- **No menu items or prices.** The real menu has not been supplied. The provisional items visible in the architectural renders are not the published menu.
- **No street address, phone, hours or coordinates.** Not supplied, so not invented. A wrong address sends real customers to the wrong door.
- **No gallery photography.** See below.

### Image rights

The architectural renders in `resources/` carry a third-party design firm's watermark and copyright notice. They are **not** published on the site, and must not be published by cropping, erasing or regenerating the watermark away. They are design reference only, and `resources/` is excluded from deployment via `.vercelignore`.

Until clean, authorised photography exists, the gallery renders an art-directed treatment built from the brand's own visual language. The page looks finished; it simply does not claim to show photographs we do not have the rights to.

---

## Security

**An accurate description: this is a hardened, minimal marketing website — not enterprise security infrastructure.** It is not "fully secure" or "unhackable", and no site is.

The security model is attack-surface minimisation, which for a brochure site is genuinely stronger than bolting on third-party services:

- No database → nothing to inject into, nothing to breach
- No accounts or authentication → no credentials to steal
- No file uploads → no malware or path traversal
- No payments → no PCI scope
- No contact form or public POST endpoint → no spam target, no input to validate
- No stored personal information of any kind
- Statically generated pages served from CDN
- One `GET` health endpoint, which reports only `{status, timestamp}` — no versions, no dependency list, nothing that aids reconnaissance

**Security headers** are set in `frontend/next.config.ts`: Content-Security-Policy, `X-Content-Type-Options`, `X-Frame-Options` + `frame-ancestors 'none'`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, and HSTS in production only.

**Known CSP limitation, stated plainly:** `script-src` includes `'unsafe-inline'`. Next.js inlines hydration data, and the strict alternative — a per-request nonce with `strict-dynamic` — forces every page to render dynamically, trading away the static delivery that makes this site fast and free to run. The trade is acceptable *here specifically* because there is no database, no user input and no user-generated content, so there is no mechanism by which injected script could reach a page. **It is not a general-purpose excuse: the moment this site renders anything a user supplied, that line is the first thing to revisit.**

**Future upgrades**, deliberately deferred until the feature that needs them exists: rate limiting, bot protection, and input validation all belong with a contact form, not before one.

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. In Vercel, **Add New → Project**, and import the repository.
3. Vercel detects Next.js automatically. Leave the build settings as they are — `vercel.json` handles the workspace layout.
4. Add no environment variables. There are none.
5. **Deploy.**

You get `https://<project>.vercel.app` with HTTPS, a global CDN and automatic preview deployments on every pull request — at no cost.

Verify the deploy with `curl https://<your-domain>/api/health` → `{"status":"ok", ...}`.

A custom domain is the only thing in this project that could ever cost money (roughly ₹1,000/year). It is entirely optional; attaching one to Vercel is free.

---

## Upgrade path

**Phase 2** — real menu, real photography, address, phone, WhatsApp, Instagram, Maps, opening hours. All of it is a content edit; none requires code. Then a contact form, which is the point at which input validation, rate limiting and bot protection become worth adding.

**Phase 3** — online ordering, basket, payments.

**Phase 4** — admin, menu management, analytics.

Nothing above is built yet, on purpose.
