import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import astroTypesafeRoutes from 'astro-typesafe-routes';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import { DEFAULT_LANGUAGE, LANGUAGE_TAGS, LANGUAGES } from './src/common/lib/languages';
import { isNoindex, SITE } from './src/common/lib/site';

export default defineConfig({
  // 없으면 `Astro.site` 가 undefined 라 레이아웃의 `new URL(path, Astro.site)` 가 터진다.
  site: SITE.url,

  i18n: {
    defaultLocale: DEFAULT_LANGUAGE,
    locales: [...LANGUAGES],
    routing: { prefixDefaultLocale: true },
  },

  redirects: { '/': '/ko/' },

  image: { layout: 'constrained' },

  /* `defaultColor: false` 라야 두 테마 색이 인라인이 아니라 CSS 변수로 나온다. */
  markdown: {
    shikiConfig: { themes: { light: 'snazzy-light', dark: 'tokyo-night' }, defaultColor: false },

    /* 기본 프로세서에는 수식이 없다. 파이프라인으로 되돌려 KaTeX 를 끼운다. */
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

      // noindex 라우트를 sitemap 으로 제출하면 서치 콘솔이 오류를 낸다. 목록은 `site.ts`.
      filter: (page) => !isNoindex(page),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
        'styled-system': new URL('./styled-system', import.meta.url).pathname,
      },
    },
  },
});
