import { preview } from 'astro';
import { chromium } from 'playwright';

/**
 * `/about`을 Chromium 인쇄 엔진으로 구워 `public/resume-{lang}.pdf`를 만든다.
 * 화면과 PDF가 같은 컴포넌트에서 나오므로 둘이 어긋날 수가 없다 — 사이트 크롬은
 * `print:hidden`이 걷어낸다.
 *
 * 브라우저 인쇄 대화상자를 쓰지 않는 이유: 기본값이 머리말/꼬리말(URL·날짜·쪽번호)을 찍고
 * 배경색을 끈다. 사용자가 옵션을 안 만지면 지저분한 PDF가 나온다. 여기서는 코드가 정한다.
 *
 * CI가 아니라 로컬에서 돌려 결과물을 커밋한다 — GitHub Actions의 우분투 이미지에는 한글
 * 폰트가 없어서 글자가 전부 두부(□)로 나온다. `bun run gen`에 안 넣은 이유가 이것이다.
 */
const PORT = 4326;

const TARGETS = [
  { lang: 'ko', path: '/ko/about/', title: '류현승 — 이력서' },
  { lang: 'en', path: '/en/about/', title: 'Ryu Hyunseung — Résumé' },
] as const;

const server = await preview({ server: { port: PORT } });
const browser = await chromium.launch();
const context = await browser.newContext({ colorScheme: 'light' });

try {
  for (const { lang, path, title } of TARGETS) {
    const page = await context.newPage();

    const response = await page.goto(`http://localhost:${PORT}${path}`, {
      waitUntil: 'networkidle',
    });

    // `goto`는 404에도 예외를 안 던진다. 라우트가 바뀌면 404 페이지가 이력서로 구워진다.
    if (response?.status() !== 200) {
      throw new Error(`${path} 가 ${response?.status()} 입니다`);
    }
    await page.emulateMedia({ media: 'print' });

    // Chromium은 PDF의 `/Title`을 문서 제목에서 가져온다. 그대로 두면 사이트 라우트 제목
    // ("소개 — rhseung")이 이력서 파일 제목이 된다 — PDF 리더와 ATS가 그걸 읽는다.
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

    console.log(`✔ ${output}`);
    await page.close();
  }
} finally {
  await context.close();
  await browser.close();
  await server.stop();
}
