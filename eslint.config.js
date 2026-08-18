// 프레임워크에 무관한 절반은 `eslint.base.js`에 있다(템플릿 모노레포에서 동기화됨).
// 여기에는 라우팅·프레임워크 플러그인만 온다.
import tanstackQuery from '@tanstack/eslint-plugin-query';
import astro from 'eslint-plugin-astro';

import base from './eslint.base.js';

export default [
  ...base,
  ...astro.configs.recommended,
  ...tanstackQuery.configs['flat/recommended'],
  {
    // `.astro`는 라우팅 셸일 뿐이다 — 실제 UI·번역 문자열은 전부 `.tsx` 아일랜드에 있다.
    // boundaries·no-default-export가 `.astro` 파일 구조와 안 맞아서 여기서만 끈다.
    files: ['src/pages/**/*.astro', 'src/layouts/**/*.astro'],
    rules: {
      'check-file/filename-naming-convention': 'off',
      'import/no-default-export': 'off',
    },
  },
  {
    // `_islands/`의 언더스코어는 손으로 지은 이름이 아니라 Astro 라우터 관례다 —
    // 접두사가 없으면 "Unsupported file type in pages directory" 경고가 뜬다.
    files: ['src/pages/_islands/**'],
    rules: { 'check-file/folder-naming-convention': 'off' },
  },
  {
    // shadcn CLI 생성물. `input-group` 의 addon 이 컨테이너 div 에 클릭 핸들러를 단다 —
    // 고치지 말고 재생성한다 (`eslint.base.js` 는 동기화 대상이라 예외를 여기 둔다).
    files: ['src/common/components/ui/**/*.{ts,tsx}'],
    rules: {
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
    },
  },
  {
    // 테스트는 프로덕션 그래프 밖이다 - zod 를 쓰는 검증 헬퍼를 배럴에 올리면 그 배럴을
    // import 하는 모든 아일랜드가 zod 52KB 를 같이 내려받는다.
    files: ['src/**/*.test.ts'],
    rules: { 'no-restricted-imports': 'off' },
  },
  {
    // 항목 하나가 파일 하나다. glob 로더가 default export 를 집어가므로 named export 로 못 쓴다.
    files: ['src/content/**/*.ts'],
    rules: {
      'import/no-default-export': 'off',
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['src/**/*.{astro,tsx}'],
    ignores: ['src/common/components/layout/external-link/**'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          // 날 `<img>`는 최적화를 통째로 건너뛴다 — WebP 변환도, srcset도, width/height도 없다.
          // 브라우저에선 멀쩡해 보여서 리뷰에서 안 걸리고 조용히 원본 4000px가 나간다.
          selector: 'JSXOpeningElement[name.name="img"]',
          message:
            '`<img>` 대신 `astro:assets`의 `<Image />`/`<Picture />`를 쓰세요. ' +
            'React 아일랜드라 `<Image />`를 못 쓴다면 `.astro`에서 `getImage()`로 만든 ' +
            'src·srcset·width·height를 props로 받고, 그 줄에만 예외를 답니다.',
        },
        {
          // 외부 링크는 항상 ↗ 아이콘이 붙어야 한다. 손으로 쓰면 그게 빠지고
          // `rel="noreferrer noopener"`도 같이 빠뜨리기 쉽다.
          selector: 'JSXAttribute[name.name="target"][value.value="_blank"]',
          message: '외부 링크는 `@/common/components`의 `<ExternalLink />`를 쓰세요.',
        },
      ],
    },
  },
];
