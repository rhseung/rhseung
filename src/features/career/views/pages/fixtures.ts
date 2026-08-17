import type { Award, CareerEntry, SkillGroup } from '../../viewmodels';

export const experience: CareerEntry[] = [
  {
    slug: 'now',
    org: '어딘가',
    role: '프론트엔드 엔지니어',
    start: '2025-03',
    summary: '디자인 시스템을 Base UI로 옮겼습니다.',
  },
];

export const education: CareerEntry[] = [
  {
    slug: 'univ',
    org: '어느 대학교',
    role: '컴퓨터공학 학사과정',
    start: '2024-03',
    achievements: ['1학기 성적우수 장학생', '자료구조 1위 — 100점 / 100점'],
  },
];

export const awards: Award[] = [
  { slug: 'big', title: '무슨 대회 대상', issuer: '주최기관', date: '2025-06', order: 0 },
];

export const skills: SkillGroup[] = [
  { slug: 'lang', group: '언어', items: ['TypeScript', 'Rust'], order: 0 },
  { slug: 'web', group: '웹', items: ['Astro', 'React'], order: 1 },
];
