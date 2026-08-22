import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'web-frontend',
  order: 2,
  items: [
    'React',
    'Next.js',
    'Astro',
    'TanStack Start',
    'TanStack Query',
    'TanStack Router',
    'Tailwind CSS',
    'styled-components',
    'i18next',
    'Vite',
  ],
  ko: {
    group: '웹 프론트엔드',
  },
  en: {
    group: 'Web frontend',
  },
});
