import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import astroTypesafeRoutes from 'astro-typesafe-routes';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import { DEFAULT_LANGUAGE, LANGUAGE_TAGS, LANGUAGES } from './src/common/lib/languages';
import { isNoindex, SITE } from './src/common/lib/site';

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
    shikiConfig: { themes: { light: 'snazzy-light', dark: 'tokyo-night' }, defaultColor: false },
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
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
        'styled-system': new URL('./styled-system', import.meta.url).pathname,
      },
    },
  },
});
