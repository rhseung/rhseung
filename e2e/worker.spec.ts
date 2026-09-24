import { expect, test } from '@playwright/test';

test('루트가 브라우저 언어를 보고 보낸다', async ({ request }) => {
  const en = await request.get('/', {
    headers: { 'accept-language': 'en-US,en' },
    maxRedirects: 0,
  });

  expect(en.status()).toBe(302);
  expect(en.headers()['location']).toBe('/en/');
  expect(en.headers()['vary']).toContain('accept-language');

  const ko = await request.get('/', {
    headers: { 'accept-language': 'ko-KR,ko' },
    maxRedirects: 0,
  });

  expect(ko.headers()['location']).toBe('/ko/');
});

test('Accept-Language 가 없으면 기본 언어로 간다 - crawler 가 그렇게 온다', async ({ request }) => {
  const response = await request.get('/', { headers: { 'accept-language': '' }, maxRedirects: 0 });

  expect(response.headers()['location']).toBe('/ko/');
});

test('api 라우트가 worker 에 닿는다 - 자산 계층이 가로채면 404, 405 가 아니라 HTML 이 온다', async ({
  request,
}) => {
  expect((await request.post('/api/contributions')).status()).toBe(405);

  expect((await request.post('/api/render-resume')).status()).toBe(401);

  const favicon = await request.get('/api/favicon/not_a_host');

  expect(favicon.status()).toBe(404);
  expect((await favicon.body()).length).toBe(0);
});

test('이력서 PDF 경로가 worker 에 닿는다 - 본문 없는 404 여야 한다', async ({ request }) => {
  const response = await request.get('/resume-ko.pdf');

  expect(response.status()).toBe(404);
  expect((await response.body()).length).toBe(0);
});

test('없는 경로는 그 언어의 404 를 준다', async ({ page }) => {
  const response = await page.goto('/ko/nope/');

  expect(response?.status()).toBe(404);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
});
