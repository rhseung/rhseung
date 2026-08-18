import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'backend',
  items: ['Node.js', 'Nest.js', 'Flask', 'Prisma', 'MySQL'],
  ko: {
    group: '백엔드',
  },
  en: {
    group: 'Backend',
  },
});
