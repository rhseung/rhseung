import { useEffect, useState } from 'react';

const READING_LINE = 0.24;

/**
 * `slugs` 를 배열째로 의존성에 걸면 매 렌더가 새 배열이라 리스너를 다시 단다. 문자열로
 * 눌러 담아 건넨다. IntersectionObserver 는 마지막 절이 짧으면 영영 안 깨어나서 못 쓴다.
 */
export function useActiveHeading(slugs: readonly string[]) {
  const key = slugs.join(',');
  const [active, setActive] = useState('');

  useEffect(() => {
    const elements = key
      .split(',')
      .map((slug) => document.getElementById(slug))
      .filter((element) => element !== null);

    const update = () => {
      if (elements.length === 0) return;

      // 마지막 절은 기준선까지 못 올라온 채 문서가 끝나서 이 분기 없이는 도달할 수 없다.
      const scrolled = window.scrollY + window.innerHeight;
      if (scrolled >= document.documentElement.scrollHeight - 2) {
        setActive(elements[elements.length - 1].id);
        return;
      }

      const line = window.innerHeight * READING_LINE;
      const passed = elements.filter((element) => element.getBoundingClientRect().top <= line);

      setActive((passed.at(-1) ?? elements[0]).id);
    };

    let frame = 0;
    const schedule = () => {
      if (frame !== 0) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [key]);

  return active;
}
