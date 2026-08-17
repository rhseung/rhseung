import { SiteHeader } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/SiteHeader',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', altHref: '/en' },
} satisfies Meta<typeof SiteHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** 섹션 안에 있을 때. 해당 네비 항목이 `aria-current="page"`로 강조된다. */
export const CurrentSection: Story = {
  args: { current: 'projects' },
};

/** 언어 버튼이 KO로 돌아가는 링크가 된다. */
export const English: Story = {
  args: { lang: 'en', altHref: '/' },
};

/** 짝 문서가 없는 페이지. */
export const WithoutAlternate: Story = {
  args: { altHref: undefined },
};
