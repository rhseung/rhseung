type Relation = 'deeper' | 'shallower' | 'sibling';

function segments(pathname: string) {
  return pathname.split('/').filter(Boolean);
}

function relate(from: string, to: string): Relation {
  const a = segments(from);
  const b = segments(to);

  if (b.length === a.length + 1 && a.every((s, i) => s === b[i])) return 'deeper';
  if (a.length === b.length + 1 && b.every((s, i) => s === a[i])) return 'shallower';

  return 'sibling';
}

export function initViewTransitions() {
  let relation: Relation | undefined;

  document.addEventListener('astro:before-preparation', (event) => {
    relation = matchMedia('(prefers-reduced-motion: reduce)').matches
      ? undefined
      : relate(event.from.pathname, event.to.pathname);
  });

  document.addEventListener('astro:after-swap', () => {
    if (relation !== undefined) document.documentElement.dataset.vt = relation;
  });
}
