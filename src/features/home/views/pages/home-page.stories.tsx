import { faker } from '@faker-js/faker';

import { dayjs } from '@/common/lib';

import { HomePage } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

faker.seed(20260821);

const contributions = {
  total: 2980,
  days: Array.from({ length: 53 * 7 }, (_, index) => ({
    date: dayjs('2025-08-17').add(index, 'day').format('YYYY-MM-DD'),
    count: faker.number.int({ min: 0, max: 40 }),
    level: faker.number.int({ min: 0, max: 4 }),
  })),
};

const meta = {
  title: 'Home/Pages/HomePage',
  component: HomePage,
  parameters: { layout: 'fullscreen' },
  // `fetchedAt: 0` - 스냅숏을 낡은 것으로 쳐서 MSW 픽스처로 갱신되는 경로까지 태운다.
  args: { lang: 'ko', updatedAt: '2026-08-19T00:00:00.000Z', contributions, fetchedAt: 0 },
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const English: Story = {
  args: { lang: 'en' },
};
