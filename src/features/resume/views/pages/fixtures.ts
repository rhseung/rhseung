import type { Project } from '@/features/projects';

import type { Award, CareerEntry, Profile, SkillGroup } from '../../viewmodels';

/** 스토리 전용 픽스처. 여러 페이지가 같은 데이터를 쓴다. */
export const profile: Profile = {
  headline: '웹 앱을 만들고, 그게 도는 언어와 런타임도 만듭니다.',
  intro: '프론트엔드와 시스템 프로그래밍 양쪽을 오갑니다.',
  location: '대한민국',
};

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

export const projects: Project[] = [
  {
    slug: 'rhseung-me',
    title: 'rhseung.me',
    summary: 'Astro 아일랜드로 만든 이 사이트.',
    domain: 'web',
    stack: ['astro'],
    start: '2026-08',
    status: 'active',
    pinned: true,
    hasDetail: true,
  },
];
