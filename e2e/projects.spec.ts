import { expect, test, type Page } from '@playwright/test';

/**
 * Playwright의 actionability는 "보이고 클릭 가능한가"만 본다 — React가 붙었는지는 모른다.
 * 하이드레이션 전에 누르면 아무 일도 안 일어나고 테스트만 흔들린다.
 * Astro는 아일랜드를 하이드레이트하면서 `ssr` 속성을 뗀다. 그게 신호다.
 */
async function waitForHydration(page: Page) {
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
}

test('목록에서 좁히고, 상세로 들어가고, 영어판으로 넘어간다', async ({ page }) => {
  await page.goto('/ko/projects/');

  const card = page.getByRole('link', { name: 'rhseung.me' });
  await expect(card).toBeVisible();
  await waitForHydration(page);

  // 필터는 URL에 산다 — 공유되고 뒤로가기가 동작해야 한다.
  await page.getByRole('button', { name: /웹/ }).click();
  await expect(page).toHaveURL(/\?domain=web/);
  await expect(card).toBeVisible();

  await page.goBack();
  await expect(page).not.toHaveURL(/domain=/);

  await card.click();
  await expect(page).toHaveURL(/\/ko\/projects\/rhseung-me\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'rhseung.me' })).toBeVisible();
  await waitForHydration(page);

  await page.getByRole('link', { name: /EN/ }).click();
  await expect(page).toHaveURL(/\/en\/projects\/rhseung-me\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

// 아일랜드가 SSR을 건너뛰면 본문이 하이드레이션 <template>에 갇혀 크롤러가 빈 문서를 본다.
// 한 번 그랬던 적이 있어서 회귀로 남긴다.
test('JS 없이도 프로젝트 본문이 읽힌다', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto('/ko/projects/rhseung-me/');
  await expect(page.getByRole('heading', { level: 1, name: 'rhseung.me' })).toBeVisible();
  await expect(page.getByText('왜 만들었나')).toBeVisible();

  await page.goto('/ko/projects/');
  await expect(page.getByRole('link', { name: 'rhseung.me' })).toBeVisible();

  await context.close();
});

test('직접 연 필터 URL이 그 상태로 뜬다', async ({ page }) => {
  await page.goto('/ko/projects/?domain=graphics');

  await expect(page.getByRole('button', { name: /그래픽스/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByRole('link', { name: 'rhseung.me' })).toBeHidden();
});
