import { defineProject } from '@/features/projects/model/define';

import cover from './cover.webp?url';

export default defineProject({
  slug: 'moving-out',
  stack: ['React', 'TypeScript', 'TanStack Router', 'TanStack Query', 'Tailwind CSS', 'Storybook'],
  start: { year: 2025, month: 12 },
  end: { year: 2026, month: 3 },
  status: 'shipped',
  category: 'service',
  cover,
  links: {
    demo: 'https://moving-out.gistory.me',
  },
  ko: {
    title: '하우스 퇴사검사',
    coverAlt: '검사 진행 단계, 15분 단위 시간 선택, 검사위원 체크리스트 모바일 화면',
    summary:
      'GIST 기숙사 퇴사검사의 신청, 현장 검사, 결과 처리를 전산화한 공식 서비스. 2026 여름방학부터 기숙사생 전원이 쓰고, 퇴사 시즌엔 하루 최대 약 600명이 쓴다. 5인 팀에서 학생과 검사위원 화면 개발, UI/UX 디자인을 총괄했다.',
  },
  en: {
    title: 'House move-out inspection',
    coverAlt:
      'Mobile screens for the inspection steps, 15-minute slot picker and inspector checklist',
    summary:
      "The official service that digitized GIST's dorm move-out inspections, used by every resident since summer 2026 and by up to 600 a day in season. I led the student and inspector screens and UI/UX.",
  },
});
