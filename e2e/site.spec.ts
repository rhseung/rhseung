import { expect, test } from '@playwright/test';

test('네비가 모든 라우트를 잇는다', async ({ page }) => {
  await page.goto('/ko/');

  await page.getByRole('link', { name: '글' }).click();
  await expect(page).toHaveURL(/\/ko\/blog\/$/);

  await page.getByRole('link', { name: '커리어' }).click();
  await expect(page).toHaveURL(/\/ko\/career\/$/);

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
test('이력서가 각 컬렉션에서 채워진다', async ({ page }) => {
  await page.goto('/ko/resume/');

  for (const section of ['경력', '학력', '주요 프로젝트', '수상 및 성취', '기술']) {
    await expect(page.getByRole('heading', { level: 2, name: section, exact: true })).toBeVisible();
  }

  await expect(page.getByText('Astro 아일랜드 위에 올린 개인 사이트')).toBeVisible();
});

// 커리어는 훑어보는 페이지, 이력서는 PDF 를 들고 나가는 페이지다. 데이터 출처는 하나다.
test('커리어 페이지가 세 섹션을 갖는다', async ({ page }) => {
  await page.goto('/ko/career/');

  await expect(page.getByRole('heading', { level: 1, name: '커리어' })).toBeVisible();
  for (const section of ['경력', '학력', '수상 및 성취', '기술']) {
    await expect(page.getByRole('heading', { level: 2, name: section, exact: true })).toBeVisible();
  }
});

// 푸터가 모든 페이지에서 소셜·구독 링크로 잇는다.
test('푸터가 모든 페이지에 있다', async ({ page }) => {
  for (const path of ['/ko/', '/ko/projects/', '/ko/blog/', '/ko/career/']) {
    await page.goto(path);
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expect(page.getByRole('navigation', { name: '푸터' })).toBeVisible();
  }
});

test('RSS와 sitemap이 나간다', async ({ request }) => {
  const rss = await request.get('/rss.xml');
  expect(rss.status()).toBe(200);
  expect(await rss.text()).toContain('<rss');

  const sitemap = await request.get('/sitemap-index.xml');
  expect(sitemap.status()).toBe(200);
});
