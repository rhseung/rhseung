import { TranslationNotice } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/TranslationNotice',
  component: TranslationNotice,
  parameters: { layout: 'padded' },
  args: { bodyLang: 'ko' },
} satisfies Meta<typeof TranslationNotice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const KoreanBody: Story = {};

export const EnglishBody: Story = { args: { bodyLang: 'en' } };
