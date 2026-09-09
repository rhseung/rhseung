import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { fn } from 'storybook/test';
import { css } from 'styled-system/css';

import { LanguageSuggestionPopover } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/LanguageSuggestionPopover',
  component: LanguageSuggestionPopover,
  parameters: {
    layout: 'centered',
    a11y: { config: { rules: [{ id: 'aria-hidden-focus', enabled: false }] } },
  },
  args: {
    suggested: 'en',
    href: '/en/',
    onDismiss: fn(),
    children: (
      <a
        href="/en/"
        aria-label="Switch language"
        className={css({ display: 'grid', boxSize: '10', placeItems: 'center' })}
      >
        <GlobeAltIcon aria-hidden className={css({ boxSize: '5' })} />
      </a>
    ),
  },
} satisfies Meta<typeof LanguageSuggestionPopover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoSuggestion: Story = {
  args: { suggested: null },
};
