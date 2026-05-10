import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

const translations = {
  en: require('./translations/en.json'),
  de: require('./translations/de.json')
};

const DIST_DIR = path.join(__dirname, 'dist');
const VIEWS_DIR = path.join(__dirname, 'views');
const PUBLIC_DIR = path.join(__dirname, 'public');

const pages = [
  { route: '', template: 'index' },
  { route: 'how-it-works', template: 'how-it-works' },
  { route: 'about', template: 'about' },
  { route: 'prices', template: 'prices' },
  { route: 'gallery', template: 'gallery' },
  { route: 'contact', template: 'contact' }
];

const languages = ['en', 'de'];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyPublic() {
  if (!fs.existsSync(PUBLIC_DIR)) return;

  function copyRecursive(src, dest) {
    ensureDir(dest);
    fs.readdirSync(src).forEach(file => {
      const srcFile = path.join(src, file);
      const destFile = path.join(dest, file);
      const stat = fs.statSync(srcFile);
      if (stat.isDirectory()) {
        copyRecursive(srcFile, destFile);
      } else {
        fs.copyFileSync(srcFile, destFile);
      }
    });
  }

  copyRecursive(PUBLIC_DIR, DIST_DIR);
  console.log('✓ Copied public assets');
}

async function buildSite() {
  console.log('🔨 Building static site...\n');

  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true });
  }
  ensureDir(DIST_DIR);

  copyPublic();

  let successCount = 0;
  for (const lang of languages) {
    const langDir = path.join(DIST_DIR, lang);
    ensureDir(langDir);

    for (const page of pages) {
      const t = translations[lang];
      const template = lang === 'de' ? `${page.template}_de` : page.template;
      const templatePath = path.join(VIEWS_DIR, `${template}.ejs`);

      if (!fs.existsSync(templatePath)) {
        console.warn(`⚠ Template not found: ${template}.ejs`);
        continue;
      }

      try {
        const currentPath = page.route ? `${page.route}/` : '';
        const html = await ejs.renderFile(templatePath, {
          lang,
          t,
          currentPath,
          otherLang: lang === 'en' ? 'de' : 'en'
        });

        const outputDir = page.route ? path.join(langDir, page.route) : langDir;
        const outputFile = path.join(outputDir, 'index.html');
        ensureDir(outputDir);
        fs.writeFileSync(outputFile, html);
        console.log(`✓ /${lang}${page.route ? '/' + page.route : ''}`);
        successCount++;
      } catch (err) {
        console.error(`✗ Error rendering ${template}.ejs:`, err.message);
      }
    }
  }

  const redirectHtml = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="0; url=/en/">
</head>
</html>`;
  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), redirectHtml);

  console.log(`\n✨ Build complete! (${successCount} pages rendered)`);
  console.log(`📁 Output: ${DIST_DIR}`);
}

buildSite().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
