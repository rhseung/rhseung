import { expect, test, type Page } from '@playwright/test';

/**
 * Playwright 의 actionability 로는 하이드레이션 여부를 알 수 없다. Astro 가 아일랜드를
 * 하이드레이트하면서 떼는 `ssr` 속성이 유일한 신호다.
 */
async function waitForHydration(page: Page) {
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
}

test('목록에서 좁히고, 상세로 들어가고, 영어판으로 넘어간다', async ({ page }) => {
  await page.goto('/ko/projects/');

  const card = page.getByRole('link', { name: 'rhseung.me' });
  await expect(card).toBeVisible();
  await waitForHydration(page);

  await page.getByRole('button', { name: 'Astro', exact: true }).click();
  await expect(page).toHaveURL(/\?stack=Astro/);
  await expect(card).toBeVisible();

  await page.goBack();
  await expect(page).not.toHaveURL(/stack=/);

  await card.click();
  await expect(page).toHaveURL(/\/ko\/projects\/rhseung-me\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'rhseung.me' })).toBeVisible();
  await waitForHydration(page);

  await page.getByRole('link', { name: /EN/ }).click();
  await expect(page).toHaveURL(/\/en\/projects\/rhseung-me\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

// 아일랜드가 SSR 을 건너뛰면 본문이 하이드레이션 <template> 에 갇힌다. 실제로 났던 버그다.
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
  await page.goto('/ko/projects/?stack=Python');

  await expect(page.getByRole('button', { name: 'Python', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByRole('link', { name: 'rhseung.me' })).toBeHidden();
});
