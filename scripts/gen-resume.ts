import { existsSync } from 'node:fs';
import { copyFile } from 'node:fs/promises';

import { preview } from 'astro';
import { chromium } from 'playwright';

const PORT = 4326;

const TARGETS = [
  { lang: 'ko', path: '/ko/resume/', title: '류현승 — 이력서' },
  { lang: 'en', path: '/en/resume/', title: 'Hyunseung Ryu — Résumé' },
] as const;

async function launch() {
  try {
    return await chromium.launch();
  } catch {
    const sparticuz = (await import('@sparticuz/chromium')).default;

    return chromium.launch({
      executablePath: await sparticuz.executablePath(),
      args: sparticuz.args,
    });
  }
}

export async function generateResumePdfs() {
  if (!existsSync('dist')) {
    throw new Error('dist/ 가 없습니다. `astro build` 뒤에 실행하세요.');
  }

  const browser = await launch();
  const server = await preview({ server: { port: PORT } });
  const context = await browser.newContext({ colorScheme: 'light' });

  try {
    for (const { lang, path, title } of TARGETS) {
      const page = await context.newPage();

      const response = await page.goto(`http://localhost:${PORT}${path}`, {
        waitUntil: 'networkidle',
      });

      if (response?.status() !== 200) {
        throw new Error(`${path} 가 ${response?.status()} 입니다`);
      }

      await page.emulateMedia({ media: 'print' });

      await page.evaluate((documentTitle) => {
        document.title = documentTitle;
      }, title);

      const output = `public/resume-${lang}.pdf`;
      await page.pdf({
        path: output,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: false,
        margin: { top: '16mm', right: '16mm', bottom: '16mm', left: '16mm' },
      });

      await copyFile(output, `dist/resume-${lang}.pdf`);

      console.log(`✔ ${output}`);
      await page.close();
    }
  } finally {
    await context.close();
    await browser.close();
    await server.stop();
  }
}

if (import.meta.main) {
  await generateResumePdfs();
}
