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

export const Important: Story = { args: { tone: 'important', title: '중요' } };

export const Warning: Story = { args: { tone: 'warning', title: '경고' } };

export const Caution: Story = { args: { tone: 'caution', title: '위험' } };

export const WithoutTitle: Story = { args: { tone: 'note' } };
