import { defineCareer } from '@/features/career/models/define';

export default defineCareer({
  slug: 'gist-aiter',
  start: { year: 2025, month: 9 },
  logo: '/logos/gist-ai.png',
  links: {
    site: 'https://aiter.gist.ac.kr/',
  },
  ko: {
    org: 'GIST 전기전자컴퓨터공학부 오디오지능연구실 (AiTeR)',
    role: '프론트엔드 개발자 인턴',
    summary: '오디오 지능 연구실에서 실험과 연구 수행에 참여하고 있습니다.',
  },
  en: {
    org: 'Audio Intelligence Technology & Research Lab (AiTeR), School of EECS, GIST',
    role: 'Frontend developer intern',
    summary: 'Taking part in experiments and research at the audio intelligence lab.',
  },
});
