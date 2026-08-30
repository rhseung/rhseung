import { useEffect, useState } from 'react';

/** 화면 위에서 이 지점을 지난 마지막 제목이 "지금 읽는 곳"이다. */
const READING_LINE = 0.24;

/**
 * `slugs` 를 배열째로 의존성에 걸면 부모가 리렌더할 때마다 리스너를 다시 단다 - 목록이
 * 그대로여도 매번 새 배열이라서. 그래서 문자열 하나로 눌러 담고 effect 안에서 되푼다.
 *
 * IntersectionObserver 를 안 쓴다. 제목이 경계를 넘을 때만 깨어나는데, 마지막 절이
 * 짧으면 그 제목이 기준선까지 올라오기 전에 문서가 끝나서 영영 안 깨어난다.
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

      // 문서 끝에 닿았으면 마지막 절을 읽고 있는 것이다. 아래에 댓글이나 푸터가 없어서
      // 마지막 절이 기준선까지 못 올라오는데, 그대로 두면 클릭 말고는 도달할 수가 없다.
      const scrolled = window.scrollY + window.innerHeight;
      if (scrolled >= document.documentElement.scrollHeight - 2) {
        setActive(elements[elements.length - 1].id);
        return;
      }

      const line = window.innerHeight * READING_LINE;
      const passed = elements.filter((element) => element.getBoundingClientRect().top <= line);

      setActive((passed.at(-1) ?? elements[0]).id);
    };

    // 스크롤 한 번에 여러 이벤트가 몰아친다. 프레임당 한 번으로 묶어야 제목 수만큼의
    // 레이아웃 읽기가 프레임마다 반복되지 않는다.
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
