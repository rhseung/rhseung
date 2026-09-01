import { buttonVariants } from '@/common/components';
import { cn } from '@/common/utils';

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
  args: { className: cn(buttonVariants({ variant: 'outline', size: 'sm' })) },
};

/** 파비콘을 받아둔 도메인이면 ↗ 대신 그 사이트 아이콘이 선다. */
export const WithFavicon: Story = {
  args: { href: 'https://nodejs.org/', children: 'nodejs.org' },
};

export const FaviconOff: Story = {
  args: { href: 'https://nodejs.org/', children: 'nodejs.org', showFavicon: false },
};
