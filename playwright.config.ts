import { defineConfig, devices } from '@playwright/test';

import { DEFAULT_LANGUAGE, LANGUAGE_TAGS } from './src/common/lib/languages';

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
    locale: LANGUAGE_TAGS[DEFAULT_LANGUAGE],
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  webServer: {
    command: `bunx --bun astro preview --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
    env: {
      PUBLIC_ENABLE_MSW: 'false',
      ASTRO_DEV_BACKGROUND: '0',
      ASTRO_PREVIEW_BACKGROUND: '0',
    },
  },
});
