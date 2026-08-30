import { existsSync } from 'node:fs';
import { copyFile, readFile, writeFile } from 'node:fs/promises';

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

export async function generateResumePdfs() {
  if (!existsSync('dist')) {
    throw new Error('dist/ 가 없습니다. `astro build` 뒤에 실행하세요.');
  }

  // Vercel 빌드 이미지에는 Playwright 브라우저가 없다. 커밋된 PDF 를 그대로 배포한다.
  let browser;
  try {
    browser = await chromium.launch();
  } catch {
    console.warn('⚠ Chromium 이 없어 이력서 PDF 생성을 건너뜁니다 (커밋된 파일을 씁니다)');
    return;
  }

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

      await freezeTimestamps(output);

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

/**
 * Chromium 이 박는 `/CreationDate`·`/ModDate` 때문에 같은 내용이어도 바이트가 매번 달라져
 * CI 의 `git diff --exit-code` 가 항상 실패한다.
 *
 * 같은 길이로 덮어써야 PDF 의 xref 바이트 오프셋이 안 깨진다.
 */
async function freezeTimestamps(file: string) {
  const FROZEN = "D:19700101000000+00'00'";
  const buffer = await readFile(file);
  const patched = buffer
    .toString('latin1')
    .replace(/\/(CreationDate|ModDate) \(D:[^)]+\)/g, (_match, key: string) => {
      const replacement = `/${key} (${FROZEN})`;
      return replacement.length === _match.length ? replacement : _match;
    });

  await writeFile(file, Buffer.from(patched, 'latin1'));
}

if (import.meta.main) {
  await generateResumePdfs();
}
