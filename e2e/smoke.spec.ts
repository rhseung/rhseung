import { expect, test } from '@playwright/test';

test('홈이 뜬다', async ({ page }) => {
  const response = await page.goto('/ko/');

  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
});

test('루트가 기본 언어로 보낸다', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/ko\/$/);
});

// 파일이 없으면 공유 카드가 빈 채로 나가는데 브라우저에서는 안 보인다.
test('og 이미지가 실제로 있다', async ({ request }) => {
  const response = await request.get('/images/og.png');

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('image/png');
});

test('없는 경로는 404 페이지로 간다', async ({ page }) => {
  await page.goto('/no-such-page');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
