import { defineCareer } from '@/features/career/models/define';

export default defineCareer({
  slug: 'gwangju-science-academy',
  start: { year: 2022, month: 3 },
  end: { year: 2025, month: 2 },
  logo: '/logos/gsa.webp',
  ko: {
    org: '과학영재학교 광주과학고등학교',
    role: '자연과학계열',
    achievements: [
      '정보 부문 GPA 4.285 / 4.3',
      '교내경시대회 정보 부문 출전 2회 모두 금상 (2022, 2023) (2022년은 1학년 중 유일)',
      '정보 교과우수상 6회, (4회 1위)',
    ],
  },
  en: {
    org: 'Gwangju Science Academy for the Gifted',
    role: 'Natural Sciences',
    achievements: [
      'Computer science GPA 4.285 / 4.3',
      'Gold Prize in every in-school computer science competition entered (2022, 2023), the 2022 one was the only award given to a first-year student',
      'Six Subject Excellence Awards in computer science, four of them ranked 1st',
    ],
  },
});
