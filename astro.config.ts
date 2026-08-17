import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

/**
 * `output: 'static'`(기본값)이 CSR의 `vite build`와 같은 자리다 — 결과물은 정적 파일뿐이고
 * Cloudflare Pages·Vercel 둘 다 어댑터 없이 `dist/`를 그대로 서빙한다. 타깃별 차이는 여기가
 * 아니라 `wrangler.jsonc`/`vercel.json` 중 뭘 남기느냐에 있다(`bun run init` 참고).
 *
 * 나중에 서버 렌더링(API 라우트, 이미지 최적화 등)이 필요해지면 그때 `@astrojs/cloudflare`나
 * `@astrojs/vercel`을 어댑터로 추가하고 `output: 'server'`로 바꾼다.
 */
export default defineConfig({
  // canonical·OG·sitemap·RSS가 전부 절대 URL을 요구한다. 이게 없으면 `Astro.site`가
  // undefined라 레이아웃의 `new URL(path, Astro.site)`가 터진다.
  site: 'https://rhseung.me',

  /**
   * 언어를 URL이 정한다. 클라이언트 런타임 토글은 정적 사이트에서 사실상 단일언어였다 —
   * 크롤러가 보는 HTML이 한 벌뿐이라 hreflang·언어별 canonical을 만들 방법이 없었다.
   *
   * `prefixDefaultLocale: false` — 홈 URL(`/`)에 리다이렉트 홉을 붙이지 않는다.
   */
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { '@': new URL('./src', import.meta.url).pathname },
    },
  },
});
