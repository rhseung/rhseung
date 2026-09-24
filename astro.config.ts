import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import astroTypesafeRoutes from 'astro-typesafe-routes';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import { shikiConfig } from './src/common/components/mdx/code-block/shiki';
import { DEFAULT_LANGUAGE, languageTag, LANGUAGES } from './src/common/lib/i18n/languages';
import { isNoindex } from './src/common/lib/routing/noindex';
import { SITE } from './src/common/lib/routing/site';
import { faviconResponse } from './worker/favicon';
import { rootResponse } from './worker/root';

const FAVICON = /^\/api\/favicon\/([^/?]+)/;
const ROOT = /^\/(\?|$)/;

type DevRequest = { url?: string; headers: Record<string, string | string[] | undefined> };

function workerResponse(request: DevRequest): Promise<Response> | null {
  const url = request.url ?? '';

  if (ROOT.test(url)) {
    const accept = request.headers['accept-language'];

    return Promise.resolve(rootResponse(typeof accept === 'string' ? accept : null));
  }

  const favicon = FAVICON.exec(url);

  return favicon === null ? null : faviconResponse(decodeURIComponent(favicon[1]));
}

const workerDevServer = () => {
  const middleware = async (
    request: DevRequest,
    response: {
      statusCode: number;
      setHeader: (name: string, value: string) => void;
      end: (chunk?: Buffer) => void;
    },
    next: () => void,
  ) => {
    const result = await workerResponse(request);

    if (result === null) return next();

    response.statusCode = result.status;
    result.headers.forEach((value, name) => response.setHeader(name, value));
    response.end(result.body === null ? undefined : Buffer.from(await result.arrayBuffer()));
  };

  type Server = { middlewares: { use: (fn: typeof middleware) => void } };

  return {
    name: 'worker-dev-server',
    configureServer(server: Server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server: Server) {
      server.middlewares.use(middleware);
    },
  };
};

export default defineConfig({
  site: SITE.url,

  i18n: {
    defaultLocale: DEFAULT_LANGUAGE,
    locales: [...LANGUAGES],
    routing: { prefixDefaultLocale: true },
  },

  redirects: { '/': `/${DEFAULT_LANGUAGE}/` },

  image: { layout: 'constrained' },

  markdown: {
    shikiConfig,
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },

  integrations: [
    react(),
    astroTypesafeRoutes(),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LANGUAGE,
        locales: Object.fromEntries(LANGUAGES.map((lang) => [lang, languageTag(lang)])),
      },
      filter: (page) => !isNoindex(page),
    }),
  ],

  vite: {
    plugins: [workerDevServer()],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
        'styled-system': new URL('./styled-system', import.meta.url).pathname,
      },
    },
  },
});
