// Generates responsive AVIF/WebP variants from the PNG/JPG masters in public/images.
// Masters are never modified, cropped or upscaled; variants keep the original aspect ratio.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(root, 'public/images');
const outDir = path.join(imagesDir, '_r');
const manifestPath = path.join(root, 'src/data/image-variants.json');
const WIDTHS = [480, 800, 1200, 1600, 2000];
// OG cards are only for sharing; they get no variants.
const SKIP = [/^og\//, /^_r\//];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const masters = walk(imagesDir)
  .map((p) => path.relative(imagesDir, p).replaceAll('\\', '/'))
  .filter((rel) => /\.(png|jpe?g)$/i.test(rel) && !SKIP.some((re) => re.test(rel)));

const manifest = {};
let generated = 0;
for (const rel of masters) {
  const src = path.join(imagesDir, rel);
  const { width, height } = await sharp(src).metadata();
  if (!width || !height) throw new Error('Cannot read size of ' + rel);
  const widths = [...new Set([...WIDTHS.filter((w) => w < width), width])];
  const base = rel.replace(/\.[^.]+$/, '');
  const srcMtime = fs.statSync(src).mtimeMs;
  for (const w of widths) {
    for (const fmt of ['avif', 'webp']) {
      const out = path.join(outDir, `${base}-${w}.${fmt}`);
      if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcMtime) continue;
      fs.mkdirSync(path.dirname(out), { recursive: true });
      const pipeline = sharp(src).resize({ width: w, withoutEnlargement: true });
      await (fmt === 'avif' ? pipeline.avif({ quality: 58, effort: 4 }) : pipeline.webp({ quality: 80 })).toFile(out);
      generated++;
    }
  }
  manifest['/images/' + rel] = { width, height, widths, base: '/images/_r/' + base };
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`images: ${masters.length} masters, ${generated} new variants`);
