import { CONTRIBUTIONS } from '@/mocks/contributions';

import { GithubContributionCalendar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const BUILT_AT = '2026-09-22T00:00:00.000Z';

const meta = {
  title: 'Home/GithubContributionCalendar',
  component: GithubContributionCalendar,
  parameters: { layout: 'padded' },
  args: { total: CONTRIBUTIONS.total, days: CONTRIBUTIONS.days, builtAt: BUILT_AT },
} satisfies Meta<typeof GithubContributionCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { total: 0, days: [] },
};
