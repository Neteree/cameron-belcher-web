// Draws the link-preview image (public/og.png, 1200x630) and the phone home
// screen icon (public/apple-touch-icon.png, 180x180). Run it again after
// changing the name, tagline or colours:
//
//   node scripts/share-images.js
import { launch } from './browser.js';
import { site } from '../src/site.config.ts';

const fonts =
  'https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Figtree:wght@500;700&display=swap';

const share = `<!doctype html><html><head><link rel="stylesheet" href="${fonts}"><style>
  body { margin: 0; width: 1200px; height: 630px; background: #f3f1ec; font-family: Figtree, sans-serif; color: #13231b; }
  .card { box-sizing: border-box; height: 100%; padding: 72px 80px; display: flex; flex-direction: column; justify-content: space-between; border-bottom: 18px solid #c9962b; }
  .eyebrow { font-weight: 700; font-size: 26px; letter-spacing: 0.14em; text-transform: uppercase; color: #1d4a35; margin: 0; }
  h1 { font-family: 'Alfa Slab One', serif; font-weight: 400; font-size: 84px; line-height: 1.02; margin: 0; max-width: 980px; }
  h1 span { color: #b3831f; }
  .foot { display: flex; justify-content: space-between; align-items: end; font-size: 30px; font-weight: 500; }
  .name { font-family: 'Alfa Slab One', serif; font-size: 44px; color: #1d4a35; }
</style></head><body><div class="card">
  <p class="eyebrow">${site.role} · ${site.city}</p>
  <h1>Websites that bring <span>local customers</span> through the door.</h1>
  <div class="foot"><span class="name">${site.name}</span><span>No monthly fees</span></div>
</div></body></html>`;

const icon = `<!doctype html><html><head><link rel="stylesheet" href="${fonts}"><style>
  body { margin: 0; width: 180px; height: 180px; background: #1d4a35; display: grid; place-items: center; }
  div { font-family: 'Alfa Slab One', serif; font-size: 78px; color: #f3f1ec; border-bottom: 10px solid #c9962b; line-height: 1.1; }
</style></head><body><div>CB</div></body></html>`;

const browser = await launch();
for (const [html, size, path] of [
  [share, { width: 1200, height: 630 }, 'public/og.png'],
  [icon, { width: 180, height: 180 }, 'public/apple-touch-icon.png'],
]) {
  const page = await browser.newPage({ viewport: size });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path });
  console.log(`Wrote ${path}`);
}
await browser.close();
