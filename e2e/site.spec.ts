import { expect, test } from '@playwright/test';

test('네비가 모든 라우트를 잇는다', async ({ page }) => {
  await page.goto('/ko/');

  await page.getByRole('link', { name: '글' }).click();
  await expect(page).toHaveURL(/\/ko\/blog\/$/);

  await page.getByRole('link', { name: '소개' }).click();
  await expect(page).toHaveURL(/\/ko\/about\/$/);

  // 로고는 홈으로 돌아간다.
  await page.getByRole('link', { name: 'rhseung', exact: true }).click();
  await expect(page).toHaveURL(/\/ko\/$/);
});

test('글을 목록에서 열어 본문까지 읽는다', async ({ page }) => {
  await page.goto('/ko/blog/');

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

// 이력서의 프로젝트 섹션은 yaml에 없다 — projects 컬렉션에서 채워진다.
// 배선이 끊기면 섹션이 통째로 사라지는데, yaml만 보면 눈치채지 못한다.
test('이력서 프로젝트 섹션이 컬렉션에서 채워진다', async ({ page }) => {
  await page.goto('/ko/about/');

  const section = page.getByRole('heading', { name: '주요 프로젝트' });
  await expect(section).toBeVisible();
  await expect(page.getByText('Astro 아일랜드 위에 올린 개인 사이트')).toBeVisible();
});

test('RSS와 sitemap이 나간다', async ({ request }) => {
  const rss = await request.get('/rss.xml');
  expect(rss.status()).toBe(200);
  expect(await rss.text()).toContain('<rss');

  const sitemap = await request.get('/sitemap-index.xml');
  expect(sitemap.status()).toBe(200);
});
