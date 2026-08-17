import { expect, test } from '@playwright/test';

/**
 * 사용자 여정 하나에 spec 하나. 라우트가 서면 홈 → 프로젝트 → 상세 → 언어 전환으로 늘린다.
 * 지금은 셸이 뜨는지만 본다.
 */
test('홈이 뜬다', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
});

test('없는 경로는 404 페이지로 간다', async ({ page }) => {
  await page.goto('/no-such-page');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
