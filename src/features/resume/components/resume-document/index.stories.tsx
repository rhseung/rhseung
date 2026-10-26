import { expect, within } from 'storybook/test';

import { awards, education, experience, skills } from '@/mocks/career';
import { projects } from '@/mocks/projects';

import { ResumeDocument } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Resume/ResumeDocument',
  component: ResumeDocument,
  parameters: { layout: 'padded' },
  args: { experience, education, projects, awards, skills },
} satisfies Meta<typeof ResumeDocument>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText(experience[0].org)).toBeVisible();
  },
};

export const Bare: Story = {
  args: { experience: [], education: [], projects: [], awards: [], skills: [] },
};
