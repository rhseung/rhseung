import { awards, education, experience, profile, projects, skills } from './fixtures';

import { ResumePage } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Resume/Pages/ResumePage',
  component: ResumePage,
  parameters: { layout: 'fullscreen' },
  args: {
    lang: 'ko',
    name: '류현승',
    profile,
    experience,
    education,
    projects,
    awards,
    skills,
    resumeHref: '/resume-ko.pdf',
  },
} satisfies Meta<typeof ResumePage>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 이력서는 아무 내용도 소유하지 않는다 — 섹션마다 자기 컬렉션에서 온다. */
export const Default: Story = {};

/** 아직 아무것도 안 채운 상태. 빈 섹션은 통째로 빠진다. */
export const Bare: Story = {
  args: { experience: [], education: [], projects: [], awards: [], skills: [] },
};
