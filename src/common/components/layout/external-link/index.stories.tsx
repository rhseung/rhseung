import { buttonVariants } from '@/common/components';

import { ExternalLink } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/ExternalLink',
  component: ExternalLink,
  parameters: { layout: 'padded' },
  args: { href: 'https://github.com/rhseung', children: 'github.com/rhseung' },
} satisfies Meta<typeof ExternalLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsButton: Story = {
  args: { className: buttonVariants({ variant: 'outline', size: 'sm' }) },
};
