import { TECH_BY_NAME } from '@/content/skills';
import type { Award, CareerEntry, SkillGroup } from '@/features/career';

export const experience: CareerEntry[] = [
  {
    slug: 'now',
    org: '어딘가',
    role: '프론트엔드 엔지니어',
    start: { year: 2025, month: 3 },
    summary: '디자인 시스템을 Base UI로 옮겼습니다.',
  },
];

export const education: CareerEntry[] = [
  {
    slug: 'univ',
    org: '어느 대학교',
    role: '컴퓨터공학 학사과정',
    start: { year: 2024, month: 3 },
    achievements: ['1학기 성적우수 장학생', '자료구조 1위 — 100점 / 100점'],
  },
];

export const awards: Award[] = [
  {
    slug: 'big',
    title: '무슨 대회 대상',
    issuer: '주최기관',
    date: { year: 2025, month: 6 },
  },
];

export const skills: SkillGroup[] = [
  {
    slug: 'lang',
    order: 1,
    group: '언어',
    items: [TECH_BY_NAME.TypeScript, TECH_BY_NAME.Rust],
  },
  {
    slug: 'web',
    order: 2,
    group: '웹',
    items: [TECH_BY_NAME.Astro, TECH_BY_NAME.React],
  },
];
