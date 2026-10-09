// Checks the built site in dist/ against the content package: 21 routes, unique metadata,
// one H1 matching the data, robots/canonical policy, internal links and image paths that exist,
// and no internal/editorial text or placeholders leaking into public pages.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const sqRoutes = JSON.parse(fs.readFileSync(path.join(root, 'src/data/routes.seo.json'), 'utf8'));
const en = JSON.parse(fs.readFileSync(path.join(root, 'src/data/content.en.json'), 'utf8'));
const enPath = (p) => p === '/' ? '/en' : p === '/sherbimet' ? '/en/services' : p.startsWith('/sherbimet/') ? '/en/services/' + en.services[p.split('/')[2]].enSlug : p === '/projektet' ? '/en/projects' : p.startsWith('/projektet/') ? '/en/projects/' + p.split('/')[2] : p === '/kontakt' ? '/en/contact' : '/en/privacy';
const enText = (r) => { const k = r.path.split('/')[2]; if (r.path === '/') return en.home; if (r.kind === 'collection') return en.hubs[r.path]; if (r.kind === 'service') return en.services[k]; if (r.kind === 'project') { const t = en.projects[k]; return { ...t, h1: t.name ?? r.h1 }; } return r.path === '/kontakt' ? en.contact : en.privacy; };
const routes = [...sqRoutes.map((r) => ({ ...r, lang: 'sq' })), ...sqRoutes.map((r) => { const t = enText(r); return { ...r, lang: 'en', sqPath: r.path, path: enPath(r.path), title: t.title, description: t.description, h1: t.h1 ?? r.h1 }; })];
const production = process.env.PRODUCTION === 'true';
const siteUrl = process.env.SITE_URL || null;

const fileFor = (p) => path.join(dist, p === '/' ? 'index.html' : p.slice(1) + '.html');
const exists = (urlPath) => {
  const clean = decodeURI(urlPath.split(/[?#]/)[0]);
  if (clean === '/' || clean === '') return fs.existsSync(path.join(dist, 'index.html'));
  const p = path.join(dist, clean.slice(1));
  return fs.existsSync(p) && fs.statSync(p).isFile() || fs.existsSync(p + '.html');
};
const textOf = (html) => html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const titles = new Set();
const descriptions = new Set();
let links = 0;
let images = 0;
for (const r of routes) {
  const f = fileFor(r.path);
  assert.ok(fs.existsSync(f), 'missing page ' + r.path);
  const html = fs.readFileSync(f, 'utf8');
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1];
  assert.equal(title, r.title, 'title ' + r.path);
  assert.equal(desc, r.description, 'description ' + r.path);
  titles.add(title); descriptions.add(desc);
  assert.ok(html.includes('<html lang="' + r.lang + '"'), 'lang ' + r.path);
  // Language switch points at the equivalent page in the other language.
  assert.ok(html.includes('href="' + (r.lang === 'sq' ? enPath(r.path) : r.sqPath) + '"'), 'language switch ' + r.path);
  // Project cards: the name appears once per card (as HTML) and one link per card.
  for (const card of html.matchAll(/<article class="card project-card[\s\S]*?<\/article>/g)) {
    assert.equal((card[0].match(/<a /g) || []).length, 1, 'one link per project card ' + r.path);
    assert.equal((card[0].match(/class="title[^>]*>/g) || []).length, 1, 'one title per project card ' + r.path);
  }
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => decode(m[1].replace(/<[^>]+>/g, '').trim()));
  assert.equal(h1s.length, 1, 'h1 count ' + r.path);
  assert.equal(h1s[0], r.h1, 'h1 text ' + r.path);

  // Indexing policy: nothing indexable outside a confirmed production build.
  if (!production) assert.match(robots, /noindex/, 'staging must be noindex ' + r.path);
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (!siteUrl) {
    assert.equal(canonical, undefined, 'canonical without confirmed domain ' + r.path);
    assert.ok(!html.includes('application/ld+json'), 'JSON-LD without confirmed domain ' + r.path);
  } else {
    assert.equal(canonical, new URL(r.path, siteUrl).href, 'canonical ' + r.path);
    assert.ok(html.includes('hreflang="en"') && html.includes('hreflang="sq"') && html.includes('hreflang="x-default"'), 'hreflang ' + r.path);
    const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const types = ld['@graph'].map((n) => n['@type']);
    for (const banned of ['LocalBusiness', 'Review', 'AggregateRating', 'FAQPage', 'Product', 'Offer']) assert.ok(!types.includes(banned), banned + ' in ' + r.path);
  }

  // No internal notes, placeholders or null values in visible text (privacy draft is the known exception).
  const text = textOf(html);
  for (const bad of ['editorialNote', 'Shënim redaksional', 'example.invalid', 'undefined', 'successRule', 'approved:', 'lbsutdio']) {
    assert.ok(!html.includes(bad), `"${bad}" in ${r.path}`);
  }
  assert.ok(!/\bnull\b/.test(text), 'null in text ' + r.path);
  if (!['/privatesia', '/en/privacy'].includes(r.path)) assert.ok(!/\[[A-ZËÇ /]{4,}\]/.test(text), 'placeholder in ' + r.path);

  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) { links++; assert.ok(exists(m[1]), `broken link ${m[1]} in ${r.path}`); }
  for (const m of html.matchAll(/(?:src|srcset)="([^"]+)"/g)) {
    for (const part of m[1].split(',')) {
      const u = part.trim().split(/\s+/)[0];
      if (!u.startsWith('/')) continue;
      images++; assert.ok(exists(u), `missing asset ${u} in ${r.path}`);
    }
  }
  for (const m of html.matchAll(/href="(#[^"]+)"/g)) assert.ok(html.includes(`id="${m[1].slice(1)}"`), `missing anchor ${m[1]} in ${r.path}`);
}
assert.equal(titles.size, routes.length, 'duplicate titles');
assert.equal(descriptions.size, routes.length, 'duplicate descriptions');

// Bogdani: concept label, never linked as a project.
for (const r of routes) assert.ok(!/href="[^"]*bogdani/i.test(fs.readFileSync(fileFor(r.path), 'utf8')), 'Bogdani link in ' + r.path);
// Project cards: every project page and the hub use the original composition.
for (const r of routes.filter((r) => r.kind === 'project')) {
  const slug = r.path.split('/').pop();
  const hub = r.lang === 'sq' ? '/projektet' : '/en/projects';
  assert.ok(fs.readFileSync(fileFor(r.path), 'utf8').includes(`/images/_r/project-cards/${slug}-`), 'project card image on ' + r.path);
  assert.ok(fs.readFileSync(fileFor(hub), 'utf8').includes(`/images/_r/project-cards/${slug}-`), 'card on ' + hub + ' for ' + slug);
}
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
if (!production) assert.equal((sitemap.match(/<loc>/g) || []).length, 0, 'staging sitemap must be empty');
// Audit documents never ship in public output.
assert.ok(!fs.existsSync(path.join(dist, 'docs')) && !fs.existsSync(path.join(dist, 'reference')), 'audit docs in dist');

console.log(`PASS: ${routes.length} pages (sq + en), unique titles/descriptions, 1 matching H1 each, ${production ? 'production' : 'noindex staging'}${siteUrl ? ' + canonical/JSON-LD for ' + siteUrl : ' without canonical (domain not confirmed)'}, ${links} internal links and ${images} image refs resolve, no internal notes/placeholders, empty staging sitemap.`);
