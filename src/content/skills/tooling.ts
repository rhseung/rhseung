import { defineSkillGroup } from '@/features/career/models/define';

export default defineSkillGroup({
  slug: 'tooling',
  order: 5,
  items: [
    'Git',
    'GitHub Actions',
    'Storybook',
    'Playwright',
    'Figma',
    'Slack',
    'Notion',
    '1Password',
  ],
  ko: {
    group: '도구',
  },
  en: {
    group: 'Tooling',
  },
});
