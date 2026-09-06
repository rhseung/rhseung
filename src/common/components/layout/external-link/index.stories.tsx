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
  args: { plain: true, className: buttonVariants({ variant: 'outline', size: 'sm' }) },
};

/** `showFavicon` 을 켰고 파비콘을 받아둔 도메인이면 ↗ 대신 그 사이트 아이콘이 선다. MDX 본문 링크만 이걸 켠다. */
export const WithFavicon: Story = {
  args: { href: 'https://nodejs.org/', children: 'nodejs.org', showFavicon: true },
};

/** 켰어도 받아둔 파비콘이 없으면 ↗ 그대로다. */
export const FaviconMissing: Story = {
  args: { href: 'https://example.com/', children: 'example.com', showFavicon: true },
};
