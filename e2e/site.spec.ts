import { expect, test } from '@playwright/test';

test('네비가 모든 라우트를 잇는다', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: '글' }).click();
  await expect(page).toHaveURL(/\/blog\/$/);

  await page.getByRole('link', { name: '소개' }).click();
  await expect(page).toHaveURL(/\/about\/$/);

  // 로고는 홈으로 돌아간다.
  await page.getByRole('link', { name: 'rhseung', exact: true }).click();
  await expect(page).toHaveURL(/localhost:\d+\/$/);
});

test('글을 목록에서 열어 본문까지 읽는다', async ({ page }) => {
  await page.goto('/blog/');

  const post = page.getByRole('link', { name: /Provider 하나가/ });
  await expect(post).toBeVisible();

  await post.click();
  await expect(page.getByRole('heading', { level: 1, name: /Provider 하나가/ })).toBeVisible();
  await expect(page.getByText('원인')).toBeVisible();
});

test('이력서 PDF가 실제로 있다', async ({ request }) => {
  for (const lang of ['ko', 'en']) {
    const response = await request.get(`/resume-${lang}.pdf`);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('pdf');
  }
});

// PDF 원본 라우트는 방문자가 볼 페이지가 아니다. 색인되면 /about 과 중복으로 잡힌다.
test('PDF 원본 라우트는 noindex다', async ({ page }) => {
  await page.goto('/resume/ko/');

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});

test('RSS와 sitemap이 나간다', async ({ request }) => {
  const rss = await request.get('/rss.xml');
  expect(rss.status()).toBe(200);
  expect(await rss.text()).toContain('<rss');

  const sitemap = await request.get('/sitemap-index.xml');
  expect(sitemap.status()).toBe(200);
});
