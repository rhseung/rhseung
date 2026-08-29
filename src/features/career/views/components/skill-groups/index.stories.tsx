import { TECH_BY_NAME } from '../../../viewmodels';

import { SkillGroups } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Resume/SkillGroups',
  component: SkillGroups,
  parameters: { layout: 'padded' },
  args: {
    groups: [
      {
        slug: 'g',
        order: 1,
        group: '언어',
        items: [TECH_BY_NAME.TypeScript, TECH_BY_NAME.Rust, TECH_BY_NAME.Python],
      },
      {
        slug: 'g',
        order: 2,
        group: '웹',
        items: [TECH_BY_NAME.Astro, TECH_BY_NAME.React, TECH_BY_NAME['Tailwind CSS']],
      },
    ],
  },
} satisfies Meta<typeof SkillGroups>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
