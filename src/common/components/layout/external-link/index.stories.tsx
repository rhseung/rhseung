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

/** 본문 안 링크. */
export const Default: Story = {};

/** 버튼 모양으로 쓸 때도 아이콘은 그대로 붙는다. */
export const AsButton: Story = {
  args: { className: buttonVariants({ variant: 'outline', size: 'sm' }) },
};
