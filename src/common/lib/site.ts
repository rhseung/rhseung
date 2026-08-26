import { LANGUAGES, type Language } from './languages';

export const SITE = {
  url: 'https://www.rhseung.me',
  handle: 'rhseung',
  github: 'https://github.com/rhseung',
  email: 'ryu@rhseung.me',
  ogImage: '/og.png',
  title: 'Rhseung',
} as const satisfies {
  url: string;
  handle: string;
  github: string;
  email: string;
  ogImage: string;
  title: string;
};

export function localeHref(lang: Language, path: string): string {
  const absolute = path.startsWith('/') ? path : `/${path}`;
  const prefixed = `/${lang}${absolute === '/' ? '' : absolute}`;

  // canonical(`Astro.url.pathname`)이 항상 슬래시로 끝난다. 안 맞추면 문서가 hreflang으로
  // 자기 자신을 다른 URL로 가리킨다.
  return prefixed.endsWith('/') ? prefixed : `${prefixed}/`;
}

/**
 * 상수가 아니라 함수다 — Astro가 라우트별로 이 객체에 내부 상태를 붙여서, 같은 인스턴스를
 * 여러 라우트가 공유하면 두 번째 라우트부터 `NoMatchingStaticPathFound`로 빌드가 깨진다.
 */
export function languagePaths() {
  return LANGUAGES.map((lang) => ({ params: { lang }, props: { lang } }));
}
