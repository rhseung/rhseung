import { defineConfig, devices } from '@playwright/test';

import { DEFAULT_LANGUAGE, languageTag } from './src/common/lib/i18n/languages';

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
    locale: languageTag(DEFAULT_LANGUAGE),
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  // `astro preview` 가 아니라 worker 를 띄운다. preview 는 자산만 서빙해서
  // `/api/*`, `/resume-*.pdf`, `/` 의 언어 협상을 하나도 검사하지 못한다.
  webServer: {
    command: `wrangler dev --local --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
