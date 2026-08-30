// 프레임워크에 무관한 절반은 `eslint.base.js` 에 있다(모노레포에서 동기화됨).
import tanstackQuery from '@tanstack/eslint-plugin-query';
import astro from 'eslint-plugin-astro';

import base from './eslint.base.js';

export default [
  ...base,
  ...astro.configs.recommended,
  ...tanstackQuery.configs['flat/recommended'],
  {
    // boundaries·no-default-export 가 `.astro` 파일 구조와 안 맞는다.
    files: ['src/pages/**/*.astro', 'src/layouts/**/*.astro'],
    rules: {
      'check-file/filename-naming-convention': 'off',
      'import/no-default-export': 'off',
    },
  },
  {
    // 접두사가 없으면 "Unsupported file type in pages directory" 경고가 뜬다.
    files: ['src/pages/_islands/**'],
    rules: { 'check-file/folder-naming-convention': 'off' },
  },
  {
    // shadcn CLI 생성물. `eslint.base.js` 는 동기화 대상이라 예외를 여기 둔다.
    files: ['src/common/components/ui/**/*.{ts,tsx}'],
    rules: {
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
    },
  },
  {
    // zod 검증 헬퍼를 배럴에 올리면 그 배럴을 쓰는 아일랜드가 52KB 를 같이 받는다.
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
          // 날 `<img>` 는 브라우저에선 멀쩡해 보여서 조용히 원본 4000px 가 나간다.
          selector: 'JSXOpeningElement[name.name="img"]',
          message:
            '`<img>` 대신 `astro:assets`의 `<Image />`/`<Picture />`를 쓰세요. ' +
            'React 아일랜드라 `<Image />`를 못 쓴다면 `.astro`에서 `getImage()`로 만든 ' +
            'src·srcset·width·height를 props로 받고, 그 줄에만 예외를 답니다.',
        },
        {
          // 손으로 쓰면 아이콘과 `rel="noreferrer noopener"` 를 같이 빠뜨린다.
          selector: 'JSXAttribute[name.name="target"][value.value="_blank"]',
          message: '외부 링크는 `@/common/components`의 `<ExternalLink />`를 쓰세요.',
        },
      ],
    },
  },
];
