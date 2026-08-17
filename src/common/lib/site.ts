import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from './languages';

/**
 * 문서 메타데이터는 `locales/`가 아니라 여기 둔다 — i18next-cli는 `.astro`를 파싱하지
 * 못하고, `removeUnusedKeys: true`라서 키를 만들어도 다음 `bun run gen`에 사라진다.
 */
export const SITE = {
  url: 'https://rhseung.me',
  handle: 'rhseung',
  github: 'https://github.com/rhseung',
  email: 'ryu@rhseung.me',
  ogImage: '/og.png',

  name: {
    ko: '류현승',
    en: 'Ryu Hyunseung',
  },
  title: {
    ko: 'rhseung',
    en: 'rhseung',
  },
  description: {
    ko: '웹 앱을 만들고, 그게 도는 언어와 런타임도 만듭니다. 류현승의 프로젝트와 글.',
    en: 'I build web apps — and the languages and runtimes they run on. Projects and writing by Ryu Hyunseung.',
  },
} as const satisfies {
  url: string;
  handle: string;
  github: string;
  email: string;
  ogImage: string;
  name: Record<Language, string>;
  title: Record<Language, string>;
  description: Record<Language, string>;
};

export function localeHref(lang: Language, path: string): string {
  const absolute = path.startsWith('/') ? path : `/${path}`;
  const prefixed =
    lang === DEFAULT_LANGUAGE ? absolute : `/${lang}${absolute === '/' ? '' : absolute}`;

  // canonical(`Astro.url.pathname`)이 항상 슬래시로 끝난다. 안 맞추면 문서가 hreflang으로
  // 자기 자신을 다른 URL로 가리킨다.
  return prefixed.endsWith('/') ? prefixed : `${prefixed}/`;
}

/**
 * 상수가 아니라 함수다 — Astro가 라우트별로 이 객체에 내부 상태를 붙여서, 같은 인스턴스를
 * 여러 라우트가 공유하면 두 번째 라우트부터 `NoMatchingStaticPathFound`로 빌드가 깨진다.
 */
export function languagePaths() {
  return LANGUAGES.map((lang) => ({
    params: { lang: lang === DEFAULT_LANGUAGE ? undefined : lang },
    props: { lang },
  }));
}
