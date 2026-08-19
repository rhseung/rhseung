import { defineCareer } from '@/features/career/models/define';

export default defineCareer({
  slug: 'gist',
  start: { year: 2025, month: 3 },
  logo: '/logos/gist.svg',
  ko: {
    org: 'GIST (광주과학기술원)',
    role: '전기전자컴퓨터공학부 · AI융합학과 복수전공 (학사)',
    achievements: [
      '이공계 성적우수 장학생',
      '2025년 입학식 학부 신입생 대표자',
      '2026년 전기전자컴퓨터공학과 과대표자',
    ],
  },
  en: {
    org: 'Gwangju Institute of Science and Technology (GIST)',
    role: 'B.S., Electrical Engineering and Computer Science; AI Convergence (double major)',
    achievements: [
      'Academic excellence scholarship (science and engineering)',
      'Freshman representative, 2025 matriculation ceremony',
      'Class representative, Electrical Engineering and Computer Science, 2026',
    ],
  },
});
