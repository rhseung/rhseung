import { TocDock } from '.';

import type { PostHeading } from '../../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const headings: PostHeading[] = [
  { depth: 2, slug: 'overview', text: '개요' },
  { depth: 2, slug: 'basics', text: '기초 프로그램 설치' },
  { depth: 3, slug: 'chrome', text: 'Google Chrome: 웹 브라우저' },
  { depth: 3, slug: 'raycast', text: 'Raycast: Spotlight 대체 + 부가기능' },
  { depth: 2, slug: 'terminal', text: 'iTerm2' },
];

const meta = {
  title: 'Blog/TocDock',
  component: TocDock,
  parameters: {
    layout: 'fullscreen',
    // `PostToc` 와 같은 이유로 끈다 - 비활성 항목을 일부러 대비 하한 아래로 내렸다.
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } },
  },
  // `lg` 위에서는 목차가 본문 옆에 붙어서 이 버튼이 사라진다.
  globals: { viewport: { value: 'mobile1' } },
  args: { headings },
} satisfies Meta<typeof TocDock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** 제목이 없는 글에서는 버튼 자체가 안 뜬다. */
export const Empty: Story = { args: { headings: [] } };
