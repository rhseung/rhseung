import { expect, within } from 'storybook/test';

import { SiteDockIsland } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/Islands/SiteDockIsland',
  component: SiteDockIsland,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', route: { to: '/[lang]' } },
} satisfies Meta<typeof SiteDockIsland>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Korean: Story = {
  play: async ({ canvasElement }) => {
    const nav = await within(canvasElement).findByRole('navigation', { name: '주요 메뉴' });

    await expect(await within(nav).findByRole('link', { name: '프로젝트' })).toHaveAttribute(
      'href',
      '/ko/projects/',
    );
  },
};

export const English: Story = {
  args: { lang: 'en' },
  play: async ({ canvasElement }) => {
    const nav = await within(canvasElement).findByRole('navigation', { name: 'Main' });

    await expect(await within(nav).findByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/en/projects/',
    );
  },
};
