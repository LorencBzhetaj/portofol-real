# LB STUDIO — website (staging)

Astro + TypeScript, static output, component CSS. Content, SEO and images come from the
handoff package (`docs/handoff/`). **This is a staging build: every page is `noindex`, the
sitemap is empty, and the contact form does not send.** Production is blocked on purpose
until the data listed under *Before publishing* is confirmed.

## Commands

```bash
npm install
npm run dev            # builds image variants, then http://localhost:4321
npm run build          # image variants + astro check + static build to dist/
npm run preview        # serve dist/
npm run verify:package # handoff package checks (21 routes, copy/JSON parity, guards)
npm run verify:site    # checks dist/ (sq + en): metadata, H1, noindex, links, assets, language switch, one title/link per project card
```

Node ≥ 22.12. Versions are pinned in `package-lock.json`.

## Structure

| Path | Purpose |
| --- | --- |
| `src/data/content.sq.json`, `routes.seo.json`, `cards.json` | Single source of content and metadata (from the package) |
| `src/data/site-config.template.json` | Config template; copy to `site-config.json` with **confirmed** data only |
| `scripts/seo-tools.mjs` | Package SEO generator (metadata, JSON-LD, sitemap, robots, publication guards), used by the layout |
| `scripts/build-images.mjs` | AVIF/WebP variants from the PNG/JPG masters, no crop/upscale (output is git-ignored) |
| `src/data/content.en.json` | English translation of all content (merged onto the Albanian structure in `src/lib/site.ts`) |
| `src/data/project-cards.json` | Category, summary and tags for each project card (sq/en), rendered as HTML outside the image |
| `src/lib/i18n.ts` | Interface strings (sq/en) |
| `src/views/` | Page templates shared by both languages |
| `src/pages/` | 21 Albanian routes (`/`, `/sherbimet` + 9, `/projektet` + 7, `/kontakt`, `/privatesia`) and 21 English routes (`/en`, `/en/services` + 9, `/en/projects` + 7, `/en/contact`, `/en/privacy`), plus 404, `sitemap.xml`, `robots.txt` |
| `public/images/project-cards/` | The 7 project compositions without the text panel (from LB-STUDIO-foto-pa-tekste.zip); name, category, summary, tags and button are HTML |
| `public/images/brand/` | Reconstructed logo SVG + header lockup and monogram derived from the same paths (no redesign) |
| `docs/handoff/` | Audit/handoff docs, confirmation registers, original mockups — never served |
| `docs/screenshots/` | Rendered pages (sq + en) at 1440 / 768 / 430 / 390 / 375 px, plus menu/submenu/form states |

## Languages

Every page exists in Albanian and English; the header has an EN/SQ switch to the equivalent page.
With `SITE_URL` set, every page gets reciprocal `hreflang` (sq, en, x-default → sq) and its own
canonical. English pages become indexable only in production when `languagesPublished` in
`site-config.json` includes `"en"` (the English copy should be reviewed by the owner first).

## Environment

See `.env.example`.

- `SITE_URL` — only once the domain is confirmed. Without it, pages render no canonical, no
  absolute OG URL and no JSON-LD (nothing is guessed). With it, canonical + JSON-LD are emitted;
  pages stay `noindex` unless production is enabled.
- `PRODUCTION=true` — runs the package publication guards. The build **fails** until
  `site-config.json` has a real domain, a public contact, `privacyReady`, `formDeliveryVerified`,
  `productionReady` and the approved `publishablePaths`.
- `PUBLIC_FORM_ENDPOINT` — server endpoint for the form. Empty = the form validates but shows
  "sending is not active yet"; it never shows a simulated success. When set, success is shown
  only if the endpoint replies `2xx` with `{ "ok": true }`. Honeypot field `website` is sent and
  must be rejected server-side; rate limiting belongs to the chosen runtime.

## Before publishing (missing data)

1. **Domain**: lbstudio.com or .al — "lbsutdio.al" in the brief needs its spelling confirmed.
2. **Public contact** (email and/or phone) and form recipient.
3. **Hosting/runtime + form delivery** (Vercel/Resend are proposals, not chosen); implement
   `/api/contact` with server validation, honeypot and rate limiting, then test delivery.
4. **Privacy policy**: legal controller, providers, retention, rights contact, approval date
   (`docs/handoff/final-confirmations/privacy-register.json`). `/privatesia` is a visible draft.
5. **Projects**: role, permissions, live/demo status for all 7 (`projects-confirmation.json`,
   `editorial-review.json` — `approved` stays `false` until confirmed).
6. **Bogdani concept** image rights (`bogdani-confirmation.json`); otherwise replace the
   `dyqane-online` image with a neutral illustration.
7. **English copy**: translated in this repo, not yet reviewed by the owner; add `"en"` to `languagesPublished` after review.
8. **Logo**: reconstructed SVG, `acceptedForProduction: false` until approved against the original.
9. Then fill `confirmedAssets` / `publishablePaths`, build with `PRODUCTION=true`, check
   robots/sitemap/canonical, Search Console.
