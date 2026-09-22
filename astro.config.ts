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

// 파비콘은 배포본에서 Worker 가 `/api/favicon/<host>` 로 프록시한다. dev·preview 에는 Worker 가
// 없어서, 같은 함수를 미들웨어로 물려 로컬에서도 같은 화면이 나오게 한다.
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

  // 훅이 값을 돌려주면 Vite 가 그걸 post 훅으로 본다. connect 앱은 그 자체가 함수라서
  // `use()` 의 반환을 그대로 돌려주면 Vite 가 인자 없이 호출해 터진다.
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
