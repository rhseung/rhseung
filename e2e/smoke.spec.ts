import { expect, test } from '@playwright/test';

/**
 * 사용자 여정 하나에 spec 하나. 라우트가 서면 홈 → 프로젝트 → 상세 → 언어 전환으로 늘린다.
 * 지금은 셸이 뜨는지만 본다.
 */
test('홈이 뜬다', async ({ page }) => {
  const response = await page.goto('/ko/');

  expect(response?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
});

// 모든 라우트가 언어 접두사를 갖는다. 루트는 기본 언어로 보내는 리다이렉트 한 장뿐이다.
test('루트가 기본 언어로 보낸다', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/ko\/$/);
});

// 메타는 `/images/og.png`를 가리킨다. 파일이 없으면 공유 카드가 빈 채로 나가는데
// 그건 브라우저에서 안 보여서 조용히 썩는다 — 여기서 시끄럽게 깨뜨린다.
test('og 이미지가 실제로 있다', async ({ request }) => {
  const response = await request.get('/images/og.png');

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('image/png');
});

test('없는 경로는 404 페이지로 간다', async ({ page }) => {
  await page.goto('/no-such-page');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
