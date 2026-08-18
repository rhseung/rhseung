import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'tooling',
  items: ['Bun', 'npm', 'Yarn', 'PyPI', 'Figma', 'LaTeX'],
  ko: {
    group: '도구',
  },
  en: {
    group: 'Tooling',
  },
});
