import { expect, userEvent, within } from 'storybook/test';

import { ProjectsPage } from '.';

import type { Project } from '../../viewmodels';
import type { Meta, StoryObj } from '@storybook/react-vite';

const projects: Project[] = [
  {
    slug: 'lumen',
    title: 'Lumen',
    summary: '타입 추론이 있는 작은 스크립트 언어.',
    domain: 'systems',
    stack: ['Rust', 'LLVM'],
    start: { year: 2024, month: 3 },
    status: 'active',
    pinned: true,
    highlight: '파싱 3.2× 빠름 (12k LOC 기준)',
    hasDetail: true,
  },
  {
    slug: 'rhseung-me',
    title: 'rhseung.me',
    summary: 'Astro 아일랜드로 만든 이 사이트.',
    domain: 'web',
    stack: ['Astro', 'React', 'Tailwind CSS'],
    start: { year: 2026, month: 8 },
    status: 'active',
    pinned: true,
    hasDetail: true,
  },
  {
    slug: 'raymarch',
    title: 'raymarch',
    summary: 'WebGPU 레이마칭 실험. SDF만으로 장면을 그린다.',
    domain: 'graphics',
    stack: ['SFML', 'TypeScript'],
    start: { year: 2023, month: 5 },
    end: { year: 2023, month: 9 },
    status: 'archived',
    pinned: false,
    hasDetail: true,
  },
];

const meta = {
  title: 'Projects/Pages/ProjectsPage',
  component: ProjectsPage,
  parameters: { layout: 'fullscreen' },
  args: { lang: 'ko', projects },
} satisfies Meta<typeof ProjectsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filtered: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: /그래픽스/ }));

    await expect(canvas.getByRole('link', { name: 'raymarch' })).toBeVisible();
    await expect(canvas.queryByRole('link', { name: 'Lumen' })).not.toBeInTheDocument();
  },
};

export const EmptyState: Story = {
  args: { projects: [] },
};
