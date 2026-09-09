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

export const WithFavicon: Story = {
  args: { href: 'https://nodejs.org/', children: 'nodejs.org', showFavicon: true },
};

export const FaviconMissing: Story = {
  args: { href: 'https://example.com/', children: 'example.com', showFavicon: true },
};
