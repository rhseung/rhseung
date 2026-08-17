import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
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
   * `prefixDefaultLocale: true` — 모든 라우트가 `/ko/…` 또는 `/en/…` 이다. 기본 언어만
   * 접두사를 생략하면 규칙이 둘이 되고, 특히 글처럼 한 언어에만 존재하는 문서에서
   * 라우트 모양이 어긋난다. `/`는 아래 `redirects`가 기본 언어로 보낸다.
   */
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
    routing: { prefixDefaultLocale: true },
  },

  redirects: { '/': '/ko/' },

  // 본문 이미지 기본값. 원본 크기를 넘지 않는 선에서 컨테이너에 맞추고 srcset을 자동 생성한다.
  image: { layout: 'constrained' },

  /**
   * 코드 하이라이팅은 Astro 내장 Shiki 다 — 빌드 때 색을 CSS 변수로 굽고 클라이언트로
   * 아무것도 안 보낸다.
   *
   * `defaultColor: false` 라야 두 테마 색이 인라인이 아니라 `--shiki-light`/`--shiki-dark`
   * 변수로 나온다. 실제 전환은 `styles.css` 의 `.dark` 규칙이 한다 — 테마 토글이 클래스를
   * 바꾸는 그 순간 코드 블록도 같이 따라간다.
   */
  markdown: {
    shikiConfig: { themes: { light: 'snazzy-light', dark: 'tokyo-night' }, defaultColor: false },
  },

  integrations: [
    react(),
    mdx(),
    // `[...lang]` 라우팅과 맞물려 alternate 링크가 자동으로 들어간다.
    sitemap({ i18n: { defaultLocale: 'ko', locales: { ko: 'ko-KR', en: 'en-US' } } }),
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { '@': new URL('./src', import.meta.url).pathname },
    },
  },
});
