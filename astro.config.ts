import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

export default defineConfig({
  // 없으면 `Astro.site` 가 undefined 라 레이아웃의 `new URL(path, Astro.site)` 가 터진다.
  site: 'https://www.rhseung.me',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
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
    mdx(),
    sitemap({
      i18n: { defaultLocale: 'ko', locales: { ko: 'ko-KR', en: 'en-US' } },

      // 이력서는 `noindex` 다. 색인하지 말라고 해놓고 sitemap 으로 제출하면 서치 콘솔이
      // "제출된 URL 이 noindex 로 표시됨" 오류를 낸다.
      filter: (page) => !/\/resume\/$/.test(page),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { '@': new URL('./src', import.meta.url).pathname },
    },
  },
});
