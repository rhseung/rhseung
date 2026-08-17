/**
 * 언어에 무관한 사실만 여기 둔다. 번역되는 문자열은 `text.{ko,en}.ts`에 있고,
 * `Record<Slug, …>`라서 한쪽 언어를 빠뜨리면 컴파일이 깨진다.
 */

export const EXPERIENCE = [
  {
    slug: 'gist-aiter',
    start: '2025-09',
    logo: '/logos/gist-ai.png',
    links: { site: 'https://aiter.gist.ac.kr/' },
  },
] as const;

export const EDUCATION = [
  { slug: 'gist', start: '2025-03', logo: '/logos/gist.svg' },
  { slug: 'gwangju-science-academy', start: '2022-03', end: '2025-02', logo: '/logos/gsa.webp' },
] as const;

export const AWARDS = [
  { slug: 'ax-challenge-2026', date: '2026-08', order: 0 },
  { slug: 'mini-tex-corps', date: '2025', order: 0 },
  { slug: 'launch-ai-career-school', date: '2025', order: 8 },
  { slug: 'junction-asia-2025', date: '2025', order: 8 },
  { slug: 'ai-convergence-contest', date: '2025', order: 8 },
] as const;

/** 기술 이름은 고유명사라 번역되지 않는다 — 그룹 라벨만 언어별로 갈린다. */
export const SKILL_GROUPS = [
  {
    slug: 'languages',
    order: 0,
    items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'Kotlin', 'C', 'C++', 'Dart'],
  },
  { slug: 'web', order: 1, items: [] },
  {
    slug: 'backend',
    order: 2,
    items: ['Node.js', 'Nest.js', 'Flask', 'Prisma', 'MySQL', 'OpenAPI TypeScript'],
  },
  { slug: 'ml', order: 3, items: [] },
  { slug: 'graphics', order: 4, items: ['Flutter', 'SFML', 'Swing'] },
  { slug: 'tooling', order: 5, items: ['Bun', 'npm', 'Yarn', 'PyPI', 'Figma', 'LaTeX'] },
] as const;

export type ExperienceSlug = (typeof EXPERIENCE)[number]['slug'];
export type EducationSlug = (typeof EDUCATION)[number]['slug'];
export type AwardSlug = (typeof AWARDS)[number]['slug'];
export type SkillGroupSlug = (typeof SKILL_GROUPS)[number]['slug'];
