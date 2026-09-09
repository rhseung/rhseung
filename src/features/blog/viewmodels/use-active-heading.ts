import { useEffect, useState } from 'react';

const READING_LINE = 0.24;

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
