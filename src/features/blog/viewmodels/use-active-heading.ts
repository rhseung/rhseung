import { useEffect, useState } from 'react';

/** 화면 위에서 이 지점을 지난 마지막 제목이 "지금 읽는 곳"이다. */
const READING_LINE = 0.24;

/**
 * `slugs` 를 배열째로 의존성에 걸면 부모가 리렌더할 때마다 옵저버를 다시 만든다 — 목록이
 * 그대로여도 매번 새 배열이라서. 그래서 문자열 하나로 눌러 담고 effect 안에서 되푼다.
 *
 * IntersectionObserver 의 `isIntersecting` 을 그대로 쓰지 않는 이유: 짧은 섹션이 화면에
 * 여럿 걸리면 그중 아무거나 활성이 돼서 목차가 위아래로 튄다. 옵저버는 "제목이 경계를
 * 넘었다"는 신호로만 쓰고, 활성 항목은 그때마다 실제 위치로 다시 고른다.
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

      const line = window.innerHeight * READING_LINE;
      const passed = elements.filter((element) => element.getBoundingClientRect().top <= line);

      setActive((passed.at(-1) ?? elements[0]).id);
    };

    update();

    const observer = new IntersectionObserver(update, {
      rootMargin: `-${READING_LINE * 100}% 0px 0px 0px`,
    });
    // `forEach` 로 감으면 react-doctor 의 `effect-needs-cleanup` 이 `observe` 를 콜백
    // 스코프 안에서만 보고 정리 안 된 구독으로 읽는다. 루프로 펴야 조용하다.
    for (const element of elements) observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [key]);

  return active;
}
