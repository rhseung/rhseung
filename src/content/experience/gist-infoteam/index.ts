import { defineCareer } from '@/features/career/model/define';

export default defineCareer({
  slug: 'gist-infoteam',
  start: { year: 2025, month: 5 },
  links: {
    site: 'https://github.com/gsainfoteam',
  },
  ko: {
    org: 'GIST 인포팀',
    role: '프론트엔드 리드 · UI/UX 디자이너',
    summary: '하우스 퇴사검사, 지글, 인포팀 계정 등 교내 서비스의 프론트엔드와 UI/UX 디자인을 맡고 있습니다.',
    achievements: [
      '하우스 퇴사검사 - 기숙사생 전원이 쓰는 공식 서비스, 퇴사 시즌 일 최대 약 600명',
      '지글 웹 V4 개편 총괄 - 사용자 800명 이상, 누적 공지 5,000건 이상',
      'IDS 디자인 시스템 - React, Flutter, SwiftUI 공용 컴포넌트 설계와 Figma 디자인',
    ],
  },
  en: {
    org: 'GIST Infoteam',
    role: 'Frontend lead, UI/UX designer',
    summary:
      'Owning the frontend and UI/UX design of campus services including House move-out inspection, Ziggle and the Infoteam account.',
    achievements: [
      'House move-out inspection: the official service for every dorm resident, up to about 600 users a day in season',
      'Led the Ziggle web V4 redesign: 800+ users, 5,000+ notices',
      'IDS design system: shared components for React, Flutter and SwiftUI, designed in Figma',
    ],
  },
});
