import type { ReactNode } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { SITE } from '@/common/lib';
import { CONTRIBUTIONS } from '@/mocks/contributions';

import { HomePage } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

function WithContributions({ children }: { children: ReactNode }) {
  useQueryClient().setQueryData(['contributions', SITE.handle], CONTRIBUTIONS);

  return children;
}

const meta = {
  title: 'Home/Pages/HomePage',
  component: HomePage,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', updatedOn: '2026-08-19' },
  decorators: [
    (Story) => (
      <WithContributions>
        <Story />
      </WithContributions>
    ),
  ],
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const English: Story = {
  args: { lang: 'en' },
};
