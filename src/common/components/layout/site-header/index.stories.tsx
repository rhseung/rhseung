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

/** 툴바의 테마 스위처로 light/dark를 확인한다. */
export const Default: Story = {};

/** 영어판. 언어 버튼은 KO로 돌아가는 링크가 된다. */
export const English: Story = {
  args: { lang: 'en', altHref: '/' },
};

/** 짝 문서가 없는 페이지 — 언어 버튼이 아예 안 나온다. */
export const WithoutAlternate: Story = {
  args: { altHref: undefined },
};
