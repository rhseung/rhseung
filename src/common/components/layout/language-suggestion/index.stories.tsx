import { fn } from 'storybook/test';

import { LanguageSuggestion } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/LanguageSuggestion',
  component: LanguageSuggestion,
  parameters: { layout: 'padded' },
  args: { language: 'en', href: '/en/', onDismiss: fn() },
} satisfies Meta<typeof LanguageSuggestion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** 영어판을 보고 있는데 브라우저가 한국어인 경우. */
export const Korean: Story = {
  args: { language: 'ko', href: '/ko/' },
};
