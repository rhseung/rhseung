import { defineConfig, devices } from '@playwright/test';

const PORT = 4322;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // 앱 언어는 URL(`/` vs `/en/`)이 정한다. 이건 날짜·숫자 포매팅이 머신 로케일에
    // 좌우되지 않게 고정하는 용도다.
    locale: 'ko-KR',
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  webServer: {
    /**
     * dev가 아니라 빌드 결과물을 상대로 돈다.
     *
     * 두 가지 이유. e2e가 RSS·sitemap·PDF 같은 **빌드 산출물**을 검사하는데 dev 서버는
     * 그걸 다르게 서빙한다. 그리고 Astro 7의 dev 데몬은 포트가 달라도 두 번째 인스턴스를
     * 거부해서, `bun run dev`를 켜둔 채로는 e2e가 아예 못 뜬다.
     *
     * 빌드는 여기가 아니라 `test:e2e` 스크립트가 먼저 돌린다 — 이 자리에 체인을 걸면
     * Playwright가 빌드 종료를 서버 종료로 보고 "exited early"로 죽는다.
     */
    command: `bunx --bun astro preview --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
    // 목킹할 네트워크가 없다. 개발자의 .env와 무관하게 꺼서 프로덕션과 같은 경로를 탄다.
    //
    // Astro 7은 AI 에이전트 환경을 감지하면 서버를 백그라운드 데몬으로 돌린다(명령이 즉시
    // 종료) — Playwright는 foreground 프로세스가 계속 살아 있길 기대하므로 꺼야 한다.
    // dev와 preview가 각각 다른 변수를 본다. `ASTRO_DEV_BACKGROUND`는 preview에 안 먹는다.
    env: {
      PUBLIC_ENABLE_MSW: 'false',
      ASTRO_DEV_BACKGROUND: '0',
      ASTRO_PREVIEW_BACKGROUND: '0',
    },
  },
});
