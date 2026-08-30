import { SiteDock } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/SiteDock',
  component: SiteDock,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', altHref: '/en/' },
} satisfies Meta<typeof SiteDock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CurrentSection: Story = {
  args: { current: 'projects' },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  globals: { viewport: { value: 'mobile1' } },
};

export const WithoutAlternate: Story = {
  args: { altHref: undefined },
};

/** 글 상세만 목차를 넘긴다. `lg` 아래에서만 뜨는 버튼이라 좁은 화면으로 고정한다. */
export const WithTableOfContents: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  globals: { viewport: { value: 'mobile1' } },
  args: {
    current: 'blog',
    toc: (
      <nav aria-label="목차" className="flex flex-col gap-3">
        <p className="text-muted-foreground text-xs font-medium">목차</p>
        <ul className="text-muted-foreground flex flex-col gap-1 text-sm">
          <li>개요</li>
          <li className="pl-3">설치</li>
          <li>마무리</li>
        </ul>
      </nav>
    ),
  },
};
