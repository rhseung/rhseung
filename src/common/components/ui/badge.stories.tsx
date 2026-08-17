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

/** 스택 칩·태그·상태. 컨테이너가 항상 보여야 배지로 읽힌다. */
export const Outline: Story = {
  args: { variant: 'outline', children: 'typescript' },
};

/** 도메인처럼 분류축을 표시할 때. */
export const Secondary: Story = {
  args: { variant: 'secondary', children: 'archived' },
};
