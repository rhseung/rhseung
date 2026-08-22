import type { Award, CareerEntry, SkillGroup } from '@/features/career';
import type { Project } from '@/features/projects';

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
  { slug: 'lang', order: 1, group: '언어', items: ['TypeScript', 'Rust'] },
  { slug: 'web', order: 2, group: '웹', items: ['Astro', 'React'] },
];

export const projects: Project[] = [
  {
    slug: 'rhseung-me',
    title: 'rhseung.me',
    summary: 'Astro 아일랜드로 만든 이 사이트.',
    stack: ['Astro'],
    start: { year: 2026, month: 8 },
    status: 'active',
    hasDetail: true,
  },
];
