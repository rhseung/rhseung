import { RoleRotator } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Home/RoleRotator',
  component: RoleRotator,
  parameters: { layout: 'padded' },
  args: {
    roles: ['오픈소스 컨트리뷰터', '프론트엔드 개발자', 'CS/AI 연구자', '디자인 엔지니어'],
  },
} satisfies Meta<typeof RoleRotator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Single: Story = {
  args: { roles: ['프론트엔드 개발자'] },
};
