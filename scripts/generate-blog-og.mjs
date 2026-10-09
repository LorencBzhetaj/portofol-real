import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.cwd();
const outDir = path.join(root, 'public/images/og');
fs.mkdirSync(outDir, { recursive: true });

const posts = [
  {
    slug: 'sa-kushton-nje-faqe-interneti-per-biznes',
    title: 'Sa kushton një faqe\ninterneti për biznes?',
    category: 'Planifikimi i faqes',
  },
  {
    slug: 'instagram-apo-website-per-biznes',
    title: 'Instagram apo website\npër biznesin tënd?',
    category: 'Prania online',
  },
  {
    slug: 'cfare-duhet-te-kete-faqja-e-nje-bujtine-ose-restoranti',
    title: 'Çfarë duhet të ketë faqja\ne një bujtine ose restoranti',
    category: 'Turizëm dhe mikpritje',
  },
  {
    slug: 'si-funksionon-nje-sistem-rezervimesh-online',
    title: 'Si funksionon një sistem\nrezervimesh online?',
    category: 'Rezervime dhe sisteme web',
  },
];

function makeSvg(title, category) {
  // Split title into lines (pre-split from data above using \n)
  const lines = title.split('\n');
  const line1 = lines[0] || '';
  const line2 = lines[1] || '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f7f3ec"/>

  <!-- Top bar -->
  <rect width="1200" height="4" fill="#111111"/>

  <!-- Category tag -->
  <rect x="64" y="80" width="${category.length * 9 + 32}" height="36" rx="18" fill="#111111"/>
  <text x="80" y="104" font-family="Georgia, serif" font-size="15" font-weight="400" fill="#f7f3ec" letter-spacing="0.5">${category}</text>

  <!-- Title lines -->
  <text x="64" y="240" font-family="Georgia, serif" font-size="68" font-weight="700" fill="#111111">${line1.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</text>
  ${line2 ? `<text x="64" y="330" font-family="Georgia, serif" font-size="68" font-weight="700" fill="#111111">${line2.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</text>` : ''}

  <!-- Brand line at bottom -->
  <text x="64" y="560" font-family="Georgia, serif" font-size="22" font-weight="400" fill="#777060" letter-spacing="0.5">LB STUDIO — Blog</text>

  <!-- Decorative right accent -->
  <rect x="1100" y="64" width="4" height="502" fill="#e8e0d0"/>
</svg>`;
}

for (const p of posts) {
  const svg = makeSvg(p.title, p.category);
  const outPath = path.join(outDir, `blog--${p.slug}.png`);
  await sharp(Buffer.from(svg)).png().toFile(outPath);
  console.log('Generated:', path.relative(root, outPath));
}
