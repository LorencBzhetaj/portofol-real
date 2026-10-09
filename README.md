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
npm run verify:site    # checks dist/: metadata, H1, noindex, links, assets, no internal notes
```

Node ≥ 22.12. Versions are pinned in `package-lock.json`.

## Structure

| Path | Purpose |
| --- | --- |
| `src/data/content.sq.json`, `routes.seo.json`, `cards.json` | Single source of content and metadata (from the package) |
| `src/data/site-config.template.json` | Config template; copy to `site-config.json` with **confirmed** data only |
| `scripts/seo-tools.mjs` | Package SEO generator (metadata, JSON-LD, sitemap, robots, publication guards), used by the layout |
| `scripts/build-images.mjs` | AVIF/WebP variants from the PNG/JPG masters, no crop/upscale (output is git-ignored) |
| `src/pages/` | 21 routes: `/`, `/sherbimet` + 9, `/projektet` + 7, `/kontakt`, `/privatesia`, plus 404, `sitemap.xml`, `robots.txt` |
| `public/images/project-cards/` | The 7 original card compositions, byte-identical to `design-original/03-projektet` |
| `public/images/brand/` | Reconstructed logo SVG + header lockup and monogram derived from the same paths (no redesign) |
| `docs/handoff/` | Audit/handoff docs, confirmation registers, original mockups — never served |
| `docs/screenshots/` | Rendered pages at 1440 / 768 / 390 px |

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
7. **Logo**: reconstructed SVG, `acceptedForProduction: false` until approved against the original.
8. Then fill `confirmedAssets` / `publishablePaths`, build with `PRODUCTION=true`, check
   robots/sitemap/canonical, Search Console.
