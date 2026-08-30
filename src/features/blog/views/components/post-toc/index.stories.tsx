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
  /*
   * 비활성 항목은 일부러 대비 4.5:1 아래로 내렸다 - 목차는 본문을 읽는 동안 배경으로
   * 물러나 있어야 하고, 지금 절만 또렷하면 된다. 대비를 지키는 색은 `muted-foreground`
   * 가 이미 하한이라 더 연하게 만들 여지가 없어서 규칙 하나만 끈다.
   */
  parameters: {
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  // 실제 자리가 본문 오른쪽 여백이라 폭을 고정해야 줄바꿈이 진짜처럼 보인다.
  decorators: [
    (Story) => (
      <div className="w-56">
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

/** 상자보다 목차가 길면 안에서 스크롤된다. 실제 글에서 흔한 쪽이다. */
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

/** 제목이 하나도 없는 글에서는 목차 자체가 사라진다. */
export const Empty: Story = { args: { headings: [] } };
