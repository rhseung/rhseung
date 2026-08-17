import { Callout } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/MDX/Callout',
  component: Callout,
  args: { children: '문단 흐름을 끊고 하나를 강조합니다.' },
} satisfies Meta<typeof Callout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Note: Story = { args: { tone: 'note', title: '참고' } };

export const Tip: Story = { args: { tone: 'tip', title: '팁' } };

export const Warn: Story = { args: { tone: 'warn', title: '주의' } };

export const WithoutTitle: Story = { args: { tone: 'note' } };
