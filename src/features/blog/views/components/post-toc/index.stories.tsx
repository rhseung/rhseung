import { css } from 'styled-system/css';

import { PostToc } from '.';

import type { PostHeading } from '../../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const headings: PostHeading[] = [
  { depth: 2, slug: 'overview', text: '개요' },
  { depth: 2, slug: 'reset', text: '초기화' },
  { depth: 2, slug: 'basics', text: '기초 프로그램 설치' },
  { depth: 3, slug: 'chrome', text: 'Google Chrome: 웹 브라우저' },
  { depth: 3, slug: 'bitwarden', text: 'Bitwarden: 비밀번호 관리자' },
  { depth: 3, slug: 'raycast', text: 'Raycast: Spotlight 대체 + 부가기능' },
  { depth: 2, slug: 'terminal', text: 'iTerm2' },
];

const meta = {
  title: 'Blog/PostToc',
  component: PostToc,
  // 비활성 항목을 일부러 대비 하한 아래로 내렸다.
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  decorators: [
    (Story) => (
      <div className={css({ w: '56' })}>
        <Story />
      </div>
    ),
  ],
  args: { headings },
} satisfies Meta<typeof PostToc>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FlatOnly: Story = {
  args: { headings: headings.filter(({ depth }) => depth === 2) },
};

export const Overflowing: Story = {
  args: {
    headings: Array.from({ length: 40 }, (_, index) => ({
      depth: index % 3 === 0 ? 2 : 3,
      slug: `section-${index}`,
      text: `${index + 1}번째 절 제목`,
    })),
    className: 'max-h-80',
  },
};

export const Empty: Story = { args: { headings: [] } };
