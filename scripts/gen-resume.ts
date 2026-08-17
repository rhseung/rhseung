import { preview } from 'astro';
import { chromium } from 'playwright';

/**
 * `/resume/{lang}/`을 Chromium 인쇄 엔진으로 구워 `public/resume-{lang}.pdf`를 만든다.
 * `/about`은 그 PDF를 뷰어로 보여주므로, 원본과 표시가 서로를 재귀로 물지 않는다.
 *
 * 브라우저 인쇄 대화상자를 쓰지 않는 이유: 기본값이 머리말/꼬리말(URL·날짜·쪽번호)을 찍고
 * 배경색을 끈다. 사용자가 옵션을 안 만지면 지저분한 PDF가 나온다. 여기서는 코드가 정한다.
 *
 * CI가 아니라 로컬에서 돌려 결과물을 커밋한다 — GitHub Actions의 우분투 이미지에는 한글
 * 폰트가 없어서 글자가 전부 두부(□)로 나온다. `bun run gen`에 안 넣은 이유가 이것이다.
 */
const PORT = 4326;

const TARGETS = [
  { lang: 'ko', path: '/resume/ko/' },
  { lang: 'en', path: '/resume/en/' },
] as const;

const server = await preview({ server: { port: PORT } });
// 테마 토글이 남긴 값과 무관하게 항상 밝은 배경으로 굽는다.
const browser = await chromium.launch();
const context = await browser.newContext({ colorScheme: 'light' });

try {
  for (const { lang, path } of TARGETS) {
    const page = await context.newPage();

    await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });

    const output = `public/resume-${lang}.pdf`;
    await page.pdf({
      path: output,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: false,
      margin: { top: '16mm', right: '16mm', bottom: '16mm', left: '16mm' },
    });

    console.log(`✔ ${output}`);
    await page.close();
  }
} finally {
  await context.close();
  await browser.close();
  await server.stop();
}
