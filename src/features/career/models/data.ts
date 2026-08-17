import type { AwardData, CareerData, SkillGroupData } from './types';

// 언어 무관한 사실만. 번역문은 `text.{ko,en}.ts`.

export const EXPERIENCE = [
  {
    slug: 'gist-aiter',
    start: '2025-09',
    logo: '/logos/gist-ai.png',
    links: { site: 'https://aiter.gist.ac.kr/' },
  },
] as const satisfies readonly CareerData[];

export const EDUCATION = [
  { slug: 'gist', start: '2025-03', logo: '/logos/gist.svg' },
  { slug: 'gwangju-science-academy', start: '2022-03', end: '2025-02', logo: '/logos/gsa.webp' },
] as const satisfies readonly CareerData[];

export const AWARDS = [
  { slug: 'ax-challenge-2026', date: '2026-08', order: 0 },
  { slug: 'mini-tex-corps', date: '2025', order: 0 },
  { slug: 'launch-ai-career-school', date: '2025', order: 8 },
  { slug: 'junction-asia-2025', date: '2025', order: 8 },
  { slug: 'ai-convergence-contest', date: '2025', order: 8 },
] as const satisfies readonly AwardData[];

export const SKILL_GROUPS = [
  {
    slug: 'languages',
    order: 0,
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'Kotlin', 'C', 'C++', 'Dart'],
  },
  {
    slug: 'web',
    order: 1,
    items: [
      'React',
      'Next.js',
      'Astro',
      'TanStack Router',
      'TanStack Query',
      'React Router',
      'Tailwind CSS',
      'Vanilla Extract',
      'Styled Components',
      'i18next',
      'Vite',
      'HTML',
      'CSS',
    ],
  },
  {
    slug: 'backend',
    order: 2,
    items: ['Node.js', 'Nest.js', 'Flask', 'Prisma', 'MySQL', 'OpenAPI TypeScript'],
  },
  {
    slug: 'ml',
    order: 3,
    items: [
      'PyTorch',
      'TensorFlow',
      'Keras',
      'scikit-learn',
      'OpenCV',
      'NumPy',
      'Pandas',
      'Matplotlib',
      'Seaborn',
      'Altair',
      'Jupyter',
    ],
  },
  { slug: 'graphics', order: 4, items: ['Flutter', 'SFML', 'Swing'] },
  { slug: 'tooling', order: 5, items: ['Bun', 'npm', 'Yarn', 'PyPI', 'Figma', 'LaTeX'] },
] as const satisfies readonly SkillGroupData[];

export type ExperienceSlug = (typeof EXPERIENCE)[number]['slug'];
export type EducationSlug = (typeof EDUCATION)[number]['slug'];
export type AwardSlug = (typeof AWARDS)[number]['slug'];
export type SkillGroupSlug = (typeof SKILL_GROUPS)[number]['slug'];
