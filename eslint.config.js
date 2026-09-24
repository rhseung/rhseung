// AGENTS.md 의 아키텍처 규칙 대부분은 문서로만 두지 않고 여기서 강제한다.
// 규칙이 걸리면 메시지가 고치는 법까지 알려준다.
import tanstackQuery from '@tanstack/eslint-plugin-query';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import prettierConfig from 'eslint-config-prettier';
import astro from 'eslint-plugin-astro';
import boundaries from 'eslint-plugin-boundaries';
import checkFile from 'eslint-plugin-check-file';
import importPlugin from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import unusedImports from 'eslint-plugin-unused-imports';

/** 다른 feature 의 속을 열지 못한다. 어디에나 적용된다. */
const FEATURE_DEEP_IMPORT = {
  group: ['@/features/*/*/*', '!@/features/*/*/index'],
  message: '다른 feature 는 배럴(@/features/<name>)로만 접근하세요.',
};

/** feature 안에서 계층 속을 열지 못한다. `common/` 에는 같은 이름의 폴더가 있어 적용하지 않는다. */
const LAYER_DEEP_IMPORT = {
  group: [
    './model/**',
    '../model/**',
    '../../model/**',
    './lib/**',
    '../lib/**',
    '../../lib/**',
    // 배럴 밖에 두기로 한 모듈은 직접 가리키는 수밖에 없다 (무겁거나 node 전용).
    '!./lib/render-paper',
    './components/**',
    '../components/**',
    '../../components/**',
    './view/**',
    '../view/**',
    './hooks/**',
    '../hooks/**',
    '../../hooks/**',
  ],
  message: '계층 내부 세부 파일에 직접 접근하지 말고 각 디렉터리의 index.ts를 사용하세요.',
};

/** common은 depth-1 area 배럴만. `@/common/components` ✅ / `@/common/components/ui/button` ❌ */
const COMMON_DEPTH = {
  group: ['@/common/*/*', '@/common/*/*/**'],
  message:
    'common은 @/common/<area> 배럴만 사용하세요 (예: @/common/components). 더 깊은 경로는 금지입니다.',
};

/** 이름을 틀리면 에러가 아니라 `undefined` 다. 읽는 자리를 `common/lib/env.ts` 하나로 묶는다. */
const NO_RAW_ENV = {
  selector: 'MemberExpression[object.type="MetaProperty"][property.name="env"]',
  message:
    'import.meta.env 를 직접 읽지 마세요. `@/common/lib` 의 IS_PRODUCTION 같은 상수를 쓰고, 새 값이 필요하면 `common/lib/env.ts` 에 한 줄 더합니다.',
};

export default defineConfig(
  {
    ignores: [
      'dist',
      'storybook-static',
      'node_modules',
      'playwright-report',
      'test-results',
      'coverage',
      // 생성 캐시
      '.astro/**',
      '.wrangler/**',
      'styled-system/**',
      'src/types/i18next.d.ts',
      'src/types/resources.d.ts',
      '**/*.gen.ts',
    ],
  },

  // ── 메인 블록 ────────────────────────────────────────────────────────────
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        // `projectService` 를 쓰면 e2e/, .storybook/, 루트 설정 파일까지
        // 별도 tsconfig 없이 타입 인지 린팅에 들어온다.
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'unused-imports': unusedImports,
      boundaries,
      'check-file': checkFile,
    },
    settings: {
      ...boundaries.configs.recommended.settings,
      'boundaries/legacy-warnings': false,
      'boundaries/elements': [
        { type: 'model', pattern: ['features/*/model/*', 'features/*/model'] },
        { type: 'lib', pattern: ['features/*/lib/*', 'features/*/lib'] },
        { type: 'ui', pattern: ['features/*/components/*', 'features/*/components'] },
        { type: 'common', pattern: 'common/*' },
      ],
      'import/resolver': {
        typescript: { project: './tsconfig.json', alwaysTryTypes: true },
      },
    },
    rules: {
      // React Compiler 급 진단이 여기 들어있다 — purity, set-state-in-effect,
      // immutability, preserve-manual-memoization 등. 별도 도구가 필요 없는 이유.
      ...reactHooks.configs.recommended.rules,

      // 미사용 처리는 unused-imports 가 전담한다.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: '@tanstack/**', group: 'external', position: 'before' },
            { pattern: '@/**', group: 'internal' },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': ['error', { considerQueryString: true }],

      // 문서가 아니라 여기가 진짜 규칙이다.
      'boundaries/dependencies': [
        'error',
        {
          default: 'allow',
          policies: [
            {
              from: { element: { type: 'ui' } },
              disallow: { to: { element: { type: 'model' } } },
              message:
                'components 는 model 에 직접 접근할 수 없습니다. lib 이 재export 한 것을 쓰세요.',
            },
            {
              from: { element: { type: 'lib' } },
              disallow: { to: { element: { type: 'ui' } } },
              message: 'lib 은 components 를 참조할 수 없습니다.',
            },
            {
              from: { element: { type: 'model' } },
              disallow: { to: { element: { type: ['lib', 'ui'] } } },
              message: 'model 은 최하위입니다.',
            },
          ],
        },
      ],

      'check-file/filename-naming-convention': [
        'error',
        { 'src/**/*.{ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': ['error', { 'src/**/': 'KEBAB_CASE' }],

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@/common',
              message:
                'common 루트 배럴은 없습니다. @/common/<area>를 사용하세요 (예: @/common/components).',
            },
          ],
          patterns: [FEATURE_DEEP_IMPORT, COMMON_DEPTH],
        },
      ],

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // 컴포넌트 props를 `export namespace Button { export type Props }` 로 쓰는 관례상 필수.
      '@typescript-eslint/no-namespace': 'off',
    },
  },

  // ── common 내부: 상대경로 / shadcn 생성 deep import 허용 ──────────────────
  {
    files: ['src/common/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [FEATURE_DEEP_IMPORT] }],
    },
  },

  // ── feature 안에서만 계층 deep import 를 막는다 ─────────────────────────
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [FEATURE_DEEP_IMPORT, COMMON_DEPTH, LAYER_DEEP_IMPORT] },
      ],
    },
  },

  // ── import.meta.env 는 한 곳에서만 읽는다 ───────────────────────────────
  // `.astro` 와 `.tsx` 는 뒤의 블록이 같은 rule 을 덮어써서 거기에도 같이 넣는다.
  {
    files: ['src/**/*.ts'],
    ignores: ['src/common/lib/env.ts'],
    rules: { 'no-restricted-syntax': ['error', NO_RAW_ENV] },
  },

  // ── .astro 프론트매터도 같은 import 규칙을 탄다 ─────────────────────────
  // 메인 블록이 `**/*.{ts,tsx}` 라서 `.astro` 는 통째로 빠져 있었다.
  {
    files: ['src/**/*.astro'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@/common',
              message:
                'common 루트 배럴은 없습니다. @/common/<area>를 사용하세요 (예: @/common/components).',
            },
          ],
          patterns: [FEATURE_DEEP_IMPORT, COMMON_DEPTH],
        },
      ],
    },
  },

  // ── worker 는 src 의 계층 바깥이다 ──────────────────────────────────
  // 별도 tsconfig 로 도는 프로그램이고, 배럴에 못 올리는 스키마를 직접 가리킨다.
  {
    files: ['worker/**/*.ts'],
    rules: { 'no-restricted-imports': 'off' },
  },

  // ── src/pages 는 전부 라우트다 ───────────────────────────────────────────
  {
    files: ['src/pages/**'],
    plugins: { 'check-file': checkFile },
    rules: {
      'check-file/filename-blocklist': [
        'error',
        { 'src/pages/**/*.test.*': '*.ts', 'src/pages/**/*.stories.*': '*.astro' },
        {
          errorMessage:
            'src/pages 의 파일은 전부 라우트입니다. "{{ target }}" 은 Astro 가 라우트로 잡아 빌드 타임에 실행합니다. 로직을 라우트 밖으로 옮기고 거기서 테스트하세요.',
        },
      ],
    },
  },

  // ── named export 만 ──────────────────────────────────────────────────────
  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['**/*.stories.{ts,tsx}'],
    rules: { 'import/no-default-export': 'error' },
  },

  // ── shadcn ui: Button + buttonVariants 동시 export 관례 ───────────────────
  {
    files: ['src/common/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    },
  },

  // ── e2e / 루트 설정 파일 ─────────────────────────────────────────────────
  {
    files: ['e2e/**/*.ts', '*.config.{ts,js}', '.storybook/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.node },
    rules: {
      'no-restricted-imports': 'off',
      'import/no-default-export': 'off',
      'check-file/filename-naming-convention': 'off',
      // 앱 소스가 아니다 — Storybook 설정에는 Fast Refresh가 적용되지 않는다.
      'react-refresh/only-export-components': 'off',
    },
  },

  ...storybook.configs['flat/recommended'],

  prettierConfig,

  // eslint-config-prettier가 끈 두 규칙을 의도적으로 되살린다.
  // prettier가 이미 붙여주지만, 손으로 쓴 코드가 CI에서 조용히 통과하는 걸 막는다.
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },

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
    // shadcn CLI 생성물이라 접근성 규칙 둘을 통과하지 못한다.
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
        NO_RAW_ENV,
      ],
    },
  },
);
