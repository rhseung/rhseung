/// <reference types="vitest/config" />
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const FAVICON = /^\/api\/favicon\/([^/?]+)/;
const NO_FAVICON_HOST = 'example.com';

const faviconStub = () => {
  const middleware = (
    request: { url?: string },
    response: {
      statusCode: number;
      setHeader: (name: string, value: string) => void;
      end: (chunk?: Buffer) => void;
    },
    next: () => void,
  ) => {
    const match = FAVICON.exec(request.url ?? '');

    if (match === null) return next();

    if (decodeURIComponent(match[1]) === NO_FAVICON_HOST) {
      response.statusCode = 404;
      response.end();
      return;
    }

    response.statusCode = 200;
    response.setHeader('content-type', 'image/png');
    response.end(readFileSync(path.join(dirname, 'public/icons/favicon.png')));
  };

  type Server = { middlewares: { use: (fn: typeof middleware) => void } };

  return {
    name: 'favicon-stub',
    configureServer(server: Server) {
      server.middlewares.use(middleware);
    },
  };
};

export default defineConfig({
  plugins: [react(), faviconStub()],

  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
      'styled-system': path.resolve(dirname, './styled-system'),
    },
  },

  optimizeDeps: { include: ['@testing-library/dom'] },

  test: {
    projects: [
      {
        extends: true,
        plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
        test: {
          name: 'storybook',
          testTimeout: 15_000,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['src/**/*.test.ts', 'scripts/**/*.test.ts', 'worker/**/*.test.ts'],
        },
      },
    ],
  },
});
