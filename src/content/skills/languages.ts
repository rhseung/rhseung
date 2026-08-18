import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'languages',
  items: ['TypeScript', 'Python', 'Rust', 'C++', 'Java', 'Kotlin'],
  ko: {
    group: '언어',
  },
  en: {
    group: 'Languages',
  },
});
