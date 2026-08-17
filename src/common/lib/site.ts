import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from './languages';

/**
 * 문서 메타데이터 문자열은 `locales/`가 아니라 여기 둔다.
 *
 * i18next-cli는 `.ts`/`.tsx`의 `t()` 호출만 추출하고 `.astro`는 파싱하지 못한다.
 * `<title>`·description·OG는 `.astro`(레이아웃)에서만 쓰이므로 `t()`로 뺄 수 없다.
 * `removeUnusedKeys: true`라서 억지로 키를 만들면 다음 `bun run gen`에 조용히 사라진다.
 */
export const SITE = {
  url: 'https://rhseung.me',
  handle: 'rhseung',
  github: 'https://github.com/rhseung',
  email: 'ryu@rhseung.me',
  ogImage: '/og.png',

  name: {
    ko: '류현승',
    en: 'Ryu Hyeonseung',
  },
  // 탭·검색 결과에 뜨는 이름. 핸들이 곧 도메인이라 그걸 쓴다.
  title: {
    ko: 'rhseung',
    en: 'rhseung',
  },
  // 검색 결과 스니펫과 OG 카드에 그대로 나가는 문장. 포지셔닝 + 사이트에 뭐가 있는지.
  description: {
    ko: '웹 앱을 만들고, 그게 도는 언어와 런타임도 만듭니다. 류현승의 프로젝트와 글.',
    en: 'I build web apps — and the languages and runtimes they run on. Projects and writing by Ryu Hyeonseung.',
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

/**
 * 언어별 경로. 기본 언어(ko)는 접두사가 없다 —
 * `astro.config.ts`의 `routing.prefixDefaultLocale: false`와 짝이다.
 */
export function localeHref(lang: Language, path: string): string {
  const absolute = path.startsWith('/') ? path : `/${path}`;
  const prefixed =
    lang === DEFAULT_LANGUAGE ? absolute : `/${lang}${absolute === '/' ? '' : absolute}`;

  // 끝에 슬래시를 붙인다. Astro의 디렉토리 빌드가 `/en/projects/`로 서빙하고
  // `Astro.url.pathname`에서 나오는 canonical도 그 형태다 — 여기서 안 맞추면
  // 문서가 hreflang으로 자기 자신을 다른 URL로 가리킨다.
  return prefixed.endsWith('/') ? prefixed : `${prefixed}/`;
}

/**
 * `[...lang]` 라우트가 두 언어를 한 파일에서 내게 하는 경로 목록.
 * `getStaticPaths`가 이걸 그대로 반환하면 `/projects`와 `/en/projects`가 같이 생긴다.
 */
export const LANGUAGE_PATHS = LANGUAGES.map((lang) => ({
  params: { lang: lang === DEFAULT_LANGUAGE ? undefined : lang },
  props: { lang },
}));
