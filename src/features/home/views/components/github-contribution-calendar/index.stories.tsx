import { faker } from '@faker-js/faker';

import { dayjs } from '@/common/lib';

import { GithubContributionCalendar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

// 스토리가 vitest 브라우저 프로젝트에서 그대로 테스트로 돈다. 시드를 안 박으면 실행마다
// 잔디가 달라져서 a11y 실패를 재현할 수 없다.
faker.seed(20260821);

// GitHub이 주는 창은 일요일에 시작해 53주를 채운다. 임의 날짜로 시작하면 첫 열이 잘려서
// 실제와 다른 격자를 보게 된다.
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

/** 빌드 때도 브라우저에서도 못 받은 경우. 아무것도 그리지 않는다. */
export const Empty: Story = {
  args: { total: 0, days: [] },
};
