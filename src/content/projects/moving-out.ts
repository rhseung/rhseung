import { defineProject } from '@/features/projects/model/define';

export default defineProject({
  slug: 'moving-out',
  stack: ['React', 'TypeScript', 'TanStack Router', 'TanStack Query', 'Tailwind CSS', 'Storybook'],
  start: { year: 2025, month: 12 },
  end: { year: 2026, month: 3 },
  status: 'shipped',
  category: 'service',
  links: {
    demo: 'https://moving-out.gistory.me',
  },
  ko: {
    title: '하우스 퇴사검사',
    summary:
      'GIST 기숙사 퇴사검사의 신청, 현장 검사, 결과 처리를 전산화한 공식 서비스. 5인 팀에서 학생과 검사위원 화면 개발과 UI/UX 디자인을 총괄했다.',
    highlight: '2026 여름방학부터 기숙사생 전원이 사용, 퇴사 시즌 일 최대 약 600명',
  },
  en: {
    title: 'House move-out inspection',
    summary:
      "The official service that digitized GIST's dorm move-out inspections: booking, on-site checks and results. On a team of five I led the student and inspector screens and the UI/UX design.",
    highlight:
      'Used by every dorm resident since summer 2026, up to about 600 users a day in season',
  },
});
