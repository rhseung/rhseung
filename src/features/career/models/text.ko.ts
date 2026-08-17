import type { CareerTexts } from './types';

const experience = {
  'gist-aiter': {
    org: 'GIST 전기전자컴퓨터공학부 오디오지능연구실 (AiTeR)',
    role: '프론트엔드 개발자 인턴',
    summary: '오디오 지능 연구실에서 실험과 연구 수행에 참여하고 있습니다.',
  },
};

const education = {
  gist: {
    org: 'GIST (광주과학기술원)',
    role: '전기전자컴퓨터공학부 · AI융합학과 복수전공 (학사)',
    summary: '1학년은 도전탐색과정(무전공). 과기원이라 2학년부터 전공을 정한다.',
    achievements: [
      '2025년 입학식 학부 신입생 대표',
      '2025년 1학기 이공계 성적우수 장학생',
      'GS1001 미적분학과 응용 1위 — 240점 / 240점',
      'GS1401 컴퓨터 프로그래밍 1위 — 98점 / 100점',
    ],
  },
  'gwangju-science-academy': {
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
};

const awards = {
  'ai-convergence-contest': {
    title: 'AI 창의융합경진대회 참가',
    issuer: 'GIST AI융합학과',
    summary: '탁구로봇 트랙',
  },
  'ax-challenge-2026': {
    title: '2026 AX Challenge Track 1 3위',
    summary: '탁구로봇 트랙 · 2026.06 – 2026.08',
  },
  'junction-asia-2025': {
    title: 'JUNCTION ASIA 2025 참가',
    issuer: '앙트비 (ENTBE)',
  },
  'launch-ai-career-school': {
    title: 'L:AUNCH AI Career School 참가',
    issuer: '루트임팩트 · 크립톤엑스',
    summary: '후원: Google.org',
  },
  'mini-tex-corps': {
    title: '2025 호남권역 Mini Tex-Corps 수상',
    issuer: '과학기술정보통신부 · 과학기술사업화진흥원(COMPA)',
    summary: '주관: GIST 창업진흥센터, 이화여대 창업지원단, 원광대학교 창업지원단',
  },
};

const skillGroups = {
  backend: { group: '백엔드·데이터' },
  graphics: { group: '앱·그래픽스' },
  languages: { group: '언어' },
  ml: { group: '머신러닝' },
  tooling: { group: '도구' },
  web: { group: '웹' },
};

export const careerTextKO: CareerTexts = {
  experience,
  education,
  awards,
  skillGroups,
};
