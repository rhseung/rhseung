import { existsSync } from 'node:fs';
import { copyFile } from 'node:fs/promises';

import { preview } from 'astro';
import { chromium } from 'playwright';

/**
 * `/{lang}/resume/` 를 Chromium 인쇄 엔진으로 구워 `public/resume-{lang}.pdf` 를 만든다.
 * 인쇄 대화상자는 기본값이 머리말·꼬리말을 찍고 배경색을 꺼서 쓰지 않는다.
 */
const PORT = 4326;

const TARGETS = [
  { lang: 'ko', path: '/ko/resume/', title: '류현승 — 이력서' },
  { lang: 'en', path: '/en/resume/', title: 'Hyunseung Ryu — Résumé' },
] as const;

/**
 * Vercel 빌드 이미지(Amazon Linux 2023)에는 Playwright 브라우저도 Chromium 이 요구하는 공유
 * 라이브러리도 없다. `@sparticuz/chromium` 은 그 라이브러리까지 자기가 번들한다.
 */
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

      // `goto` 는 404 에도 예외를 안 던진다. 그대로 두면 404 페이지가 이력서로 구워진다.
      if (response?.status() !== 200) {
        throw new Error(`${path} 가 ${response?.status()} 입니다`);
      }

      await page.emulateMedia({ media: 'print' });

      // Chromium 은 PDF 의 `/Title` 을 문서 제목에서 가져온다.
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

      // `public/` 은 빌드 초반에 이미 복사됐다. 안 넣으면 배포본에 직전 버전이 남는다.
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
