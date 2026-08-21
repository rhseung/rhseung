import { faker } from '@faker-js/faker';
import { expect } from 'storybook/test';

import { dayjs, SITE } from '@/common/lib';

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

  // Base UI Avatar는 이미지가 다 실릴 때까지 fallback을 띄운다. 안 기다리면 a11y 검사가
  // fallback을 잡는 순간에 걸려서 무작위로 실패한다 (`bg-muted` 위의 `text-muted-foreground`가
  // 4.39:1이다). 잔디 갱신 요청이 붙으면서 그 창이 넓어져 실제로 터졌다.
  play: async ({ canvas }) => {
    await expect(await canvas.findByRole('img', { name: SITE.handle })).toBeVisible();
  },
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const English: Story = {
  args: { lang: 'en' },
};
