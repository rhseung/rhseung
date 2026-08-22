import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'ml',
  order: 6,
  items: ['PyTorch', 'OpenCV', 'NumPy', 'Pandas'],
  ko: {
    group: '머신러닝',
  },
  en: {
    group: 'Machine learning',
  },
});
