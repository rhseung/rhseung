import { defineProject } from '@/features/projects/models/define';

export default defineProject({
  slug: 'rhseung-me',
  stack: ['Astro', 'React', 'Tailwind CSS', 'TypeScript'],
  start: { year: 2026, month: 8 },
  status: 'active',
  links: {
    repo: 'https://github.com/rhseung/rhseung',
  },
  ko: {
    title: 'rhseung.me',
    summary: 'Astro 아일랜드 위에 올린 개인 사이트. 이 페이지가 그 결과물이다.',
  },
  en: {
    title: 'rhseung.me',
    summary: 'A personal site built on Astro islands. This page is the result.',
  },
});
