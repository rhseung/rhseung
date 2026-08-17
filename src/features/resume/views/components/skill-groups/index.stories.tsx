import { SkillGroups } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Resume/SkillGroups',
  component: SkillGroups,
  parameters: { layout: 'padded' },
  args: {
    groups: [
      { group: '언어', items: ['TypeScript', 'Rust', 'Python'], order: 0, draft: false },
      { group: '웹', items: ['Astro', 'React', 'Tailwind CSS'], order: 1, draft: false },
    ],
  },
} satisfies Meta<typeof SkillGroups>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
