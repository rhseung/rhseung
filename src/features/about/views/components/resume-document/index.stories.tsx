import type { ProjectSummary } from '@/features/projects';

import { ResumeDocument } from '.';

import type { Resume } from '../../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const resume: Resume = {
  headline: '웹 앱을 만들고, 그게 도는 언어와 런타임도 만듭니다.',
  intro: '프론트엔드와 시스템 프로그래밍 양쪽을 오갑니다.',
  location: '대한민국',
  contact: {
    email: 'ryu@rhseung.me',
    github: 'https://github.com/rhseung',
    site: 'https://rhseung.me',
  },
  experience: [
    {
      period: '2025. 3. — 현재',
      org: '어딘가',
      role: '프론트엔드 엔지니어',
      description: '디자인 시스템을 Base UI로 옮기고 빌드 시간을 절반으로 줄였습니다.',
    },
  ],
  education: [{ period: '2024. 3. — 현재', org: '어느 대학교', role: '컴퓨터공학 학사과정' }],
  awards: [
    { year: '2025', title: '무슨 대회 대상', issuer: '주최기관', note: '참가 120팀 중 1위' },
  ],
  skills: ['TypeScript', 'Rust', 'Astro', 'React'],
};

const projects: ProjectSummary[] = [
  {
    slug: 'lumen',
    title: 'Lumen',
    summary: '타입 추론이 있는 작은 스크립트 언어',
    domain: 'systems',
    stack: ['rust'],
    start: '2024-03',
    status: 'active',
    pinned: true,
    highlight: '파싱 3.2× 빠름 (12k LOC 기준)',
    draft: false,
  },
];

const meta = {
  title: 'About/ResumeDocument',
  component: ResumeDocument,
  parameters: { layout: 'padded' },
  args: { name: '류현승', resume, projects },
} satisfies Meta<typeof ResumeDocument>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** 아직 안 채운 상태 — 빈 섹션은 통째로 빠진다. */
export const Bare: Story = {
  args: {
    resume: { ...resume, experience: [], education: [], awards: [], skills: [], intro: undefined },
    projects: [],
  },
};
