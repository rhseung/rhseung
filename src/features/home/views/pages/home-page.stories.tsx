import { HomePage } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Home/Pages/HomePage',
  component: HomePage,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', updatedAt: '2026-08-19T00:00:00.000Z' },
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const English: Story = {
  args: { lang: 'en' },
};
