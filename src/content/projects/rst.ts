import { defineProject } from '@/features/projects/model/define';

export default defineProject({
  slug: 'rst',
  stack: ['React', 'TypeScript', 'TanStack Start', 'Tailwind CSS', 'Storybook', 'Playwright'],
  start: { year: 2025, month: 11 },
  status: 'active',
  category: 'service',
  ko: {
    title: 'RST (eduRST)',
    summary:
      '강의자의 말을 AI가 인식하고 번역해 청중 각자의 언어로 실시간 자막과 합성 음성을 보여 주는 교육용 서비스. 웹 프론트엔드 재구축을 혼자 총괄했다.',
    highlight: '바닐라 HTML/JS 약 1만 2천 줄을 13개 화면, 82개 상태의 React 앱으로 재구현',
  },
  en: {
    title: 'RST (eduRST)',
    summary:
      "An education service that recognizes and translates a lecturer's speech, streaming live captions and synthesized audio in each listener's language. I led the web frontend rebuild on my own.",
    highlight:
      'Rebuilt about 12,000 lines of vanilla HTML/JS as a React app with 13 screens and 82 states',
  },
});
