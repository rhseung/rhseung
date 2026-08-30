import { faker } from '@faker-js/faker';

import { dayjs } from '@/common/lib';

import { GithubContributionCalendar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

// 시드를 안 박으면 실행마다 잔디가 달라져 a11y 실패를 재현할 수 없다.
faker.seed(20260821);

// GitHub 창은 일요일에 시작한다. 임의 날짜로 시작하면 첫 열이 잘린다.
const START = '2025-08-17';

const days = Array.from({ length: 53 * 7 }, (_, index) => ({
  date: dayjs(START).add(index, 'day').format('YYYY-MM-DD'),
  count: faker.number.int({ min: 0, max: 40 }),
  level: faker.number.int({ min: 0, max: 4 }),
}));

const meta = {
  title: 'Home/GithubContributionCalendar',
  component: GithubContributionCalendar,
  parameters: { layout: 'padded' },
  args: { total: 2980, days },
} satisfies Meta<typeof GithubContributionCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: { total: 0, days: [] },
};
