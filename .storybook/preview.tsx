import { withThemeByClassName } from '@storybook/addon-themes';
import { mswLoader } from 'msw-storybook-addon/csf3';

import { withLocale, withQueryClient } from './decorators';
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
        items: [
          { value: 'ko', title: '한국어' },
          { value: 'en', title: 'English' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { locale: 'ko' },

  parameters: {
    layout: 'centered',
    // dev·vitest·Playwright가 쓰는 것과 같은 핸들러. 픽스처 하나, 소비자 넷.
    msw: handlers,
    // 위반이 있으면 vitest 실행이 실패한다. 백로그를 못 치우고 먼저 머지해야 하면
    // 'todo'로 낮추되, 의식적으로 낮춘다.
    a11y: { test: 'error' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },

  loaders: [
    mswLoader(),

    // 언어 제안은 `navigator.languages`를 보고 뜬다. 그대로 두면 스토리 결과가 실행하는
    // 기계의 브라우저 언어에 따라 달라진다 - 한국어 기계에서는 안 뜨고 영어 기계에서는
    // 페이지 스토리마다 팝오버가 열린다. 스토리북에서는 닫힌 상태로 고정한다.
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
