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

/** 섹션 안에 있을 때 해당 아이콘이 강조된다. */
export const CurrentSection: Story = {
  args: { current: 'projects' },
};

/** 좁은 화면 — 섹션·외부 링크는 시트로 접힌다. */
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  globals: { viewport: { value: 'mobile1' } },
};

/** 짝 문서가 없는 페이지 — 언어 버튼이 사라진다. */
export const WithoutAlternate: Story = {
  args: { altHref: undefined },
};
