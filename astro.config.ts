import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import astroTypesafeRoutes from 'astro-typesafe-routes';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import { shikiConfig } from './src/common/components/mdx/code-block/shiki';
import { DEFAULT_LANGUAGE, LANGUAGE_TAGS, LANGUAGES } from './src/common/lib/i18n/languages';
import { isNoindex } from './src/common/lib/routing/noindex';
import { SITE } from './src/common/lib/routing/site';
import { faviconResponse } from './worker/favicon';

const FAVICON = /^\/api\/favicon\/([^/?]+)/;

const faviconDevServer = () => {
  const middleware = async (
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

    const result = await faviconResponse(decodeURIComponent(match[1]));

    response.statusCode = result.status;
    result.headers.forEach((value, name) => response.setHeader(name, value));
    response.end(result.body === null ? undefined : Buffer.from(await result.arrayBuffer()));
  };

  type Server = { middlewares: { use: (fn: typeof middleware) => void } };

  return {
    name: 'favicon-dev-server',
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

  redirects: { '/': '/ko/' },

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
      i18n: { defaultLocale: DEFAULT_LANGUAGE, locales: LANGUAGE_TAGS },
      filter: (page) => !isNoindex(page),
    }),
  ],

  vite: {
    plugins: [faviconDevServer()],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
        'styled-system': new URL('./styled-system', import.meta.url).pathname,
      },
    },
  },
});
