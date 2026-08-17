import { experience } from './fixtures';

import { ExperiencePage } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Resume/Pages/ExperiencePage',
  component: ExperiencePage,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', section: 'experience', entries: experience },
} satisfies Meta<typeof ExperiencePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** 같은 화면이 학력에도 쓰인다 — 제목과 라우트만 다르다. */
export const Education: Story = {
  args: { section: 'education' },
};

export const EmptyState: Story = {
  args: { entries: [] },
};
