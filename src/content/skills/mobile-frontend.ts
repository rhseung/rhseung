import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'mobile-frontend',
  order: 3,
  items: ['Flutter', 'React Native', 'SwiftUI'],
  ko: {
    group: '모바일 프론트엔드',
  },
  en: {
    group: 'Mobile Frontend',
  },
});
