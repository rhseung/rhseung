import { withThemeByClassName } from '@storybook/addon-themes';
import { mswLoader } from 'msw-storybook-addon/csf3';

import { withLocale, withQueryClient } from './decorators';
import { DEFAULT_LANGUAGE, LANGUAGE_NAMES, LANGUAGES } from '../src/common/lib/languages';
import { LANGUAGE_SUGGESTION_DISMISSED_KEY } from '../src/common/viewmodels';
import { handlers } from '../src/mocks/handlers';

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
    msw: handlers,
    // 위반이 있으면 vitest 실행이 실패한다.
    a11y: { test: 'error' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },

  loaders: [
    mswLoader(),

    // 안 심으면 언어 제안이 실행하는 기계의 브라우저 언어에 따라 떴다 말았다 한다.
    () => {
      localStorage.setItem(LANGUAGE_SUGGESTION_DISMISSED_KEY, 'true');
    },
  ],

  decorators: [
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
    }),
    withLocale,
    withQueryClient,
  ],
};

export default preview;
