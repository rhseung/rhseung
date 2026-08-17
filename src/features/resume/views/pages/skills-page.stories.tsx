import { skills } from './fixtures';

import { SkillsPage } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Resume/Pages/SkillsPage',
  component: SkillsPage,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', groups: skills },
} satisfies Meta<typeof SkillsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyState: Story = {
  args: { groups: [] },
};
