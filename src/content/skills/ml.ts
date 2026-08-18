import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'ml',
  items: ['PyTorch', 'OpenCV', 'NumPy', 'Pandas'],
  ko: {
    group: '머신러닝',
  },
  en: {
    group: 'Machine learning',
  },
});
