import { defineProject } from '@/features/projects/model/define';

export default defineProject({
  slug: 'ziggle',
  stack: ['React', 'TypeScript', 'TanStack Router', 'TanStack Query', 'Tailwind CSS', 'Storybook'],
  start: { year: 2025, month: 7 },
  status: 'active',
  links: {
    demo: 'https://ziggle.gistory.me',
  },
  ko: {
    title: '지글 (Ziggle)',
    summary:
      'GIST의 흩어진 공지를 한곳에 모아 보여 주는 교내 공지 서비스. 웹 V4 개편을 총괄해 멀티 패널 홈과 레이아웃, 색상, 아이콘 규칙을 새로 설계했다.',
    highlight: '사용자 800명 이상, 누적 공지 5,000건 이상의 신입생 필수 설치 앱',
  },
  en: {
    title: 'Ziggle',
    summary:
      "GIST's campus notice service that gathers scattered announcements in one place. I led the web V4 redesign: a multi-panel home and new layout, color and icon rules.",
    highlight: 'A must-install app for freshmen with 800+ users and 5,000+ notices',
  },
});
