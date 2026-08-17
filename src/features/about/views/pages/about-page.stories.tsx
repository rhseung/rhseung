import { AboutPage } from '.';

import type { Resume } from '../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const resume: Resume = {
  headline: '웹 앱을 만들고, 그게 도는 언어와 런타임도 만듭니다.',
  intro: '프론트엔드와 시스템 프로그래밍 양쪽을 오갑니다.',
  contact: {
    email: 'ryu@rhseung.me',
    github: 'https://github.com/rhseung',
    site: 'https://rhseung.me',
  },
  timeline: [],
  skills: [],
};

const meta = {
  title: 'About/Pages/AboutPage',
  component: AboutPage,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', name: '류현승', resume, resumeHref: '/resume-ko.pdf' },
} satisfies Meta<typeof AboutPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/** 이력·기술은 여기가 아니라 PDF 뷰어 안에 있다. 이 페이지는 소개·연락·뷰어만 맡는다. */
export const Default: Story = {};

export const English: Story = {
  args: { lang: 'en', name: 'Ryu Hyunseung', resumeHref: '/resume-en.pdf' },
};
