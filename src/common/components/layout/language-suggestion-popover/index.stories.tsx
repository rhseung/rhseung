import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { fn } from 'storybook/test';

import { LanguageSuggestionPopover } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Common/LanguageSuggestionPopover',
  component: LanguageSuggestionPopover,
  parameters: {
    layout: 'centered',
    // Base UI 가 팝업 앞뒤에 두는 포커스 가드(`aria-hidden` + `tabindex=0`)는 우리 DOM 이 아니다.
    a11y: { config: { rules: [{ id: 'aria-hidden-focus', enabled: false }] } },
  },
  args: {
    suggested: 'en',
    href: '/en/',
    onDismiss: fn(),
    children: (
      <a href="/en/" aria-label="Switch language" className="grid size-10 place-items-center">
        <GlobeAltIcon aria-hidden className="size-5" />
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
