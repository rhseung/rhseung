import { expect, test } from '@playwright/test';

// 자산 계층이 가로채면 worker 는 호출조차 안 된다. `run_worker_first` 에서 빠지면 그렇게 된다.
// 배포해야 드러나던 것이라 여기서 잡는다. 네트워크를 타는 분기는 일부러 건드리지 않는다.

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

test('api 라우트가 worker 에 닿는다', async ({ request }) => {
  // 메서드 검사는 upstream fetch 앞이라 네트워크를 안 탄다.
  expect((await request.post('/api/contributions')).status()).toBe(405);

  // 토큰 검사도 R2 앞이다.
  expect((await request.post('/api/render-resume')).status()).toBe(401);

  // host 가 아니면 upstream 에 가지 않고 바로 404 다.
  const favicon = await request.get('/api/favicon/not_a_host');

  expect(favicon.status()).toBe(404);
  expect((await favicon.body()).length).toBe(0);
});

test('이력서 PDF 경로가 worker 에 닿는다', async ({ request }) => {
  const response = await request.get('/resume-ko.pdf');

  // 로컬에는 R2 가 비어 있어 404 다. 자산 계층이 잡았다면 404 페이지 HTML 이 실려 온다.
  expect(response.status()).toBe(404);
  expect((await response.body()).length).toBe(0);
});

test('없는 경로는 그 언어의 404 를 준다', async ({ page }) => {
  const response = await page.goto('/ko/nope/');

  expect(response?.status()).toBe(404);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
});
