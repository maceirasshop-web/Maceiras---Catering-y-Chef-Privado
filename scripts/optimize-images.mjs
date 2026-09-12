import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, 'public', 'images');

const MAP = [
  ['brocheta capresse.jpeg', 'brocheta-capresse'],
  ['camnape de palmito.jpeg', 'canape-de-palmito'],
  ['canape de avepimenton.jpeg', 'canape-de-ave-pimenton'],
  ['canape de huevo.jpeg', 'canape-de-huevo'],
  ['canape de mermelada de cebolla.jpeg', 'canape-de-mermelada-de-cebolla'],
  ['canape de roast beff.jpeg', 'canape-de-roast-beef'],
  ['cevice mixto.jpeg', 'ceviche-mixto'],
  ['empanada de coctel.jpeg', 'empanada-de-coctel'],
  ['tabla de charcuteria.jpeg', 'tabla-de-charcuteria'],
];

const WIDTHS = [480, 800, 1200];

async function writeVariants(inputPath, slug) {
  const img = sharp(inputPath).rotate();
  const meta = await img.metadata();
  const origW = meta.width || 1600;

  for (const width of WIDTHS) {
    const targetW = Math.min(width, origW);
    const pipeline = sharp(inputPath).rotate().resize({
      width: targetW,
      withoutEnlargement: true,
    });

    await pipeline
      .clone()
      .webp({ quality: 72, effort: 5 })
      .toFile(path.join(INPUT_DIR, `${slug}-${width}.webp`));

    await pipeline
      .clone()
      .avif({ quality: 50, effort: 4 })
      .toFile(path.join(INPUT_DIR, `${slug}-${width}.avif`));
  }
}

async function writeOg(inputPath) {
  await sharp(inputPath)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .webp({ quality: 74, effort: 5 })
    .toFile(path.join(INPUT_DIR, 'og-catering.webp'));

  await sharp(inputPath)
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .avif({ quality: 50, effort: 4 })
    .toFile(path.join(INPUT_DIR, 'og-catering.avif'));
}

async function main() {
  if (!fs.existsSync(INPUT_DIR)) {
    throw new Error(`Missing ${INPUT_DIR}`);
  }

  for (const [file, slug] of MAP) {
    const inputPath = path.join(INPUT_DIR, file);
    if (!fs.existsSync(inputPath)) {
      console.warn('Skip missing', file);
      continue;
    }
    console.log('Optimize', file, '→', slug);
    await writeVariants(inputPath, slug);
  }

  const ogSource = path.join(INPUT_DIR, 'tabla de charcuteria.jpeg');
  if (fs.existsSync(ogSource)) {
    console.log('OG image from tabla de charcuteria');
    await writeOg(ogSource);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
