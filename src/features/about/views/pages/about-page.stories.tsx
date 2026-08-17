import type { ProjectSummary } from '@/features/projects';

import { AboutPage } from '.';

import type { Resume } from '../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const resume: Resume = {
  headline: '웹 앱을 만들고, 그게 도는 언어와 런타임도 만듭니다.',
  intro: '프론트엔드와 시스템 프로그래밍 양쪽을 오갑니다.',
  location: '대한민국',
  contact: { email: 'ryu@rhseung.me', github: 'https://github.com/rhseung' },
  experience: [{ period: '2025. 3. — 현재', org: '어딘가', role: '프론트엔드 엔지니어' }],
  education: [],
  awards: [],
  skills: ['TypeScript', 'Rust'],
};

const projects: ProjectSummary[] = [
  {
    slug: 'rhseung-me',
    title: 'rhseung.me',
    summary: 'Astro 아일랜드로 만든 이 사이트',
    domain: 'web',
    stack: ['astro'],
    start: '2026-08',
    status: 'active',
    pinned: true,
    hasDetail: true,
    draft: false,
  },
];

const meta = {
  title: 'About/Pages/AboutPage',
  component: AboutPage,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', name: '류현승', resume, projects, resumeHref: '/resume-ko.pdf' },
} satisfies Meta<typeof AboutPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const English: Story = {
  args: { lang: 'en', name: 'Ryu Hyunseung', resumeHref: '/resume-en.pdf' },
};
