import { defineCareer } from '@/features/career/models/define';

export default defineCareer({
  slug: 'gwangju-science-academy',
  start: '2022-03',
  end: '2025-02',
  logo: '/logos/gsa.webp',
  ko: {
    org: '과학영재학교 광주과학고등학교',
    role: '자연과학계열',
    summary: '정보 부문 GPA 4.285 / 4.3',
    achievements: [
      '2023년 교내경시대회 정보부문 금상',
      '2022년 교내경시대회 정보부문 금상 (1학년 중 유일)',
      '정보과학 프로젝트 교과우수상 — 3학년 1학기 1위',
      '자료구조와 알고리즘 — 3학년 1학기 2위',
      '프로그래밍과 문제해결 교과우수상 — 2학년 2학기 1위 (AP)',
      '객체지향 프로그래밍 교과우수상 — 2학년 2학기 1위',
      '머신러닝과 딥러닝 교과우수상 — 2학년 2학기 1위',
      '정보과학 II 교과우수상 — 1학년 2학기 2위',
      '정보과학 I 교과우수상 — 1학년 1학기 5위',
    ],
  },
  en: {
    org: 'Gwangju Science Academy for the Gifted',
    role: 'Natural Sciences',
    summary: 'Computer science GPA 4.285 / 4.3',
    achievements: [
      'Gold Prize, 2023 in-school competition (computer science)',
      'Gold Prize, 2022 in-school competition — the only one awarded to a first-year student',
      'Subject Excellence Award, Computer Science Project — 1st, year 3 semester 1',
      'Data Structures & Algorithms — 2nd, year 3 semester 1',
      'Subject Excellence Award, Programming & Problem Solving — 1st, year 2 semester 2 (AP)',
      'Subject Excellence Award, Object-Oriented Programming — 1st, year 2 semester 2',
      'Subject Excellence Award, Machine Learning & Deep Learning — 1st, year 2 semester 2',
      'Subject Excellence Award, Computer Science II — 2nd, year 1 semester 2',
      'Subject Excellence Award, Computer Science I — 5th, year 1 semester 1',
    ],
  },
});
