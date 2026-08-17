import { awards, education, experience, skills } from './fixtures';

import { CareerPage } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Resume/Pages/CareerPage',
  component: CareerPage,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', experience, education, awards, skills },
} satisfies Meta<typeof CareerPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyState: Story = {
  args: { experience: [], education: [], awards: [], skills: [] },
};
