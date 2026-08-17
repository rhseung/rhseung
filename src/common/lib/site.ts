import type { Language } from './languages';

/**
 * 문서 메타데이터 문자열은 `locales/`가 아니라 여기 둔다.
 *
 * i18next-cli는 `.ts`/`.tsx`의 `t()` 호출만 추출하고 `.astro`는 파싱하지 못한다.
 * `<title>`·description·OG는 `.astro`(레이아웃)에서만 쓰이므로 `t()`로 뺄 수 없다.
 * `removeUnusedKeys: true`라서 억지로 키를 만들면 다음 `bun run gen`에 조용히 사라진다.
 */
export const SITE = {
  url: 'https://rhseung.me',
  author: 'rhseung',
  github: 'https://github.com/rhseung',
  /** `public/og.png`을 넣으면 켜진다. 없는 동안은 og:image를 아예 내지 않는다. */
  ogImage: undefined,

  title: {
    ko: 'rhseung',
    en: 'rhseung',
  },
  description: {
    ko: '웹 앱을 만들고, 그게 도는 언어와 런타임도 만듭니다.',
    en: 'I build web apps — and the languages and runtimes they run on.',
  },
} as const satisfies {
  url: string;
  author: string;
  github: string;
  ogImage: string | undefined;
  title: Record<Language, string>;
  description: Record<Language, string>;
};

/**
 * 언어별 경로. 기본 언어(ko)는 접두사가 없다 —
 * `astro.config.ts`의 `routing.prefixDefaultLocale: false`와 짝이다.
 */
export function localeHref(lang: Language, path: string): string {
  const absolute = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'ko') return absolute;
  return absolute === '/' ? '/en' : `/en${absolute}`;
}
