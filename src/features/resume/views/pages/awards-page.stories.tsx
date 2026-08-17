import { awards } from './fixtures';

import { AwardsPage } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Resume/Pages/AwardsPage',
  component: AwardsPage,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', awards },
} satisfies Meta<typeof AwardsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyState: Story = {
  args: { awards: [] },
};
