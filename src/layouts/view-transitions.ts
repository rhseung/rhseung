const PAIR_STYLE_ID = 'vt-pair';

export type Direction = 'forward' | 'back' | 'same';

function segments(pathname: string) {
  return pathname.split('/').filter(Boolean);
}

export function dockCurrent(root: ParentNode): number | undefined {
  const bar = root.querySelector<HTMLElement>('[data-vt-dock]');

  return bar?.dataset.dockCurrent === undefined ? undefined : Number(bar.dataset.dockCurrent);
}

export function dockTarget(element: Element | undefined): number | undefined {
  const index = element?.closest<HTMLElement>('[data-dock-index]')?.dataset.dockIndex;

  return index === undefined ? undefined : Number(index);
}

export function relate(
  from: string,
  to: string,
  origin?: number,
  target?: number,
): [Direction | undefined, string | undefined] {
  const fromParts = segments(from);
  const toParts = segments(to);

  if (toParts.length === fromParts.length + 1 && fromParts.every((s, i) => s === toParts[i])) {
    return ['forward', toParts.at(-1)];
  }

  if (fromParts.length === toParts.length + 1 && toParts.every((s, i) => s === fromParts[i])) {
    return ['back', fromParts.at(-1)];
  }

  if (origin === undefined || target === undefined) return [undefined, undefined];
  if (origin === target) return ['same', undefined];

  return [target < origin ? 'back' : 'forward', undefined];
}

function pair(slug: string | undefined) {
  const style =
    document.getElementById(PAIR_STYLE_ID) ??
    document.head.appendChild(document.createElement('style'));

  style.id = PAIR_STYLE_ID;
  style.textContent =
    slug === undefined
      ? ''
      : `html:not([data-theme-transition]) [data-vt-title="${CSS.escape(slug)}"]{view-transition-name:entry-title}`;
}

export function initViewTransitions() {
  let pairing: string | undefined;

  document.addEventListener('astro:before-preparation', (event) => {
    pairing = undefined;

    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const [direction, slug] = relate(
        event.from.pathname,
        event.to.pathname,
        dockCurrent(document),
        dockTarget(event.sourceElement),
      );

      if (direction !== undefined) event.direction = direction;
      pairing = slug;
    }

    pair(pairing);
  });

  document.addEventListener('astro:after-swap', () => pair(pairing));
}
