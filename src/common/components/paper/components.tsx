import type { Language } from '@/common/lib';

import { mdxComponents } from '../mdx';
import { PaperHeading } from './heading';
import { PaperParagraph } from './paragraph';

export function paperComponents(lang: Language) {
  const heading = (level: PaperHeading.Level) => (props: PaperHeading.SlotProps) => (
    <PaperHeading level={level} {...props} />
  );

  return {
    ...mdxComponents(lang),
    h1: heading(1),
    h2: heading(2),
    h3: heading(3),
    h4: heading(4),
    h5: heading(5),
    h6: heading(6),
    p: PaperParagraph,
  };
}
