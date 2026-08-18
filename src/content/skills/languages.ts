import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'languages',
  items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'Kotlin', 'C', 'C++', 'Dart'],
  ko: {
    group: '언어',
  },
  en: {
    group: 'Languages',
  },
});
