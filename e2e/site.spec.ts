import { expect, test } from '@playwright/test';

test('네비가 모든 라우트를 잇는다', async ({ page }) => {
  await page.goto('/ko/');
  const dock = page.getByRole('navigation', { name: '주요 메뉴' });

  await dock.getByRole('link', { name: '글', exact: true }).click();
  await expect(page).toHaveURL(/\/ko\/blog\/$/);

  await dock.getByRole('link', { name: '이력', exact: true }).click();
  await expect(page).toHaveURL(/\/ko\/career\/$/);

  await dock.getByRole('link', { name: '홈', exact: true }).click();
  await expect(page).toHaveURL(/\/ko\/$/);
});

test('글을 목록에서 열어 본문까지 읽는다', async ({ page }) => {
  await page.goto('/ko/blog/');

  const post = page.getByRole('link', { name: /Hello, world/ });
  await expect(post).toBeVisible();

  await post.click();
  await expect(page.getByRole('heading', { level: 1, name: /Hello, world/ })).toBeVisible();
  await expect(page.getByText('제일 먼저 하는 일')).toBeVisible();
  await expect(page.getByRole('alert')).toHaveCount(0);
});

test('번역이 없는 글은 영어 UI 에서 원문과 노티스를 보여준다', async ({ page }) => {
  await page.goto('/en/blog/');

  const post = page.getByRole('link', { name: /Hello, world/ });
  await expect(post).toBeVisible();

  await post.click();
  await expect(page).toHaveURL(/\/en\/blog\/hello-world\/$/);
  await expect(page.getByRole('alert')).toContainText('한국어');
  await expect(page.getByText('제일 먼저 하는 일')).toBeVisible();
  await expect(page.getByRole('link', { name: 'All posts' })).toBeVisible();
});

test('이력서 PDF가 실제로 있다', async ({ request }) => {
  for (const lang of ['ko', 'en']) {
    const response = await request.get(`/resume-${lang}.pdf`);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('pdf');
  }
});

// 이력서의 프로젝트 섹션은 projects 컬렉션에서 채워진다. 끊기면 통째로 사라진다.
test('이력서가 각 컬렉션에서 채워진다', async ({ page }) => {
  await page.goto('/ko/resume/');

  for (const section of ['경력', '학력', '주요 프로젝트', '대회', '기술']) {
    await expect(page.getByRole('heading', { level: 2, name: section, exact: true })).toBeVisible();
  }

  await expect(page.getByText('Astro 아일랜드 위에 올린 개인 사이트')).toBeVisible();
});

test('이력 페이지가 네 섹션을 갖는다', async ({ page }) => {
  await page.goto('/ko/career/');

  await expect(page.getByRole('heading', { level: 1, name: '이력' })).toBeVisible();
  for (const section of ['경력', '학력', '대회', '기술']) {
    await expect(page.getByRole('heading', { level: 2, name: section, exact: true })).toBeVisible();
  }
});

test('독이 모든 페이지에 있다', async ({ page }) => {
  for (const path of ['/ko/', '/ko/projects/', '/ko/blog/', '/ko/career/']) {
    await page.goto(path);
    await expect(page.getByRole('navigation', { name: '주요 메뉴' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'RSS' })).toBeVisible();
  }
});

test('RSS와 sitemap이 나간다', async ({ request }) => {
  const rss = await request.get('/rss.xml');
  expect(rss.status()).toBe(200);
  expect(await rss.text()).toContain('<rss');

  const sitemap = await request.get('/sitemap-index.xml');
  expect(sitemap.status()).toBe(200);
});

// 표 셀 안의 sr-only(absolute) 가 스크롤 상자를 벗어나 문서 폭을 늘린 적이 있다.
test('모바일에서 가로 스크롤이 생기지 않는다', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const path of ['/ko/blog/hello-world/', '/ko/research/sample-paper/', '/ko/projects/']) {
    await page.goto(path);
    const width = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(width, path).toBeLessThanOrEqual(390);
  }
});
