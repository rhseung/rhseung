import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'backend',
  order: 2,
  items: ['Node.js', 'Nest.js', 'Flask', 'Prisma', 'MySQL', 'OpenAPI TypeScript'],
  ko: {
    group: '백엔드·데이터',
  },
  en: {
    group: 'Backend & data',
  },
});
