import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'graphics',
  order: 4,
  items: ['Flutter', 'SFML', 'Swing'],
  ko: {
    group: '앱·그래픽스',
  },
  en: {
    group: 'Apps & graphics',
  },
});
