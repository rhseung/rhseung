import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'backend',
  order: 4,
  items: ['Node.js', 'Nest.js', 'Flask', 'Prisma', 'PostgreSQL', 'MySQL'],
  ko: {
    group: '백엔드',
  },
  en: {
    group: 'Backend',
  },
});
