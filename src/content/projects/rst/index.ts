import { defineProject } from '@/features/projects/model/define';

import cover from './cover.webp?url';

export default defineProject({
  slug: 'rst',
  stack: ['React', 'TypeScript', 'TanStack Start', 'Tailwind CSS', 'Storybook', 'Playwright'],
  start: { year: 2025, month: 11 },
  status: 'active',
  category: 'service',
  cover,
  ko: {
    title: 'RST (eduRST)',
    coverAlt: 'eduRST 첫 화면: 언어의 장벽 없이, 소통을 연결합니다',
    summary:
      '강의자의 말을 AI가 인식하고 번역해 청중 각자의 언어로 실시간 자막과 합성 음성을 보여 주는 교육용 서비스. 바닐라 HTML/JS 약 1만 2천 줄을 13개 화면, 82개 상태의 React 앱으로 혼자 재구축했다.',
  },
  en: {
    title: 'RST (eduRST)',
    coverAlt: 'The eduRST landing page',
    summary:
      "An education service streaming live captions and synthesized audio of a lecture in each listener's language. I alone rebuilt 12,000 lines of vanilla JS into a React app with 13 screens and 82 states.",
  },
});
