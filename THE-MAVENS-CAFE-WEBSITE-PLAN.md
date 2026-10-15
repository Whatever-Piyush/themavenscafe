# The Mavens Cafe — Website Blueprint

> ## ⚠️ V1 SCOPE AMENDMENT — 13 October 2026
>
> **This blueprint remains the authority on design, brand, visual language, sitemap, content
> model, accessibility and SEO. Those sections are unchanged and still govern the build.**
>
> **The infrastructure sections below have been superseded.** V1 ships with zero external
> services and zero required environment variables. Where this document and the list below
> disagree, **the list below wins.**
>
> | Section | Blueprint says | V1 actually ships |
> |---|---|---|
> | §3.1 stack | Upstash · Turnstile · Resend · Vercel Analytics | **None of them.** No external accounts at all |
> | §5.5 / §8 | Contact form → email pipeline | **No form.** Direct phone/WhatsApp/Instagram/Maps links, data-driven |
> | §8 backend | Schemas, services, security, templates | **One health endpoint.** Backend is intentionally near-empty |
> | §9 menu | Provisional items read off the render menu-boards | **Empty.** Real menu not supplied; UI built and waiting |
> | §10.2 CSP | Nonce + `strict-dynamic` + `force-dynamic` | **Static pages**, headers in `next.config.ts`, `'unsafe-inline'` scripts — trade documented in README |
> | §10.4 | 5-layer bot defence, rate limiting | **Deferred.** No public POST endpoint exists to protect |
> | §12 analytics | Vercel Web Analytics | **None.** No analytics, no cookies, no banner |
> | §3 deps | Zod, Motion, Lucide | **Removed.** 3 runtime deps: `next`, `react`, `react-dom` |
> | Contact data | Placeholder phone/address/hours | **`pending()` → "Coming soon".** Nothing invented |
> | Wordmark | `The Maven's` (signage match) | **`The Mavens Cafe`** / hero `THE MAVENS` |
> | Testimonials | Section pending real quotes | **Section removed entirely** |
>
> Security is described accurately: a **hardened minimal marketing website**, not enterprise
> security infrastructure. The strategy is attack-surface minimisation — no database, no
> accounts, no uploads, no payments, no form, no stored personal data.
>
> Everything removed is a **documented future upgrade**, to be added alongside the feature
> that needs it — not before.

> **Status:** V1 built, tested and building clean. See the amendment above for what shipped.
> **Purpose:** Capture *everything* — brand, design, architecture, security, costs, risks — so we can tick off what to build and what to drop before writing a single line of code.
> **Last updated:** 13 October 2026

---

## Table of contents

1. [Project brief](#1-project-brief)
2. [What the resources told us](#2-what-the-resources-told-us)
3. [Brand system](#3-brand-system)
4. [Design direction](#4-design-direction)
5. [Sitemap & page-by-page breakdown](#5-sitemap--page-by-page-breakdown)
6. [Tech stack](#6-tech-stack)
7. [Repository structure](#7-repository-structure)
8. [Backend design](#8-backend-design)
9. [Menu data model](#9-menu-data-model)
10. [Security plan](#10-security-plan)
11. [Assets & media plan](#11-assets--media-plan)
12. [SEO & local discovery](#12-seo--local-discovery)
13. [Performance & accessibility targets](#13-performance--accessibility-targets)
14. [Hosting & deployment](#14-hosting--deployment)
15. [Cost sheet (₹0 target)](#15-cost-sheet-0-target)
16. [Build roadmap](#16-build-roadmap)
17. [Risks & open questions](#17-risks--open-questions)
18. [Explicitly out of scope (for now)](#18-explicitly-out-of-scope-for-now)

---

## 1. Project brief

| | |
|---|---|
| **Business name** | **The Mavens Cafe** — the official name, used in metadata, titles and structured data. Hero wordmark is set as `THE MAVENS`; descriptor line `CAFÉ · BAKERY · DESSERTS`. **No other name appears on the site, in filenames, in metadata, or in the repo.** |
| **Type** | Café · Bakery · Desserts |
| **Location** | Chirawa, Rajasthan, India |
| **Site goal** | A showcase-grade marketing site: look premium, make people want to visit, show the menu, show the space, make it trivial to find/call/follow. |
| **Project nature** | Personal portfolio project for now. Will be promoted to a professional project once reach grows. |
| **Hard constraint** | **₹0 budget.** No paid hosting, no paid database, no paid SaaS, no paid fonts, no paid stock. Everything on free tiers that stay free. |
| **Hosting** | Vercel (Hobby / free) |
| **Must-have structural ask** | Separate `frontend/` and `backend/` folders, with content in the right place |
| **Must-have visual ask** | Hero section = deep maroon. Scrolling down transitions into and sustains a beige/cream theme. |
| **Must-have quality ask** | A hardened, minimal site — security through attack-surface minimisation. See the amendment above; §10 is superseded. |

### Design principle driving every decision

> **Every feature must be free forever, and every feature we don't add is a feature that can't be breached.**

Rejecting a feature is a legitimate outcome of this document.

---

## 2. What the resources told us

### 2.1 Files reviewed

| File | What it is |
|---|---|
| `resources/originals/interior-design-deck.pdf` | 10 pages. p1 & p10 = design firm cover/back. p2 = exterior elevation. p3–p9 = interior renders. Renamed so no third-party name remains in the repo. |
| `WhatsApp Image 2026-10-07 .jpeg` | Full brand identity board — logo, palette with hex codes, packaging, signage, business card, menu board |
| `WhatsApp Image 2026-10-07 at 19.03.25.jpeg` | Illuminated circular blade sign mockup (dusk) |
| `WhatsApp Image 2026-10-07 at 19.03.26.jpeg` | Pylon sign + illuminated storefront mockup (dusk) |

### 2.2 Facts extracted

**Taglines / copy already in the brand:**
- `Good Food • Better Moods` — primary tagline (script type)
- `CAFÉ • BAKERY • DESSERTS` — descriptor line under the wordmark
- `PREMIUM · FRESH · HANDCRAFTED · ALWAYS` — brand pillars
- `Life is Sweeter Here` — menu-board headline
- `Coffee · Pastries · Cakes · Snacks & More` — storefront panel

**The physical space (from the renders):**
- Narrow, tall, double-height street-front unit with full-glass façade
- **Ground floor:** order counter, illuminated glass dessert display, banquette seating with fluted-wood + arch-niche backdrops, marble-top tables, crystal pendant chandeliers, cove-lit ceiling ribs
- **First floor:** glazed seating room behind sheer curtains
- **Rooftop terrace:** pergola-covered open-air seating (wayfinding inside literally says `WAY TO TERRACE`) — **this is a genuine differentiator and deserves its own gallery moment on the site**
- Recurring motifs for the web design: **arches**, **fluted/ribbed vertical texture**, **line-art botanical mandala**, **warm glow**, **marble**, **brass/gold hairlines**

**Menu categories already visible on the in-store boards** (treat as provisional until the real menu arrives):

| Hot Coffee | Thick Shakes | Desserts | Cakes |
|---|---|---|---|
| Classic Hot Coffee | Strawberry | Chocolate Cheesecake | Strawberry Tart |
| Americano | Banana | Strawberry Pudding | Choco Truffle |
| Cappuccino | Apple | Belgian Chocolate Cake | Red Velvet |
| Latte | Mango | Tiramisu | Black Forest |
| Espresso | Butter Fruit | Brownie Gelato | Choco Lava Cake |
| Mocha | Fig | Muffin | Blueberry Cheesecake |
| Flat White | Chocolate Shake | Apple Pie | Hazelnut Burst |
| Filter Coffee | Tender Coconut | Red Velvet Cake | Caramel Crunch |

> ⚠️ **Not used.** These were read off menu boards in the architectural renders and are NOT the cafe's published menu, so none of them ship. They informed the shape of the data model only. `content/menu.ts` is empty until the real menu is supplied.

### 2.3 Renders extracted for you

The PDF pages were image-only, so I extracted and renamed them (no firm name in any filename):

```
resources/renders/
├── 01-exterior-facade.jpg
├── 02-interior-counter-view.jpg
├── 03-interior-banquette-menuboards.jpg
├── 04-interior-window-seating.jpg
├── 05-interior-arch-nook.jpg
├── 06-interior-display-counter.jpg
├── 07-interior-entrance-view.jpg
└── 08-interior-ceiling-detail.jpg
```

⚠️ **Every one of these carries a visible `© … All Rights Reserved` watermark and a design-firm logo.** See [§11.3](#113-the-image-rights-problem---read-this) — this is the single biggest blocker in the project and it is a rights question, not a technical one.

---

## 3. Brand system

### 3.1 Core palette (taken verbatim from the brand board)

| Token | Hex | Role |
|---|---|---|
| `--maroon` | `#6B1E2E` | Primary. Hero, footer, buttons, headings on cream |
| `--espresso` | `#2B1A17` | Darkest. Body text on cream, deep sections |
| `--gold` | `#D4B483` | Accent. Rules, icons, dividers, large display text only |
| `--cream` | `#F8F4EE` | Page background from the second viewport onward |

### 3.2 Derived tokens (needed for real UI; proposed)

| Token | Hex | Role |
|---|---|---|
| `--maroon-deep` | `#4A1420` | Hero gradient floor, pressed button state |
| `--maroon-soft` | `#8A2A3C` | Hover state, gradient ceiling |
| `--cream-deep` | `#EFE6D9` | Alternating section bands, card surfaces |
| `--sand` | `#E3D5C0` | Borders, dividers on cream |
| `--ink-muted` | `#6F6056` | Secondary text on cream |
| `--cream-muted` | `#D8CFC4` | Secondary text on maroon |
| `--terracotta` | `#C06A52` | Optional 5th accent — matches the banquette upholstery in the renders |

### 3.3 Contrast audit (WCAG) — decided up front, not retrofitted

| Pair | Ratio | Verdict |
|---|---|---|
| `--cream` on `--maroon` | ~9.1:1 | ✅ AAA — hero text |
| `--espresso` on `--cream` | ~13.8:1 | ✅ AAA — body text |
| `--maroon` on `--cream` | ~8.4:1 | ✅ AAA — headings, links |
| `--gold` on `--maroon` | ~4.1:1 | ⚠️ Large text (≥24px) and decoration **only**. Never body copy. |
| `--gold` on `--cream` | ~1.9:1 | ❌ **Decorative strokes only.** Never text. |

**Rule:** gold is a jewellery metal, not an ink.

### 3.4 Typography (all free, all self-hosted)

| Role | Proposed font | Why |
|---|---|---|
| Display / wordmark feel | **Playfair Display** (or Cormorant Garamond) | High-contrast didone serif — closest free match to the logo's lettering |
| Headings | Playfair Display | Consistency with display |
| Body / UI | **Inter** (or Jost) | Neutral, excellent at small sizes, huge weight range |
| Script accent | **Great Vibes** (or Dancing Script) | For `Good Food • Better Moods` only — the signage uses a script here |
| Micro-caps | Inter, uppercase, letter-spaced `0.18em` | Matches `CAFÉ • BAKERY • DESSERTS` treatment |

All loaded via `next/font` → self-hosted at build time. **No Google Fonts CDN request at runtime** — that is both a privacy win and it removes a whole domain from our Content-Security-Policy.

Type scale: fluid `clamp()` from mobile to desktop, 1.25 ratio.

### 3.5 Voice

Warm, confident, unhurried. Short sentences. Never corporate, never shouty, no exclamation marks. "We bake at 6am so you don't have to settle for yesterday's bread." — that register.

---

## 4. Design direction

### 4.1 The scroll transition (your headline requirement)

```
┌─────────────────────────────────────────┐
│  VIEWPORT 1   —  #6B1E2E deep maroon    │  ← Hero. Logo, tagline, CTAs.
│  Gold hairlines, warm vignette glow     │     Nav transparent, cream text.
├─────────────────────────────────────────┤
│  ░░ TRANSITION BAND ░░                  │  ← Maroon → cream gradient over ~60vh,
│  arch silhouette crossfade              │     with an arch-shaped mask so the
├─────────────────────────────────────────┤     change reads as architecture, not
│                                         │     as a CSS gradient.
│  EVERYTHING BELOW  —  #F8F4EE cream     │  ← Nav solidifies to cream + shadow,
│  Alternating #EFE6D9 bands              │     text flips to espresso.
│  Maroon used only for accents/CTAs      │
│                                         │
├─────────────────────────────────────────┤
│  FOOTER  —  #6B1E2E maroon again        │  ← Bookends the page.
└─────────────────────────────────────────┘
```

Implementation: a scroll-progress hook drives CSS custom properties on `<html>`; sections inherit them. One `IntersectionObserver` + one `requestAnimationFrame` loop, no scroll-jacking, no heavy library. Degrades to a plain maroon hero + cream body if JS is off.

### 4.2 Visual language (pulled straight from the built space)

- **Arches** — section dividers, image masks, card tops, the hero's bottom edge
- **Fluted texture** — repeating vertical-line SVG at low opacity on alternating bands
- **Botanical line-art** — the mandala/leaf motif from the walls as a large, 6%-opacity watermark behind section headings
- **Warm glow** — soft gold radial behind the hero logo and under hovered cards
- **Marble** — subtle texture on menu cards only, as in the tabletops
- **Brass hairlines** — 1px gold rules with the `✦` diamond from the signage as a divider glyph

### 4.3 Motion

| Element | Motion |
|---|---|
| Hero entrance | Logo fade + 0.98→1 scale, tagline letter-stagger, 900ms, once |
| Section reveal | 24px rise + fade on enter, 60ms stagger between children |
| Hero → cream | Scroll-linked color interpolation (see 4.1) |
| Cards | Lift 4px + warm glow on hover, 200ms |
| Nav | Background/blur/height transition at 80px scroll |
| Gallery | Lightbox with crossfade, keyboard + swipe navigable |
| Page transitions | Short cream wipe — **optional**, costs complexity, happy to drop |

**All of it wrapped in `@media (prefers-reduced-motion: reduce)`** → instant states, no transforms. Non-negotiable.

### 4.4 Responsive

Mobile-first. Breakpoints 640 / 768 / 1024 / 1280 / 1536. Primary design target is a 390px phone — **a local café's traffic will be overwhelmingly mobile, and most of it on mid-range Android over 4G.** Desktop is the secondary target, not the primary.

---

## 5. Sitemap & page-by-page breakdown

```
/                     Home
/menu                 Full menu
/gallery              The space
/about                Our story          (candidate for merging into Home)
/contact              Visit us
/privacy              Privacy policy      (required — we collect form data)
/terms                Terms of use        (optional but cheap)
/404                  Not found
```

### 5.1 Home `/`

| # | Section | Background | Content |
|---|---|---|---|
| 1 | **Hero** | `--maroon` | Logo, `CAFÉ · BAKERY · DESSERTS`, `Good Food • Better Moods`, two CTAs (*View Menu* / *Visit Us*), scroll cue |
| 2 | **Transition** | gradient | Arch crossfade, `PREMIUM · FRESH · HANDCRAFTED · ALWAYS` strip |
| 3 | **Story** | `--cream` | 2–3 paragraphs + exterior render |
| 4 | **Signature picks** | `--cream-deep` | 3–6 hero items as cards |
| 5 | **Menu preview** | `--cream` | 4 category tiles → `/menu` |
| 6 | **The Space** | `--cream-deep` | Render grid, with the **rooftop terrace** called out |
| 7 | **Why us** | `--cream` | 4 pillars with gold line icons (cup / wheat / cupcake / crown — all from the brand board) |
| 8 | **Testimonials** | `--cream-deep` | ⚠️ Only if real quotes exist. **Fake reviews are not going on this site.** Drop the section otherwise. |
| 9 | **Visit us** | `--cream` | Address, hours, phone, embedded map, Instagram strip |
| 10 | **Footer** | `--maroon` | Nav, socials, hours, legal links, © The Mavens Cafe |

### 5.2 Menu `/menu`

- Maroon page header strip → cream body (same theme logic as Home)
- Sticky category chip bar: All · Hot Coffee · Cold Coffee · Thick Shakes · Bakery · Desserts · Cakes · Snacks
- Client-side filter + search (zero network calls — the whole menu is in the bundle)
- Item card: name, one-line description, price (optional), badges (🌱 Veg · ⭐ Bestseller · 🆕 New · 🌶️ Spicy)
- "Prices subject to change · Taxes extra as applicable" disclaimer
- `☎ Call to order` CTA
- **Prints cleanly** — a real café genuinely benefits from a printable menu stylesheet

### 5.3 Gallery `/gallery`

Masonry grid, category tabs (Exterior · Interior · Terrace · Food), accessible lightbox. **Gated on [§11.3](#113-the-image-rights-problem---read-this).**

### 5.4 About `/about`

Story, the four pillars expanded, the design/space story, "what maven means" (a maven = a trusted expert — nice, on-brand hook). **Candidate to merge into Home** to keep the site tight.

### 5.5 Contact `/contact`

Address + Google Maps embed, hours table, tel/WhatsApp/email/Instagram links, and the contact form — the only part of the site that talks to the backend.

Form fields: Name · Email · Phone (optional) · Subject (select) · Message · honeypot (hidden) · Turnstile token.

---

## 6. Tech stack

### 6.1 Recommended

| Layer | Choice | Cost | Why |
|---|---|---|---|
| Framework | **Next.js 15** (App Router) | Free | First-class on Vercel, SSG by default, built-in image optimization, security headers, metadata/SEO API |
| Language | **TypeScript** (strict) | Free | Catches the class of bug that becomes a security bug |
| Styling | **Tailwind CSS v4** + CSS custom properties | Free | Tokens in one place; v4 config is CSS-native |
| Animation | **Motion** (`motion`, ex-Framer Motion) | Free | Tiny, respects reduced-motion, declarative |
| Icons | **Lucide** + hand-drawn SVG for brand marks | Free | MIT |
| Validation | **Zod** | Free | One schema shared by client and server |
| Rate limiting | **Upstash Redis** + `@upstash/ratelimit` | Free tier | 10k commands/day — far beyond our needs |
| Bot protection | **Cloudflare Turnstile** | **Free, unlimited** | Privacy-friendly, no "pick the traffic lights" UX |
| Email | **Resend** | Free tier | 3,000/mo, 100/day. Contact form → your inbox |
| Database | **None in v1** | ₹0 | See 6.2 |
| Analytics | **Vercel Web Analytics** | Free tier | Cookieless, no consent banner needed |
| Hosting | **Vercel Hobby** | Free | Your stated target |

### 6.2 The database decision — recommend **no database**

| Data | Where it lives | Why |
|---|---|---|
| Menu, hours, address, copy | **Typed JSON/TS files in the repo** | Zero cost, zero latency, zero attack surface, version-controlled, instantly rolled back |
| Contact form submissions | **Emailed to you via Resend, then forgotten** | No stored customer PII = nothing to breach, no DPDP-Act data-retention duty |
| Rate-limit counters | Upstash Redis (ephemeral) | Not personal data; auto-expiring keys |

> **A database you don't have cannot leak, cannot be injected into, cannot be left publicly readable, and cannot start charging you.** For a brochure site this is strictly the better engineering choice — not a compromise. Add Neon/Supabase (both free) later *only* when a feature genuinely needs persistence.

### 6.3 Considered and rejected

| Option | Why not |
|---|---|
| WordPress / any PHP CMS | Needs paid hosting; enormous attack surface; constant patching |
| Plain HTML/CSS/JS | Fine, but we lose image optimization, SEO tooling, and type safety for no gain |
| Astro | Genuinely excellent and slightly leaner — but Next.js has deeper Vercel integration and you'll want the API routes later. Reasonable alternative if you prefer it. |
| Separate Express server on Render/Railway free tier | Free tiers cold-start for 30–60s or expire. Would make the site feel broken. |
| Sanity / Contentful CMS | Free tiers exist, but it's a dependency, an account, and an extra attack surface for content *you* edit twice a year |
| reCAPTCHA | Turnstile is free, faster, and doesn't ship user data to an ad company |
| Firebase | Free tier is generous but it's a billing account one misconfigured rule away from a surprise invoice |

---

## 7. Repository structure

### 7.1 How to honour "separate frontend and backend" on a free tier

Two viable shapes:

**Option A — npm workspaces monorepo, one Vercel project ✅ RECOMMENDED**

`frontend/` is the Next.js app. `backend/` is a real, standalone, framework-agnostic package: all validation schemas, business logic, email service, rate limiter, and data access. The frontend's API route handlers are 10-line adapters that call into `backend/`.

- ✅ True separation of concerns — `backend/` has zero React, zero Next.js imports
- ✅ One deploy, one domain → **no CORS surface at all**
- ✅ No double cold-start, no cross-origin latency
- ✅ `backend/` can be lifted out into its own service later **without changing a line of its code**
- ✅ Free forever

**Option B — two Vercel projects (standalone Hono/Express API)**

- ✅ Maximum physical separation; separate deploy cadence
- ❌ Two domains → CORS config to get right, preflight latency, a second cold start on every form submit
- ❌ More moving parts for a site with one form

> **Recommendation: Option A.** It gives you the architectural separation you asked for, and it's the shape that doesn't punish the user for it. Say the word if you'd rather have Option B — the `backend/` folder's contents are identical either way, which is exactly the point.

### 7.2 Proposed tree

```
Themavenscafe/
├── README.md
├── THE-MAVENS-CAFE-WEBSITE-PLAN.md      ← this file
├── package.json                          ← workspaces: ["frontend", "backend"]
├── .gitignore
├── .env.example                          ← committed. Names only, never values.
├── vercel.json
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx                    ← fonts, metadata, skip-link, JSON-LD
│   │   ├── page.tsx                      ← Home
│   │   ├── menu/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── opengraph-image.tsx
│   │   └── api/
│   │       ├── contact/route.ts          ← thin adapter → backend/
│   │       └── health/route.ts
│   ├── components/
│   │   ├── layout/        Header, Nav, Footer, MobileMenu, SkipLink
│   │   ├── home/          Hero, ThemeTransition, Story, Signatures,
│   │   │                  MenuPreview, SpacePreview, Pillars, VisitUs
│   │   ├── menu/          MenuFilter, MenuSection, MenuItemCard, MenuSearch
│   │   ├── gallery/       GalleryGrid, Lightbox
│   │   ├── forms/         ContactForm, Field, Turnstile, FormStatus
│   │   └── ui/            Button, Card, Arch, Divider, Container, Section
│   ├── content/                          ← ALL editable copy & data
│   │   ├── menu.ts                       ← the menu you'll send
│   │   ├── site.ts                       ← name, address, hours, phone, socials
│   │   ├── gallery.ts
│   │   └── copy.ts
│   ├── hooks/             useScrollProgress, useReducedMotion, useLockScroll
│   ├── lib/               cn(), format(), analytics, structured-data
│   ├── styles/            globals.css, tokens.css, print.css
│   ├── public/
│   │   ├── images/{brand,space,food,og}
│   │   ├── favicon.ico  icon.svg  apple-icon.png
│   │   ├── site.webmanifest
│   │   └── .well-known/security.txt
│   ├── middleware.ts                     ← security headers + CSP nonce
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── backend/                              ← ZERO React / Next.js imports
│   ├── src/
│   │   ├── index.ts                      ← public API of the package
│   │   ├── schemas/       contact.schema.ts  (Zod — shared with the frontend)
│   │   ├── services/      contact.service.ts, email.service.ts
│   │   ├── security/      rateLimit.ts, turnstile.ts, sanitize.ts, honeypot.ts
│   │   ├── templates/     contactEmail.ts   (HTML + plaintext)
│   │   ├── config/        env.ts            (Zod-validated, fails fast at boot)
│   │   └── utils/         logger.ts, errors.ts, result.ts
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
│
└── resources/                            ← source material, NOT deployed
    ├── renders/
    └── (originals)
```

**Placement rules:**
- Anything that renders → `frontend/`
- Anything that validates, decides, rate-limits, sends, or touches a secret → `backend/`
- Anything a non-developer would want to edit (menu, hours, phone, copy) → `frontend/content/`, never buried in components
- Source material that must never be deployed → `resources/`, listed in `.vercelignore`

---

## 8. Backend design

### 8.1 Endpoints (v1 — deliberately tiny)

| Method | Route | Purpose | Auth | Rate limit |
|---|---|---|---|---|
| `POST` | `/api/contact` | Contact form → email | None (Turnstile) | 3 / 10 min / IP |
| `GET` | `/api/health` | Uptime ping | None | 60 / min / IP |

That's the whole backend. Every additional endpoint is additional attack surface that must earn its place.

### 8.2 Request pipeline for `POST /api/contact`

```
1. Method + Content-Type check         → 405 / 415
2. Body size cap (hard 10 KB)          → 413
3. Honeypot field non-empty?           → 200 OK (lie to the bot, log nothing)
4. Submission faster than 3s?          → 200 OK (lie to the bot)
5. Rate limit by IP (Upstash)          → 429 + Retry-After
6. Turnstile token verification        → 403
7. Zod schema parse + strip unknowns   → 400 + field errors
8. Sanitize (strip CR/LF, control chars, cap lengths)
9. Send via Resend (replyTo = user, from = our verified domain)
10. Return a generic success           → 200
```

> Steps 3 & 4 return `200` on purpose. Telling a bot *why* it failed is just free debugging for the bot.

### 8.3 Error handling

- Client gets generic, non-enumerating messages. Never a stack trace, never a provider error string, never "no such email".
- Server logs structured JSON with a request ID — **and never logs the message body, email, or phone.**
- Every service returns a `Result<T, E>` type. No unhandled promise rejections.

### 8.4 Environment variables

```bash
# .env.example — committed, values never are
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=    # public by design — the only NEXT_PUBLIC_ secret-ish value
NEXT_PUBLIC_SITE_URL=
```

`backend/src/config/env.ts` validates all of these with Zod **at boot**. A missing variable crashes the build loudly instead of failing silently in production at 11pm.

---

## 9. Menu data model

Designed now so your real menu is a **paste-in, not a rewrite**:

```ts
// frontend/content/menu.ts
export type Badge = 'veg' | 'bestseller' | 'new' | 'spicy' | 'contains-nuts' | 'eggless';

export interface MenuItem {
  id: string;              // stable slug — used for deep links
  name: string;
  description?: string;
  price?: number;          // INR. Omit to render "—" instead of a fake price
  badges?: Badge[];
  image?: string;
  available?: boolean;     // false → shown greyed as "Currently unavailable"
  variants?: { label: string; price: number }[];   // Regular / Large
}

export interface MenuCategory {
  id: string;
  name: string;            // "Hot Coffee"
  tagline?: string;
  icon?: string;
  items: MenuItem[];
}

export const menu: MenuCategory[] = [ /* ... */ ];
```

Handles: categories, variants/sizes, dietary badges, sold-out items, optional prices, and items with no photo. If the real menu has combos or a daily special, we extend this — it won't need restructuring.

---

## 10. Security plan

> Honest framing: this is a static marketing site with one contact form. "Fully secured" here means **a hardened, minimal attack surface with defence in depth on the one dynamic path** — not enterprise theatre. The strongest control in this whole list is §10.1.

### 10.1 Attack surface minimisation (the foundation)

- No database → no SQLi, no data breach, no leaked customer records
- No user accounts → no credential stuffing, no session hijacking, no password resets
- No file uploads → no malware, no path traversal, no storage abuse
- No payments → no PCI scope
- No admin panel in v1 → no privilege escalation
- 99% of pages statically generated → served from CDN, no server to attack
- One POST endpoint, total

### 10.2 HTTP security headers (`middleware.ts`)

| Header | Value |
|---|---|
| `Content-Security-Policy` | Nonce-based, `strict-dynamic`; `default-src 'self'`; no `unsafe-inline`; explicit allowlist for Turnstile + map iframe |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` + `frame-ancestors 'none'` in CSP |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()` |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Cross-Origin-Resource-Policy` | `same-origin` |
| `X-DNS-Prefetch-Control` | `off` |
| `X-Powered-By` | **removed** |

Target: **A+ on securityheaders.com and Mozilla Observatory.** Both free, both verifiable, both screenshot-able for a portfolio.

### 10.3 Input security

- Zod validation on **both** client (UX) and server (truth). The server never trusts the client's validation.
- Strict allowlists — `.strict()` on every schema so unexpected fields are rejected, not ignored
- Hard length caps: name 100, email 254, phone 20, subject 120, message 2,000
- **Email header-injection prevention**: strip `\r`, `\n`, and all control characters from every value that touches an email header. This is the specific vulnerability contact forms get owned by.
- No `dangerouslySetInnerHTML` anywhere. If we ever render Markdown, it goes through `rehype-sanitize` first.
- Request body hard-capped at 10 KB

### 10.4 Abuse & bot defence

| Layer | Control |
|---|---|
| 1 | Honeypot field (CSS-hidden, `aria-hidden`, `tabindex="-1"`, `autocomplete="off"`) |
| 2 | Time trap — anything submitted in under 3s is a bot |
| 3 | Cloudflare Turnstile (free, unlimited) |
| 4 | Upstash rate limit — 3 submissions / 10 min / IP, sliding window |
| 5 | Vercel's built-in DDoS/WAF protection (included free on Hobby) |

### 10.5 Secrets & supply chain

- No secret ever in client code. Only `NEXT_PUBLIC_*` reaches the browser, and the only one is Turnstile's **site** key, which is public by design.
- `.env*` git-ignored; `.env.example` committed with names only
- Secrets live in Vercel's encrypted environment variables, scoped per-environment
- `package-lock.json` committed; exact versions; `npm ci` in CI
- **Dependabot** enabled (free on GitHub) + `npm audit` in CI
- **Minimal dependency count is itself a security policy.** Every package added is a supply-chain risk, and I'll justify each one.
- GitHub secret scanning + push protection on (free)

### 10.6 Privacy & legal (India)

- Privacy Policy page — what we collect (name/email/message), why, who it goes to, that we don't store it, how to reach us. Drafted with the **DPDP Act 2023** in mind since you're India-based and collecting personal data.
- Cookieless analytics → **no cookie-consent banner required**
- No third-party trackers, no ad pixels, no Google Fonts CDN call
- Data minimisation: we ask for the fewest fields that make the form useful

### 10.7 Operational

- No stack traces, framework versions, or internal paths in responses
- Generic error pages
- `/.well-known/security.txt` with a contact address
- Preview deployments are `noindex` so they never compete with production in search
- Branch protection on `main`; PR-based workflow (good portfolio signal too)

### 10.8 Honest limitations of the free tier

| Want | Free-tier reality |
|---|---|
| Vercel password-protected previews | Paid feature. Workaround: keep previews unlisted + `noindex`, or add our own middleware basic-auth. |
| WAF custom rules | Pro feature. Baseline DDoS protection is included free. |
| SIEM / log retention | Hobby logs are short-retention. Fine for this project. |
| Pen test | Not happening at ₹0 — but `npm audit`, securityheaders.com, Mozilla Observatory, and Lighthouse are all free and give real, citable results. |

**No security control in this plan requires spending money.**

---

## 11. Assets & media plan

### 11.1 Needed

| Asset | Status |
|---|---|
| Logo — full lockup, SVG | ❌ **Must be recreated as vector.** We only have raster. |
| Logo — monogram `M` mark, SVG | ❌ Needed for favicon / nav / app icon |
| Favicon set (ico, 32, 180, 192, 512) | ❌ Generated from the monogram |
| OG / Twitter card (1200×630) | ❌ Generate — maroon bg, logo, tagline |
| Interior renders ×8 | ⚠️ **Have them, but watermarked — see 11.3** |
| Food photography | ❌ **Missing, and it's the gap that matters most** |
| Exterior photo of the real café | ❌ |
| Team / founder photo | ❌ Optional |

### 11.2 Optimisation

- AVIF + WebP with JPEG fallback, via `next/image`
- **Pre-optimise at build time rather than leaning on Vercel's runtime image transforms**, so we never approach the free-tier transformation quota
- Blur placeholders → no layout shift
- Lazy-load everything below the fold; `priority` on the hero only
- Hero image budget: ≤200 KB. Full page budget: ≤1 MB.
- Real `alt` text on every image (SEO + accessibility + it's just correct)

### 11.3 The image rights problem — READ THIS

**Every render in the PDF carries a visible `© … All Rights Reserved` watermark and the design firm's logo.**

You've asked that no other name appear anywhere on the site. There are only three honest routes:

1. ✅ **Get written permission** from the café owner / design firm to use the renders un-watermarked. Interior firms usually grant this happily — the café is their client and the website credits their work implicitly. **This is the right move and it's free.** Ask for the clean files while you're at it.
2. ✅ **Shoot real photos** once the café is open. Better than renders anyway — real food photography converts; CGI doesn't.
3. ⚠️ **Launch without them** — abstract CSS/SVG art direction built from the brand motifs (arches, flutes, botanical line work, warm gradients). This can look genuinely premium, and I can build it. The site ships; photos drop in later.

**What I won't do is strip someone's copyright watermark and ship it.** That's a legal exposure on a site meant to showcase your work, and it would be the first thing a sharp reviewer noticed.

**Until this is resolved, the plan assumes route 3** — so the build is never blocked. Galleries are built with a data-driven image list that becomes real the moment you have clean assets.

### 11.4 Interim food imagery

Free, properly-licensed sources: **Unsplash, Pexels** (both free for commercial use, no attribution required). Mandatory discipline: colour-grade everything warm to match the palette, and swap for real photos before anyone calls it a professional project. Placeholder food photos on a food website are a stopgap, never a destination.

---

## 12. SEO & local discovery

- Per-page `metadata` — title, description, canonical, OG, Twitter card
- **JSON-LD `CafeOrCoffeeShop`** structured data: name, address, geo, opening hours, phone, price range, menu URL, images → this is what drives the Google rich result
- `sitemap.xml` + `robots.txt`, auto-generated
- Semantic HTML, one `<h1>` per page, logical heading order
- **Google Business Profile** — free, and for a local café it will outperform the entire website for discovery. Non-negotiable, and it's a 20-minute task.
- Local keywords: "cafe in Chirawa", "bakery Chirawa", "best coffee Chirawa", "rooftop cafe Chirawa"
- `hreflang` ready if Hindi is added later
- Free verification: Google Search Console + Bing Webmaster Tools

---

## 13. Performance & accessibility targets

### Performance

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 mobile |
| LCP | < 2.0s on 4G |
| CLS | < 0.05 |
| INP | < 200ms |
| First-load JS | < 120 KB gzipped |
| Total page weight | < 1 MB |

Fonts self-hosted + preloaded + `font-display: swap`. No render-blocking third-party scripts. Analytics loads `afterInteractive`.

### Accessibility — target WCAG 2.2 AA

- All contrast pairs pre-audited (§3.3)
- Full keyboard navigation; visible gold focus rings; logical tab order
- Skip-to-content link
- Semantic landmarks; ARIA only where semantics genuinely run out
- Lightbox and mobile menu: focus-trapped, Escape-closable, scroll-locked
- Form: real `<label>`s, `aria-describedby` errors, `aria-live` status, errors never conveyed by colour alone
- `prefers-reduced-motion` fully honoured
- Verified with axe DevTools + manual keyboard and screen-reader passes (all free)

---

## 14. Hosting & deployment

- **GitHub repo** (free, private or public — public is better for a portfolio)
- **Vercel Hobby**: auto-deploy `main` → production, PRs → preview URLs
- Free HTTPS + auto-renewing certs + global CDN
- `themavenscafe.vercel.app` out of the box — **₹0**
- Custom domain: **the only thing in this project that could ever cost money.** `.com` ≈ ₹900–1,200/yr. Totally optional; the `.vercel.app` subdomain works perfectly for a portfolio piece. If you do buy one, Vercel attaches it free.
- CI (GitHub Actions, free): typecheck → lint → test → `npm audit` → build on every PR
- Vercel analytics + Speed Insights on the free tier

---

## 15. Cost sheet (₹0 target)

| Item | Provider | Free tier | Enough for us? |
|---|---|---|---|
| Hosting + CDN + SSL | Vercel Hobby | 100 GB bandwidth/mo | ✅ Enormously |
| Repo + CI | GitHub | Unlimited public, 2,000 Actions min/mo | ✅ |
| Fonts | Google Fonts (self-hosted) | Free, open licence | ✅ |
| Icons | Lucide | MIT | ✅ |
| Bot protection | Cloudflare Turnstile | Unlimited | ✅ |
| Rate limiting | Upstash Redis | 10k commands/day | ✅ 100× headroom |
| Transactional email | Resend | 3,000/mo, 100/day | ✅ |
| Analytics | Vercel Web Analytics | Hobby tier | ✅ |
| Placeholder imagery | Unsplash / Pexels | Free commercial | ✅ |
| Maps | Google Maps embed | Free (basic iframe) | ✅ |
| Security scanning | Dependabot, npm audit, Observatory | Free | ✅ |
| **Domain** | Any registrar | — | ⚠️ **~₹1,000/yr — optional, skippable** |

> **Running total: ₹0/month.** Every service above has a free tier that is permanent, not a trial. Nothing requires a credit card on file, so there is no path to a surprise bill.

---

## 16. Build roadmap

### Phase 0 — Decisions (you)
- [ ] Answer the open questions in §17
- [ ] Resolve the image rights question (§11.3)
- [ ] Send the menu whenever it's ready — the build doesn't wait on it

### Phase 1 — Foundation ✅ DONE (13 Oct 2026)
- [x] Monorepo, workspaces, TypeScript strict, Tailwind v4
- [x] Design tokens, fluid type scale, global styles, print + reduced-motion
- [x] Security headers + nonce CSP (`frontend/proxy.ts`) — **verified against a running server**
- [x] Header / nav / footer / mobile menu
- [x] `npm audit --omit=dev` → 0 vulnerabilities

### Phase 2 — Home page ✅ DONE
- [x] Hero + the maroon→cream arch transition (pure CSS/SVG, no JS, no layout shift)
- [x] Story, Signatures, Menu preview, The Space, Visit us, Footer
- [x] Responsive + reduced-motion + 404 page
- [ ] Testimonials — **deliberately omitted** until real quotes exist

### Phase 3 — Menu
- [x] Data model, seeded with the board categories from §2.2
- [ ] `/menu` page: filter, search, badges, print stylesheet
- [ ] Swap in your real menu when it lands

### Phase 4 — Remaining pages + backend
- [x] `backend/` package: schemas, services, security module (14 files, zero React/Next imports — verified)
- [x] Contact API end-to-end with all five anti-abuse layers — **every control tested against a live server**
- [ ] Contact form UI + Turnstile widget
- [ ] Gallery + lightbox, About
- [ ] Privacy + Terms

### Phase 5 — Hardening & polish
- [ ] securityheaders.com + Mozilla Observatory → A+
- [ ] Lighthouse ≥95 all four categories
- [ ] axe + keyboard + screen-reader audit
- [ ] JSON-LD, sitemap, robots, OG images
- [ ] `npm audit` clean, Dependabot on

### Phase 6 — Launch
- [ ] Production deploy, Search Console, Google Business Profile
- [ ] README with architecture notes + security write-up (**this is the part that makes it a portfolio piece, not just a website**)

### Later (only if reach justifies it)
Online ordering / Zomato-Swiggy deep links · table reservations · admin CMS (Decap/Tina — still free) · Hindi localisation · PWA + offline menu · blog · loyalty · events calendar for the terrace

---

## 17. Risks & open questions

### ✅ Resolved (13 Oct 2026)

1. ~~**Image rights.**~~ → **Route 1.** You're obtaining written permission for clean, un-watermarked renders. Build proceeds immediately with placeholders; the gallery is data-driven so clean files are a swap, not a rework.
2. ~~**Apostrophe conflict.**~~ → **Match the signage: "The Maven's".** Repo/folder/domain remain `themavenscafe`.
3. ~~**Architecture.**~~ → **Approved as planned** (Option A monorepo, Next.js + TS + Tailwind, no database in v1).
4. ~~**Launch state.**~~ → **Open and trading.** Full site, no "Opening Soon" treatment.

### 🟡 Needed before launch

3. Real address (full, with PIN) for the map and schema markup
4. Phone number — the brand board's `+91 98765 43210` is a placeholder
5. Email address for the contact form
6. Instagram handle — `@themavens` on the business card; is that live?
7. Opening hours, including whether the terrace has separate hours
8. **Is the café open yet?** If not, the site becomes an "Opening Soon" build with a notify-me form, which is a materially different Home page.
9. Show prices, or "menu available in-store"?
10. Is there a vector logo file? Saves recreation and will be more accurate.

### 🟢 Preferences

11. Domain: buy a `.com`, or ship on `.vercel.app`?
12. Merge About into Home, or keep it separate?
13. Testimonials — do real ones exist, or do we drop the section?
14. Veg/eggless markers needed? (Strongly recommended for an Indian café.)
15. Hindi version — now, or later?
16. Online ordering links (Zomato / Swiggy / WhatsApp ordering)?

### Risks

| Risk | Mitigation |
|---|---|
| Menu arrives late | Build against the §2.2 categories; it's a data swap |
| Image rights unresolved | Route 3 — abstract art direction — keeps the build unblocked |
| Free tier changes terms | No lock-in: Next.js runs on Netlify/Cloudflare Pages free too. `backend/` is framework-agnostic by design. |
| Scope creep | This document. Anything not in it gets added deliberately, not accidentally. |
| Site feels like a template | The art direction is drawn from the actual built space — arches, flutes, the botanical motif. That's what makes it look designed rather than assembled. |

---

## 18. Explicitly out of scope (for now)

Listed so they're *decisions*, not oversights: e-commerce/payments · user accounts · live table booking · real-time order tracking · multi-location support · a custom CMS · a mobile app · a chatbot · newsletters (needs a paid ESP past the free tier) · fake reviews or fabricated awards.

---

## Decision log

| # | Decision | Status | Date |
|---|---|---|---|
| 1 | Hero maroon → cream scroll theme | ✅ Confirmed by you | 13 Oct 2026 |
| 2 | Separate `frontend/` + `backend/` | ✅ Confirmed by you | 13 Oct 2026 |
| 3 | Vercel, ₹0 budget | ✅ Confirmed by you | 13 Oct 2026 |
| 4 | Wordmark is **"The Maven's"** — matches signage. Repo/domain stay `themavenscafe`. No other name anywhere. | ✅ Decided | 13 Oct 2026 |
| 5 | Next.js 15 + TypeScript + Tailwind v4 | ✅ Approved | 13 Oct 2026 |
| 6 | No database in v1 — menu in repo, form → email, nothing stored | ✅ Approved | 13 Oct 2026 |
| 7 | Monorepo (Option A), one Vercel project, `backend/` framework-agnostic | ✅ Approved | 13 Oct 2026 |
| 8 | Image rights → **Route 1**: permission being obtained; build with placeholders | ✅ Decided | 13 Oct 2026 |
| 9 | Café is **open and trading** — full site, no "Opening Soon" | ✅ Decided | 13 Oct 2026 |
| 10 | Real address / phone / email / hours / Instagram | 🟡 Placeholders in `content/site.ts`, flagged `TODO` | — |
| 11 | Menu — using §2.2 board categories until yours arrives | 🟡 Data swap when ready | — |

---

*The Mavens Cafe · Café · Bakery · Desserts · Good Food, Better Moods*
