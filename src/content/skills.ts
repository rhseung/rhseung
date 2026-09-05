import {
  si1password,
  siAstro,
  siC,
  siCplusplus,
  siCss,
  siDart,
  siFigma,
  siFlask,
  siFlutter,
  siGit,
  siGithubactions,
  siGnubash,
  siHtml5,
  siI18next,
  siJavascript,
  siJupyter,
  siKotlin,
  siLatex,
  siMysql,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siNotion,
  siNumpy,
  siOpencv,
  siOpenjdk,
  siPandas,
  siPostgresql,
  siPrisma,
  siPython,
  siPytorch,
  siReact,
  siReactquery,
  siRust,
  siStorybook,
  siStyledcomponents,
  siSwift,
  siTailwindcss,
  siTanstack,
  siTypescript,
  siVite,
} from 'simple-icons';

import type { Localized } from '@/common/lib/languages';

import type { SimpleIcon } from 'simple-icons';

export type TechSpec = {
  name: string;
  hex: string;
  /** [simple-icons](https://simpleicons.org). Slack·Playwright 는 거기서 빠져 아이콘이 없다. */
  icon?: SimpleIcon;
};

type SkillGroupSpec = Localized<{ group: string }> & {
  slug: string;
  order: number;
  items: readonly TechSpec[];
};

const tech = <const T extends TechSpec>(spec: T) => spec;

const TypeScript = tech({ name: 'TypeScript', hex: '#3178C6', icon: siTypescript });
const JavaScript = tech({ name: 'JavaScript', hex: '#F7DF1E', icon: siJavascript });
const Html5 = tech({ name: 'HTML5', hex: '#E34F26', icon: siHtml5 });
const Css3 = tech({ name: 'CSS3', hex: '#1572B6', icon: siCss });
const C = tech({ name: 'C', hex: '#A8B9CC', icon: siC });
const Cpp = tech({ name: 'C++', hex: '#00599C', icon: siCplusplus });
const Rust = tech({ name: 'Rust', hex: '#000000', icon: siRust });
const Java = tech({ name: 'Java', hex: '#ED8B00', icon: siOpenjdk });
const Kotlin = tech({ name: 'Kotlin', hex: '#7F52FF', icon: siKotlin });
const Swift = tech({ name: 'Swift', hex: '#F05138', icon: siSwift });
const Dart = tech({ name: 'Dart', hex: '#0175C2', icon: siDart });
const Python = tech({ name: 'Python', hex: '#3776AB', icon: siPython });
const Shell = tech({ name: 'Shell', hex: '#4EAA25', icon: siGnubash });
const LaTeX = tech({ name: 'LaTeX', hex: '#008080', icon: siLatex });

const React = tech({ name: 'React', hex: '#61DAFB', icon: siReact });
const NextJs = tech({ name: 'Next.js', hex: '#000000', icon: siNextdotjs });
const Astro = tech({ name: 'Astro', hex: '#BC52EE', icon: siAstro });
const TanStackStart = tech({ name: 'TanStack Start', hex: '#39AF46', icon: siTanstack });
const TanStackRouter = tech({ name: 'TanStack Router', hex: '#ECE8D1', icon: siTanstack });
const TanStackQuery = tech({ name: 'TanStack Query', hex: '#FF4154', icon: siReactquery });
const TailwindCss = tech({ name: 'Tailwind CSS', hex: '#06B6D4', icon: siTailwindcss });
const StyledComponents = tech({
  name: 'styled-components',
  hex: '#DB7093',
  icon: siStyledcomponents,
});
const Vite = tech({ name: 'Vite', hex: '#646CFF', icon: siVite });
const I18next = tech({ name: 'i18next', hex: '#26A69A', icon: siI18next });

const Flutter = tech({ name: 'Flutter', hex: '#02569B', icon: siFlutter });
const ReactNative = tech({ name: 'React Native', hex: '#61DAFB', icon: siReact });
const SwiftUi = tech({ name: 'SwiftUI', hex: '#F05138', icon: siSwift });

const NodeJs = tech({ name: 'Node.js', hex: '#5FA04E', icon: siNodedotjs });
const NestJs = tech({ name: 'Nest.js', hex: '#E0234E', icon: siNestjs });
const Flask = tech({ name: 'Flask', hex: '#000000', icon: siFlask });
const Prisma = tech({ name: 'Prisma', hex: '#2D3748', icon: siPrisma });
const PostgreSql = tech({ name: 'PostgreSQL', hex: '#4169E1', icon: siPostgresql });
const MySql = tech({ name: 'MySQL', hex: '#4479A1', icon: siMysql });

const Git = tech({ name: 'Git', hex: '#F05032', icon: siGit });
const GitHubActions = tech({ name: 'GitHub Actions', hex: '#2088FF', icon: siGithubactions });
const Storybook = tech({ name: 'Storybook', hex: '#FF4785', icon: siStorybook });
const Playwright = tech({ name: 'Playwright', hex: '#2EAD33' });
const Figma = tech({ name: 'Figma', hex: '#F24E1E', icon: siFigma });
const Slack = tech({ name: 'Slack', hex: '#4A154B' });
const Notion = tech({ name: 'Notion', hex: '#000000', icon: siNotion });
const OnePassword = tech({ name: '1Password', hex: '#0094F5', icon: si1password });

const PyTorch = tech({ name: 'PyTorch', hex: '#EE4C2C', icon: siPytorch });
const OpenCv = tech({ name: 'OpenCV', hex: '#5C3EE8', icon: siOpencv });
const NumPy = tech({ name: 'NumPy', hex: '#013243', icon: siNumpy });
const Pandas = tech({ name: 'Pandas', hex: '#150458', icon: siPandas });
const Jupyter = tech({ name: 'Jupyter', hex: '#F37626', icon: siJupyter });

export const SKILL_GROUPS = [
  {
    slug: 'languages',
    order: 1,
    ko: { group: '언어' },
    en: { group: 'Languages' },
    items: [
      TypeScript,
      JavaScript,
      Html5,
      Css3,
      C,
      Cpp,
      Rust,
      Java,
      Kotlin,
      Swift,
      Dart,
      Python,
      Shell,
      LaTeX,
    ],
  },
  {
    slug: 'web-frontend',
    order: 2,
    ko: { group: '웹 프론트엔드' },
    en: { group: 'Web Frontend' },
    items: [
      React,
      NextJs,
      Astro,
      TanStackStart,
      TanStackRouter,
      TanStackQuery,
      TailwindCss,
      StyledComponents,
      Vite,
      I18next,
    ],
  },
  {
    slug: 'mobile-frontend',
    order: 3,
    ko: { group: '모바일 프론트엔드' },
    en: { group: 'Mobile Frontend' },
    items: [Flutter, ReactNative, SwiftUi],
  },
  {
    slug: 'backend',
    order: 4,
    ko: { group: '백엔드' },
    en: { group: 'Backend' },
    items: [NodeJs, NestJs, Flask, Prisma, PostgreSql, MySql],
  },
  {
    slug: 'tooling',
    order: 5,
    ko: { group: '도구' },
    en: { group: 'Tools' },
    items: [Git, GitHubActions, Storybook, Playwright, Figma, Slack, Notion, OnePassword],
  },
  {
    slug: 'mldl',
    order: 6,
    ko: { group: 'MLDL' },
    en: { group: 'MLDL' },
    items: [PyTorch, OpenCv, NumPy, Pandas, Jupyter],
  },
] as const satisfies readonly SkillGroupSpec[];

export type Tech = (typeof SKILL_GROUPS)[number]['items'][number]['name'];
