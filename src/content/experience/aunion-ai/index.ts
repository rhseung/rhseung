import { defineCareer } from '@/features/career/model/define';

import logo from './logo.png?url';

export default defineCareer({
  slug: 'aunion-ai',
  start: { year: 2025, month: 9 },
  logo,
  links: {
    site: 'https://aiter.gist.ac.kr/',
  },
  ko: {
    org: '오니온에이아이 (GIST 오디오지능연구실 AiTeR)',
    role: '계약직 연구원 · 웹 프론트엔드 리드',
    summary:
      '2025년 9월 인턴으로 합류해 11월부터 계약직 연구원으로 일하고 있습니다. AI 영상 더빙 플랫폼과 실시간 번역 자막 서비스 RST의 웹 프론트엔드 개발을 총괄합니다.',
    achievements: [
      'RST 웹 프론트엔드 전면 재구축 - 바닐라 HTML/JS 약 1만 2천 줄을 13개 화면, 82개 상태의 React 앱으로',
      'AunionAI DUB - 8개 AI 서비스 화면, 더빙 품질 리포트, 토스페이먼츠와 카카오페이 결제, 구독과 크레딧 충전',
    ],
  },
  en: {
    org: 'Aunion AI (Audio Intelligence Technology & Research Lab, GIST)',
    role: 'Contract researcher, web frontend lead',
    summary:
      'Intern from September 2025, contract researcher since November. Leading the web frontend of an AI video-dubbing platform and RST, a real-time translated captioning service.',
    achievements: [
      'Rebuilt the RST web frontend, turning about 12,000 lines of vanilla HTML/JS into a React app with 13 screens and 82 states',
      'AunionAI DUB: eight AI service screens, dubbing-quality reports, Toss Payments and KakaoPay checkout, subscriptions and credit top-ups',
    ],
  },
});
