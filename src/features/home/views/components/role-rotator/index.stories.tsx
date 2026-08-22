import { expect, waitFor } from 'storybook/test';

import { RoleRotator } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const ROLES = ['오픈소스 기여자', '풀스택 개발자', 'CS/AI 연구자', '디자인 엔지니어'];

const meta = {
  title: 'Home/RoleRotator',
  component: RoleRotator,
  parameters: { layout: 'padded' },
  args: { roles: ROLES },
} satisfies Meta<typeof RoleRotator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Single: Story = {
  args: { roles: ['프론트엔드 개발자'] },
};

export const Looping: Story = {
  play: async ({ canvasElement }) => {
    const list = canvasElement.querySelector('ul');
    const viewport = list?.parentElement;

    if (list === null || list === undefined || viewport === null || viewport === undefined) {
      throw new Error('목록을 못 찾았다');
    }

    const visible = () => {
      const top = viewport.getBoundingClientRect().top;
      return [...list.children].find((item) => Math.abs(item.getBoundingClientRect().top - top) < 2)
        ?.textContent;
    };

    const [animation] = await waitFor(() => {
      const running = list.getAnimations();
      expect(running).toHaveLength(1);
      return running;
    });

    const timing = animation.effect?.getComputedTiming();
    expect(timing?.iterations).toBe(Infinity);

    const cycle = Number(timing?.duration);
    expect(cycle).toBeGreaterThan(0);

    animation.pause();

    animation.currentTime = 0;
    await waitFor(() => expect(visible()).toBe(ROLES[0]));

    animation.currentTime = cycle / ROLES.length;
    await waitFor(() => expect(visible()).toBe(ROLES[1]));

    animation.currentTime = cycle;
    await waitFor(() => expect(visible()).toBe(ROLES[0]));
  },
};
