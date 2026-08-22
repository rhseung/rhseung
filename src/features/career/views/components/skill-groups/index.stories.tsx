import { SkillGroups } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Resume/SkillGroups',
  component: SkillGroups,
  parameters: { layout: 'padded' },
  args: {
    groups: [
      { slug: 'g', order: 1, group: '언어', items: ['TypeScript', 'Rust', 'Python'] },
      { slug: 'g', order: 2, group: '웹', items: ['Astro', 'React', 'Tailwind CSS'] },
    ],
  },
} satisfies Meta<typeof SkillGroups>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
