import fs from 'node:fs';
import path from 'node:path';
import content from '../data/content.sq.json';
import template from '../data/site-config.template.json';
import { makeSeo, makeSitemap, makeRobots } from '../../scripts/seo-tools.mjs';

export { content };
export type Service = (typeof content.services)[number];
export type Project = (typeof content.projects)[number];

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

export interface HeadData {
  title: string;
  description: string;
  robots: string;
  headHtml: string | null;
}

export function seoFor(routePath: string): HeadData {
  if (config.siteUrl) {
    const seo = makeSeo(routePath, config, { production });
    return { title: seo.metadata.title, description: seo.metadata.description, robots: seo.metadata.robots, headHtml: seo.headHtml };
  }
  if (production) throw new Error('PRODUCTION=true kërkon SITE_URL / siteUrl të konfirmuar.');
  // No confirmed domain: no canonical, no absolute OG/JSON-LD, never indexable.
  const page = allPages().find((p) => p.path === routePath);
  if (!page) throw new Error('URL e panjohur: ' + routePath);
  return { title: page.title, description: page.description, robots: 'noindex,follow', headHtml: null };
}

export function sitemapXml() {
  if (!config.siteUrl) return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n';
  return makeSitemap(config, { production });
}
export function robotsTxt() {
  if (!config.siteUrl) return '# Staging/preview: all pages are noindex; protect staging with authentication.\nUser-agent: *\nAllow: /\n';
  return makeRobots(config, { production });
}

function allPages() {
  return [content.home, ...content.hubs, ...content.services, ...content.projects, content.contact, content.privacy];
}

export const serviceBySlug = (slug: string) => {
  const s = content.services.find((x) => x.slug === slug);
  if (!s) throw new Error('Shërbim i panjohur: ' + slug);
  return s;
};
export const projectBySlug = (slug: string) => {
  const p = content.projects.find((x) => x.slug === slug);
  if (!p) throw new Error('Projekt i panjohur: ' + slug);
  return p;
};

/** Short labels for project cards, taken from the original card compositions. */
export const projectTags: Record<string, string> = {
  'thethi-guide': 'Website turistik',
  'gjecaj-guesthouse-restaurant': 'Bujtinë & restorant',
  'gjecaj-rezervime': 'Rezervime',
  'baby-gifts-albania': 'Katalog me WhatsApp',
  'aleks-bzhetaj': 'Faqe profesionale',
  'mb-cartongesso': 'Interier',
  'gjecaj-menu-online': 'Menu online',
};

export interface GalleryImage { path: string; alt: string }
/** Optional galleries: only real screenshots supplied in the package (design-original/05 + public/images/projects). */
export const galleries: Record<string, GalleryImage[]> = {
  'thethi-guide': [
    { path: '/images/gallery/thethi-card-home.jpg', alt: 'Kryefaqja e ridizajnimit Thethi Guide me kërkim dhe kushtet e shtigjeve.' },
    { path: '/images/gallery/thethi-card-destinations.jpg', alt: 'Faqja e destinacioneve në ridizajnimin Thethi Guide.' },
    { path: '/images/gallery/thethi-card-map.jpg', alt: 'Harta e Alpeve Shqiptare me kategori dhe pika interesi.' },
    { path: '/images/gallery/thethi-card-tours.jpg', alt: 'Faqja e tureve dhe përvojave në ridizajnimin Thethi Guide.' },
    { path: '/images/gallery/thethi-card-chat.jpg', alt: 'Asistenti AI i Thethi Guide me pyetje të sugjeruara.' },
  ],
  'gjecaj-guesthouse-restaurant': [
    { path: '/images/gallery/gjecaj-card-home.jpg', alt: 'Kryefaqja e website-it Gjeçaj.' },
    { path: '/images/gallery/gjecaj-card-guesthouse.jpg', alt: 'Faqja e bujtinës Gjeçaj.' },
    { path: '/images/gallery/gjecaj-card-restaurant.jpg', alt: 'Faqja e restorantit Gjeçaj.' },
  ],
  'gjecaj-rezervime': [
    { path: '/images/projects/gjecaj-rezervime.jpg', alt: 'Formulari publik i rezervimit të tavolinës Gjeçaj.' },
  ],
  'baby-gifts-albania': [
    { path: '/images/gallery/baby-gifts.png', alt: 'Kryefaqja e Baby Gifts Albania me shporta dhuratash.' },
    { path: '/images/projects/baby-gifts-albania.jpg', alt: 'Pamje e katalogut Baby Gifts Albania.' },
  ],
  'aleks-bzhetaj': [
    { path: '/images/gallery/aleks-home.jpg', alt: 'Kryefaqja e website-it të Av. Aleks Bzhetaj.' },
    { path: '/images/gallery/aleks-service.jpg', alt: 'Një faqe shërbimi e website-it të Av. Aleks Bzhetaj.' },
  ],
  'mb-cartongesso': [
    { path: '/images/gallery/mb-home.jpg', alt: 'Kryefaqja e website-it M.B Cartongesso.' },
    { path: '/images/gallery/mb-services.jpg', alt: 'Faqja e shërbimeve të M.B Cartongesso.' },
  ],
  'gjecaj-menu-online': [
    { path: '/images/gallery/menu-online.png', alt: 'Menuja online Gjeçaj me kategori, pjata dhe çmime.' },
    { path: '/images/projects/gjecaj-menu-online.jpg', alt: 'Menuja publike Gjeçaj në një pamje tjetër.' },
  ],
};
