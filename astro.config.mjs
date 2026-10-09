// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL is only set once the real domain (or a staging origin) is known.
// Without it, pages omit canonical/OG URLs instead of guessing a domain.
const site = process.env.SITE_URL || undefined;

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'directory' },
  compressHTML: true,
  devToolbar: { enabled: false },
});
