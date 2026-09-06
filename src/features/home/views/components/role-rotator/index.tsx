import { useEffect, useRef } from 'react';

import { css } from 'styled-system/css';

import { useMediaQuery } from '@/common/viewmodels';

const SLIDE_MS = 500;

const clip = css({ h: '5', overflow: 'hidden', _motionReduce: { h: 'auto' } });
const role = css({ textStyle: 'sm' });
const ghost = css({ textStyle: 'sm', _motionReduce: { display: 'none' } });

export function RoleRotator({ roles, intervalMs = 2000 }: RoleRotator.Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');

  const looping = roles.length > 1;

  useEffect(() => {
    const list = listRef.current;
    if (list === null || !looping || reduced) return;

    const total = roles.length + 1;
    const cycle = roles.length * intervalMs;
    const slide = Math.min(1, SLIDE_MS / intervalMs);

    const keyframes = roles.flatMap((_, i) => {
      const translate = `0 -${(i * 100) / total}%`;

      return [
        { offset: i / roles.length, translate, easing: 'linear' },
        { offset: (i + 1 - slide) / roles.length, translate, easing: 'ease-out' },
      ];
    });

    keyframes.push({
      offset: 1,
      translate: `0 -${(roles.length * 100) / total}%`,
      easing: 'linear',
    });

    const animation = list.animate(keyframes, { duration: cycle, iterations: Infinity });
    return () => animation.cancel();
  }, [roles, looping, intervalMs, reduced]);

  return (
    <div className={clip}>
      <ul ref={listRef}>
        {roles.map((item) => (
          <li key={item} className={role}>
            {item}
          </li>
        ))}

        {looping && (
          <li aria-hidden className={ghost}>
            {roles[0]}
          </li>
        )}
      </ul>
    </div>
  );
}

export declare namespace RoleRotator {
  export type Props = {
    roles: string[];
    intervalMs?: number;
  };
}
