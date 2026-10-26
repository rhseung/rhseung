import { useTranslation } from 'react-i18next';
import { expect, within } from 'storybook/test';

import { useLanguage } from '@/common/hooks';

import { AppProviders } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

function LanguageProbe() {
  const lang = useLanguage();
  const { t } = useTranslation('common');

  return (
    <p>
      {lang}: {t(($) => $.nav.projects)}
    </p>
  );
}

const meta = {
  title: 'Common/Islands/AppProviders',
  component: AppProviders,
  args: { lang: 'ko', children: <LanguageProbe /> },
} satisfies Meta<typeof AppProviders>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Korean: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('ko: 프로젝트')).toBeVisible();
  },
};
