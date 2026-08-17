import { Badge } from './badge';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/Badge',
  component: Badge,
  args: { children: 'systems' },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
  args: { variant: 'outline', children: 'typescript' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'archived' },
};
