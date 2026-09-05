import { awards, education, experience, skills } from '@/mocks/career';

import { projects } from './fixtures';
import { ResumePage } from './resume-page';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Resume/Pages/ResumePage',
  component: ResumePage,
  parameters: { layout: 'fullscreen' },
  args: {
    lang: 'ko',
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

export const Default: Story = {};

export const Bare: Story = {
  args: { experience: [], education: [], projects: [], awards: [], skills: [] },
};
