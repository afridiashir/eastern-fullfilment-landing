# Eastern Fullfilment — Marketing Site

Marketing and content site for Eastern Fullfilment, an order fulfillment and
3PL provider. Built with the Next.js App Router, Tailwind CSS v4, and Sanity as
the CMS for the Resources section.

- **Framework** — Next.js 16 (App Router, React 19, TypeScript strict)
- **Styling** — Tailwind CSS v4 + shadcn/ui (`base-nova` style), light/dark theme
- **Content** — Sanity (blog, case studies, docs, help center); marketing pages are code-defined data modules
- **Motion** — GSAP + `@gsap/react`, Lenis smooth scroll, Embla carousels
- **Email** — Nodemailer over SMTP for the contact and quote forms
- **Analytics** — Google Analytics 4 (see [ANALYTICS.md](ANALYTICS.md))

## Getting started

Requires Node.js 20+ (developed on 24).

```bash
npm install
cp .env.local.example .env.local   # then fill in the SMTP values
npm run dev
```

Open <http://localhost:3000>.

Sanity reads work with no configuration — the dataset is public and the
project/dataset IDs fall back to production defaults — so the only variables
you *need* locally are the SMTP ones, and only if you're working on the forms.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`) |

## Environment variables

All are optional except SMTP, which the contact and quote forms require.

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.easternfulfillment.com` | Canonical origin for metadata, sitemap, robots, JSON-LD |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `yvjlgkpi` | Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity dataset |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-M1V15MW8B4` | GA4 property; set to an empty string to disable analytics (e.g. on previews) |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | — | Form delivery. Port 465 implies TLS. Gmail/Workspace needs an [App Password](https://myaccount.google.com/apppasswords) |
| `CONTACT_TO_EMAIL` | `SMTP_USER` | Where form notifications are delivered |

`.env*` is gitignored — never commit real credentials.

## Project structure

```
src/
  app/                     App Router routes
    api/contact/           Contact form → SMTP (notification + confirmation)
    api/quote/             Quote form → SMTP
    api/search/            Site search over static pages + Sanity content
    product/[6 pages]      Product pages + the shipping calculator
    industries/[4 pages]   Ecommerce, FMCG/CPG, manufacturing, 3PL
    integrations/          Integration directory
    resources/             blog, case-studies, docs, help (Sanity-backed)
    about/ careers/ contact/ terms-and-conditions/
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx …
  components/site/         Page sections and features (~58 modules)
  components/ui/           shadcn/ui primitives
  lib/                     Site config, content data, email, search, analytics
  sanity/                  Client, env, GROQ queries, image URL builder, types
```

The `@/*` path alias maps to `src/*`.

### Content model

Two sources of content, deliberately kept apart:

**Code-defined** — marketing pages are data modules rendered by a shared
component, so adding a page means adding an entry, not a template:

- [src/lib/products.ts](src/lib/products.ts) → `/product/[slug]` via `<ProductPage>`
- [src/lib/industries.ts](src/lib/industries.ts) → `/industries/[slug]`
- [src/lib/integrations.ts](src/lib/integrations.ts) → `/integrations`
- [src/lib/shipping-rates.ts](src/lib/shipping-rates.ts) → rate card for the shipping calculator
- [src/lib/site.ts](src/lib/site.ts) → the single source of truth for name, URLs, socials, CTA destinations, SEO defaults

Product and industry slugs are hardcoded route folders — keep them in sync with
the data module and the navbar dropdown when adding one.

**Sanity** — the Resources section. Document types: `post`, `category`,
`caseStudy`, `docArticle`, `docCategory`, `helpArticle`, `helpCategory`.
Queries live in [src/sanity/queries.ts](src/sanity/queries.ts) and the matching
TypeScript shapes in [src/sanity/types.ts](src/sanity/types.ts). Resource pages
use `generateStaticParams` with `revalidate = 300`, so published edits appear
within five minutes without a redeploy.

Remote images are restricted to `cdn.sanity.io` and `images.unsplash.com` in
[next.config.ts](next.config.ts) — add a `remotePatterns` entry before pulling
images from anywhere else.

### SEO

`siteConfig` and the `pageMetadata()` helper in [src/lib/site.ts](src/lib/site.ts)
drive metadata for every page. Use the helper rather than hand-writing an
`openGraph` block: App Router metadata merges shallowly, so a page declaring its
own `openGraph` would otherwise drop the layout's `siteName`, `type`, and
`locale`. Sitemap, robots, manifest, and the OG/Twitter images are generated
routes under `src/app/`.

### Theme

Light/dark is a `.dark` class on `<html>`, persisted in `localStorage` and
applied by a blocking inline script in the root layout to avoid a flash of the
wrong theme. Tokens are OKLCH custom properties in
[src/app/globals.css](src/app/globals.css).

### Analytics

GA4 is wired so that most tracking needs no per-component client code: add
`gaAttrs()` / `gaViewAttrs()` spreads to elements in server components and the
`<Analytics />` listener picks them up. Full event catalog, parameter list, and
GA4 setup checklist in [ANALYTICS.md](ANALYTICS.md). No PII is ever sent.

## Deployment

Deploys to Vercel as a standard Next.js app. Set `NEXT_PUBLIC_SITE_URL` and the
SMTP variables in the project's environment settings; set
`NEXT_PUBLIC_GA_MEASUREMENT_ID` to an empty string on preview environments so
staging traffic stays out of the production property.

## Conventions

Before changing anything, read [AGENTS.md](AGENTS.md): this repo tracks a Next.js
version whose APIs may differ from older documentation, and the canonical guides
ship in `node_modules/next/dist/docs/`.
