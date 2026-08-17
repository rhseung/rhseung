import { ResumeDocument } from '.';

import type { Resume } from '../../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const resume: Resume = {
  headline: '웹 앱을 만들고, 그게 도는 언어와 런타임도 만듭니다.',
  intro: '프론트엔드와 시스템 프로그래밍 양쪽을 오갑니다.',
  contact: {
    email: 'ryu@rhseung.me',
    github: 'https://github.com/rhseung',
    site: 'https://rhseung.me',
  },
  timeline: [
    {
      period: '2024.03 – 현재',
      org: '어딘가',
      role: '프론트엔드 엔지니어',
      points: ['디자인 시스템을 Base UI로 옮겼다'],
    },
  ],
  skills: [{ group: '언어', items: ['TypeScript', 'Rust'] }],
};

const meta = {
  title: 'About/ResumeDocument',
  component: ResumeDocument,
  parameters: { layout: 'fullscreen' },
  args: { name: '류현승', resume },
} satisfies Meta<typeof ResumeDocument>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** 아직 안 채운 상태 — 빈 섹션은 통째로 빠진다. */
export const Bare: Story = {
  args: { resume: { ...resume, timeline: [], skills: [], intro: undefined } },
};
