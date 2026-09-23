import { withThemeByDataAttribute } from '@storybook/addon-themes';

import { withLocale, withQueryClient, withUrlState } from './decorators';
import { DEFAULT_LANGUAGE, LANGUAGE_NAMES, LANGUAGES } from '../src/common/lib/i18n/languages';
import { LANGUAGE_SUGGESTION_DISMISSED_KEY } from '../src/common/viewmodels';

import type { Preview } from '@storybook/react-vite';

import '../src/styles.css';

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'i18n locale',
      toolbar: {
        icon: 'globe',
        items: LANGUAGES.map((value) => ({ value, title: LANGUAGE_NAMES[value] })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { locale: DEFAULT_LANGUAGE },

  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },

  loaders: [
    () => {
      localStorage.setItem(LANGUAGE_SUGGESTION_DISMISSED_KEY, 'true');
    },
  ],

  decorators: [
    withThemeByDataAttribute({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    withLocale,
    withQueryClient,
    withUrlState,
  ],
};

export default preview;
