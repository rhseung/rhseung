const PAIR_STYLE_ID = 'vt-pair';

type Relation = 'deeper' | 'shallower' | 'sibling';

function segments(pathname: string) {
  return pathname.split('/').filter(Boolean);
}

function relate(from: string, to: string): [Relation, string | undefined] {
  const a = segments(from);
  const b = segments(to);

  if (b.length === a.length + 1 && a.every((s, i) => s === b[i])) return ['deeper', b.at(-1)];
  if (a.length === b.length + 1 && b.every((s, i) => s === a[i])) return ['shallower', a.at(-1)];

  return ['sibling', undefined];
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
  let relation: Relation | undefined;

  document.addEventListener('astro:before-preparation', (event) => {
    pairing = undefined;
    relation = undefined;

    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      [relation, pairing] = relate(event.from.pathname, event.to.pathname);
    }

    pair(pairing);
  });

  document.addEventListener('astro:after-swap', () => {
    if (relation !== undefined) document.documentElement.dataset.vt = relation;
    pair(pairing);
  });
}
