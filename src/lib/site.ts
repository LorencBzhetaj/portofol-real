import fs from 'node:fs';
import path from 'node:path';
import sq from '../data/content.sq.json';
import en from '../data/content.en.json';
import cardsPanel from '../data/project-cards.json';
import template from '../data/site-config.template.json';
import { makeSeo, makeSitemap, makeRobots } from '../../scripts/seo-tools.mjs';
import { ui, type Lang } from './i18n';

export { ui };
export type { Lang };
export type Content = typeof sq;
export type Service = Content['services'][number];
export type Project = Content['projects'][number];

/**
 * Site configuration. src/data/site-config.json (confirmed data only) overrides the template.
 * SITE_URL may supply the origin for staging; PRODUCTION=true turns on the publication guards,
 * which make the build fail until contact, privacy, form delivery and approvals are confirmed.
 */
const localConfigPath = path.resolve('src/data/site-config.json');
const localConfig = fs.existsSync(localConfigPath) ? JSON.parse(fs.readFileSync(localConfigPath, 'utf8')) : {};
export const config = {
  ...template,
  ...localConfig,
  siteUrl: process.env.SITE_URL ? new URL('/', process.env.SITE_URL).href : localConfig.siteUrl ?? null,
};
export const production = process.env.PRODUCTION === 'true';
export const formEndpoint: string | null = import.meta.env.PUBLIC_FORM_ENDPOINT || config.formEndpoint || null;
const enPublished: boolean = (config.languagesPublished as string[]).includes('en');

/* ---------- Paths ---------- */

const enServiceSlug = (slug: string) => (en.services as Record<string, { enSlug: string }>)[slug].enSlug;
const sqServiceSlug = (enSlug: string) =>
  Object.entries(en.services as Record<string, { enSlug: string }>).find(([, v]) => v.enSlug === enSlug)?.[0];

/** Anchors are localised too. */
export const anchors = {
  sq: { projects: 'projekte', how: 'si-punojme', contact: 'kontakt', request: 'kerkese-projekti' },
  en: { projects: 'projects', how: 'how-we-work', contact: 'contact', request: 'project-request' },
} as const;

/** Albanian path → path in `lang`. Albanian paths are the canonical keys of the content package. */
export function localize(sqPath: string, lang: Lang): string {
  if (lang === 'sq') return sqPath;
  const [p, hash] = sqPath.split('#');
  const key = (Object.keys(anchors.sq) as (keyof typeof anchors.sq)[]).find((k) => anchors.sq[k] === hash);
  const h = hash ? '#' + (key ? anchors.en[key] : hash) : '';
  let out: string;
  if (p === '/' || p === '') out = '/en';
  else if (p === '/sherbimet') out = '/en/services';
  else if (p.startsWith('/sherbimet/')) out = '/en/services/' + enServiceSlug(p.split('/')[2]);
  else if (p === '/projektet') out = '/en/projects';
  else if (p.startsWith('/projektet/')) out = '/en/projects/' + p.split('/')[2];
  else if (p === '/kontakt') out = '/en/contact';
  else if (p === '/privatesia') out = '/en/privacy';
  else out = p;
  return out + h;
}

/** Any site path → the same page in the other language. */
export function counterpart(currentPath: string, lang: Lang): string {
  const p = currentPath.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  if (lang === 'sq') return localize(p, 'en');
  const rest = p.replace(/^\/en/, '');
  if (rest === '' || rest === '/') return '/';
  if (rest === '/services') return '/sherbimet';
  if (rest.startsWith('/services/')) return '/sherbimet/' + (sqServiceSlug(rest.split('/')[2]) ?? '');
  if (rest === '/projects') return '/projektet';
  if (rest.startsWith('/projects/')) return '/projektet/' + rest.split('/')[2];
  if (rest === '/contact') return '/kontakt';
  if (rest === '/privacy') return '/privatesia';
  return '/';
}

/* ---------- Content ---------- */

const clone = <T>(o: T): T => JSON.parse(JSON.stringify(o));

function buildEnglish(): Content {
  const c = clone(sq);
  const L = (p: string) => localize(p, 'en');
  const E = en as any;

  // Home
  Object.assign(c.home, { path: '/en', title: E.home.title, description: E.home.description, h1: E.home.h1, intro: E.home.intro });
  c.home.featuredImage.alt = E.home.alt;
  c.home.featuredImage.ogAlt = E.home.ogAlt;
  c.home.heroCtas = [
    { label: E.home.heroCtas[0], href: L('/#projekte') },
    { label: E.home.heroCtas[1], href: L('/kontakt') },
  ];
  c.home.sections.forEach((s: any, i: number) => {
    const t = E.home.sections[i];
    s.heading = t.heading;
    if (t.body) s.body = t.body;
    if (t.items) s.items = t.items;
    if (s.cta) s.cta = { label: t.cta, href: L(s.cta.href) };
  });
  c.home.faq = E.home.faq;

  // Hubs
  for (const h of c.hubs) {
    const t = E.hubs[h.path];
    Object.assign(h, { title: t.title, description: t.description, h1: t.h1, intro: t.intro });
    h.featuredImage.alt = t.alt;
    h.items = h.items.map(L);
    h.path = L(h.path);
  }

  // Services
  for (const s of c.services as any[]) {
    const t = E.services[s.slug];
    Object.assign(s, {
      path: L(s.path), name: t.name, title: t.title, description: t.description, h1: t.h1, intro: t.intro,
      paragraphs: t.paragraphs, audience: t.audience, included: t.included, optional: t.optional, process: t.process,
      faq: t.faq, imageCaption: t.imageCaption, projectSectionHeading: ui.en.relatedProjects,
      cta: { label: 'Discuss this service', href: '#' + anchors.en.request },
    });
    s.featuredImage.alt = t.alt;
    s.form = { ...s.form, heading: t.formHeading, id: anchors.en.request };
  }

  // Projects
  for (const p of c.projects as any[]) {
    const t = E.projects[p.slug];
    Object.assign(p, {
      path: L(p.path), title: t.title, description: t.description, intro: t.intro, context: t.context,
      solution: t.solution, features: t.features, cta: { label: ui.en.similarCta, href: L('/kontakt') },
    });
    if (t.name) { p.name = t.name; p.h1 = t.name; }
    if (p.visibleStatusLabel) p.visibleStatusLabel = t.visibleStatusLabel;
    if (p.visibleImageNotice) p.visibleImageNotice = t.visibleImageNotice;
    p.featuredImage.alt = t.alt;
  }

  // Contact & privacy
  Object.assign(c.contact, { path: '/en/contact', title: E.contact.title, description: E.contact.description, h1: E.contact.h1, intro: E.contact.intro, sections: E.contact.sections });
  c.contact.featuredImage.alt = E.contact.alt;
  const f = c.contact.form as any;
  Object.assign(f, { submit: E.form.submit, success: E.form.success, error: E.form.error, privacy: E.form.privacy, privacyHref: '/en/privacy' });
  f.errors = { ...f.errors, ...E.form.errors, server: E.form.error };
  f.fields = f.fields.map((x: any) => ({ ...x, label: E.form.labels[x.name] }));
  Object.assign(c.privacy, { path: '/en/privacy', title: E.privacy.title, description: E.privacy.description, h1: E.privacy.h1, intro: E.privacy.intro, sections: E.privacy.sections });
  return c;
}

const contents: Record<Lang, Content> = { sq, en: buildEnglish() };
export const content = sq;
export const getContent = (lang: Lang) => contents[lang];

export const serviceBySlug = (slug: string, lang: Lang = 'sq') => {
  const s = contents[lang].services.find((x) => x.slug === slug);
  if (!s) throw new Error('Shërbim i panjohur: ' + slug);
  return s;
};
export const projectBySlug = (slug: string, lang: Lang = 'sq') => {
  const p = contents[lang].projects.find((x) => x.slug === slug);
  if (!p) throw new Error('Projekt i panjohur: ' + slug);
  return p;
};
export const projectPanel = (slug: string, lang: Lang) =>
  (cardsPanel as unknown as Record<string, Record<Lang, { group: string; category: string; summary: string; tags: string[] }>>)[slug][lang];

/* ---------- SEO ---------- */

export interface HeadData { title: string; description: string; robots: string; headHtml: string | null }

const esc = (s: string) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const abs = (p: string) => new URL(p, config.siteUrl!).href;

function allPages(lang: Lang) {
  const c = contents[lang];
  return [c.home, ...c.hubs, ...c.services, ...c.projects, c.contact, c.privacy];
}

function hreflangTags(sqPath: string) {
  if (!config.siteUrl) return [] as string[];
  return [
    `<link rel="alternate" hreflang="sq" href="${esc(abs(sqPath))}">`,
    `<link rel="alternate" hreflang="en" href="${esc(abs(localize(sqPath, 'en')))}">`,
    `<link rel="alternate" hreflang="x-default" href="${esc(abs(sqPath))}">`,
  ];
}

/** Metadata for the English page whose Albanian equivalent is `sqPath`, mirroring the package generator. */
function englishHead(sqPath: string): HeadData {
  const page = allPages('en').find((p) => p.path === localize(sqPath, 'en'))!;
  const indexable = production && enPublished && (config.publishablePaths as string[]).includes(sqPath) && sqPath !== '/privatesia';
  const robots = indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow';
  if (!config.siteUrl) return { title: page.title, description: page.description, robots, headHtml: null };

  // Organization/WebSite nodes come from the package generator so the identity stays identical.
  const sqSeo = makeSeo(sqPath, config, { production });
  const shared = sqSeo.jsonLd['@graph'].filter((n: any) => n['@type'] === 'Organization' || n['@type'] === 'WebSite');
  const url = abs(page.path);
  const kind = (sqSeo.jsonLd['@graph'].find((n: any) => n['@id']?.endsWith('#webpage')) as any)['@type'];
  const graph: any[] = [...shared];
  const webpage: any = { '@type': kind, '@id': url + '#webpage', url, name: page.title, description: page.description, inLanguage: 'en', isPartOf: { '@id': abs('/#website') }, publisher: { '@id': abs('/#organization') } };
  if (sqPath !== '/') {
    const crumbs: [string, string][] = [['Home', '/en']];
    if (sqPath.startsWith('/sherbimet/')) crumbs.push(['Services', '/en/services']);
    if (sqPath.startsWith('/projektet/')) crumbs.push(['Projects', '/en/projects']);
    const label = (page as any).name ?? ({ '/sherbimet': 'Services', '/projektet': 'Projects', '/kontakt': 'Contact', '/privatesia': 'Privacy' } as Record<string, string>)[sqPath];
    crumbs.push([label, page.path]);
    graph.push({ '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: crumbs.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(p) })) });
    webpage.breadcrumb = { '@id': url + '#breadcrumb' };
  }
  if (sqPath.startsWith('/sherbimet/')) {
    const s = page as Service;
    graph.push({ '@type': 'Service', '@id': url + '#service', name: s.name, serviceType: s.name, description: s.intro, url, provider: { '@id': abs('/#organization') }, areaServed: shared.find((n: any) => n['@type'] === 'Organization').areaServed, mainEntityOfPage: { '@id': url + '#webpage' } });
    webpage.mainEntity = { '@id': url + '#service' };
  } else if (sqPath.startsWith('/projektet/')) {
    const p = page as Project;
    graph.push({ '@type': 'CreativeWork', '@id': url + '#portfolio-presentation', name: p.name, description: p.intro, url, inLanguage: 'en', publisher: { '@id': abs('/#organization') }, mainEntityOfPage: { '@id': url + '#webpage' } });
    webpage.mainEntity = { '@id': url + '#portfolio-presentation' };
  } else if (sqPath === '/sherbimet' || sqPath === '/projektet') {
    const items = (sqPath === '/sherbimet' ? contents.en.services : contents.en.projects).filter((it, i) => !production || (config.publishablePaths as string[]).includes((sqPath === '/sherbimet' ? sq.services : sq.projects)[i].path));
    graph.push({ '@type': 'ItemList', '@id': url + '#items', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: abs(it.path) })) });
    webpage.mainEntity = { '@id': url + '#items' };
  }
  graph.push(webpage);

  const og = sqSeo.metadata.openGraph;
  const tags = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}">`,
    `<link rel="canonical" href="${esc(url)}">`,
    `<meta name="robots" content="${robots}">`,
    ...Object.entries({ type: 'website', title: page.title, description: page.description, url, site_name: config.brand, locale: 'en_GB' }).map(([k, v]) => `<meta property="og:${k}" content="${esc(v)}">`),
    `<meta property="og:locale:alternate" content="sq_AL">`,
    ...(og.images ? [`<meta property="og:image" content="${esc(og.images[0].url)}">`, `<meta property="og:image:width" content="${og.images[0].width}">`, `<meta property="og:image:height" content="${og.images[0].height}">`] : []),
    `<meta name="twitter:card" content="${og.images ? 'summary_large_image' : 'summary'}">`,
    `<meta name="twitter:title" content="${esc(page.title)}">`,
    `<meta name="twitter:description" content="${esc(page.description)}">`,
    `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replaceAll('<', '\\u003c')}</script>`,
  ];
  return { title: page.title, description: page.description, robots, headHtml: tags.join('\n') };
}

/** Head data for a page, keyed by its Albanian path. */
export function seoFor(sqPath: string, lang: Lang = 'sq'): HeadData {
  if (production && !config.siteUrl) throw new Error('PRODUCTION=true kërkon SITE_URL / siteUrl të konfirmuar.');
  if (lang === 'en') {
    const h = englishHead(sqPath);
    return h.headHtml ? { ...h, headHtml: h.headHtml + '\n' + hreflangTags(sqPath).join('\n') } : h;
  }
  if (config.siteUrl) {
    const seo = makeSeo(sqPath, config, { production });
    return { title: seo.metadata.title, description: seo.metadata.description, robots: seo.metadata.robots, headHtml: seo.headHtml + '\n' + hreflangTags(sqPath).join('\n') };
  }
  // No confirmed domain: no canonical, no absolute OG/JSON-LD, never indexable.
  const page = allPages('sq').find((p) => p.path === sqPath);
  if (!page) throw new Error('URL e panjohur: ' + sqPath);
  return { title: page.title, description: page.description, robots: 'noindex,follow', headHtml: null };
}

export function sitemapXml() {
  if (!config.siteUrl) return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n';
  let xml = makeSitemap(config, { production });
  if (production && enPublished) {
    const extra = (config.publishablePaths as string[]).filter((p) => p !== '/privatesia').map((p) => `  <url><loc>${esc(abs(localize(p, 'en')))}</loc></url>`).join('\n');
    xml = xml.replace('</urlset>', extra + '\n</urlset>');
  }
  return xml;
}
export function robotsTxt() {
  if (!config.siteUrl) return '# Staging/preview: all pages are noindex; protect staging with authentication.\nUser-agent: *\nAllow: /\n';
  return makeRobots(config, { production });
}

/* ---------- Galleries ---------- */

export interface GalleryImage { path: string; alt: Record<Lang, string> }
const g = (path: string, sqAlt: string, enAlt: string): GalleryImage => ({ path, alt: { sq: sqAlt, en: enAlt } });
/** Optional galleries: only real screenshots supplied in the package (design-original/05 + public/images/projects). */
export const galleries: Record<string, GalleryImage[]> = {
  'thethi-guide': [
    g('/images/gallery/thethi-card-home.jpg', 'Kryefaqja e ridizajnimit Thethi Guide me kërkim dhe kushtet e shtigjeve.', 'Thethi Guide redesign homepage with search and trail conditions.'),
    g('/images/gallery/thethi-card-destinations.jpg', 'Faqja e destinacioneve në ridizajnimin Thethi Guide.', 'Destinations page in the Thethi Guide redesign.'),
    g('/images/gallery/thethi-card-map.jpg', 'Harta e Alpeve Shqiptare me kategori dhe pika interesi.', 'Map of the Albanian Alps with categories and points of interest.'),
    g('/images/gallery/thethi-card-tours.jpg', 'Faqja e tureve dhe përvojave në ridizajnimin Thethi Guide.', 'Tours and experiences page in the Thethi Guide redesign.'),
    g('/images/gallery/thethi-card-chat.jpg', 'Asistenti AI i Thethi Guide me pyetje të sugjeruara.', 'The Thethi Guide AI assistant with suggested questions.'),
  ],
  'gjecaj-guesthouse-restaurant': [
    g('/images/gallery/gjecaj-card-home.jpg', 'Kryefaqja e website-it Gjeçaj.', 'The Gjeçaj website homepage.'),
    g('/images/gallery/gjecaj-card-guesthouse.jpg', 'Faqja e bujtinës Gjeçaj.', 'The Gjeçaj guesthouse page.'),
    g('/images/gallery/gjecaj-card-restaurant.jpg', 'Faqja e restorantit Gjeçaj.', 'The Gjeçaj restaurant page.'),
  ],
  'gjecaj-rezervime': [
    g('/images/projects/gjecaj-rezervime.jpg', 'Formulari publik i rezervimit të tavolinës Gjeçaj.', 'The public Gjeçaj table booking form.'),
  ],
  'baby-gifts-albania': [
    g('/images/gallery/baby-gifts.png', 'Kryefaqja e Baby Gifts Albania me shporta dhuratash.', 'The Baby Gifts Albania homepage with gift baskets.'),
    g('/images/projects/baby-gifts-albania.jpg', 'Pamje e katalogut Baby Gifts Albania.', 'View of the Baby Gifts Albania catalogue.'),
  ],
  'aleks-bzhetaj': [
    g('/images/gallery/aleks-home.jpg', 'Kryefaqja e website-it të Av. Aleks Bzhetaj.', 'The Av. Aleks Bzhetaj website homepage.'),
    g('/images/gallery/aleks-service.jpg', 'Një faqe shërbimi e website-it të Av. Aleks Bzhetaj.', 'A service page of the Av. Aleks Bzhetaj website.'),
  ],
  'mb-cartongesso': [
    g('/images/gallery/mb-home.jpg', 'Kryefaqja e website-it M.B Cartongesso.', 'The M.B Cartongesso website homepage.'),
    g('/images/gallery/mb-services.jpg', 'Faqja e shërbimeve të M.B Cartongesso.', 'The M.B Cartongesso services page.'),
  ],
  'gjecaj-menu-online': [
    g('/images/gallery/menu-online.png', 'Menuja online Gjeçaj me kategori, pjata dhe çmime.', 'The Gjeçaj online menu with categories, dishes and prices.'),
    g('/images/projects/gjecaj-menu-online.jpg', 'Menuja publike Gjeçaj në një pamje tjetër.', 'Another view of the public Gjeçaj menu.'),
  ],
};
