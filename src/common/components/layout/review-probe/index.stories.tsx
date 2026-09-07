import { ReviewProbe } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/ReviewProbe',
  component: ReviewProbe,
  parameters: { layout: 'padded' },
  args: { count: 3 },
} satisfies Meta<typeof ReviewProbe>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Several: Story = {};

export const One: Story = { args: { count: 1 } };
