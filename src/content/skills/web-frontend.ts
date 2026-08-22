import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'web-frontend',
  order: 2,
  items: [
    'React',
    'Next.js',
    'Astro',
    'TanStack Start',
    'TanStack Router',
    'TanStack Query',
    'Tailwind CSS',
    'styled-components',
    'Vite',
    'i18next',
  ],
  ko: {
    group: '웹 프론트엔드',
  },
  en: {
    group: 'Web Frontend',
  },
});
