import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
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
  ko: {
    group: '웹',
  },
  en: {
    group: 'Web',
  },
});
