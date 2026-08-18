import { defineCareer } from '@/features/career/models/define';

export default defineCareer({
  slug: 'gist',
  start: { year: 2025, month: 3 },
  logo: '/logos/gist.svg',
  ko: {
    org: 'GIST (광주과학기술원)',
    role: '전기전자컴퓨터공학부 · AI융합학과 복수전공 (학사)',
    achievements: [
      '2025년 입학식 학부 신입생 대표',
      '2025년 1학기 이공계 성적우수 장학생',
      'GS1001 미적분학과 응용 1위 — 240점 / 240점',
      'GS1401 컴퓨터 프로그래밍 1위 — 98점 / 100점',
    ],
  },
  en: {
    org: 'Gwangju Institute of Science and Technology (GIST)',
    role: 'B.S., School of EECS and Department of AI Convergence (double major)',
    achievements: [
      'Freshman representative, 2025 matriculation ceremony',
      'Academic excellence scholarship, spring 2025',
      'GS1001 Calculus and Applications — 1st, 240 / 240',
      'GS1401 Computer Programming — 1st, 98 / 100',
    ],
  },
});
