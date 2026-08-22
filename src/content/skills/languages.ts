import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'languages',
  order: 1,
  items: [
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'C',
    'C++',
    'Rust',
    'Java',
    'Kotlin',
    'Swift',
    'Dart',
    'Python',
    'Shell',
    'LaTeX',
  ],
  ko: {
    group: '언어',
  },
  en: {
    group: 'Languages',
  },
});
