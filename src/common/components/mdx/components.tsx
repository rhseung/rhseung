import { i18n, type Language } from '@/common/lib';

import { Callout } from './callout';
import { Detail } from './detail';
import { Figure } from './figure';
import { MdxHeading } from './heading';
import { MdxLink } from './link';
import { Shortcut } from './shortcut';
import { Stat, Stats } from './stat';
import { Step, Steps } from './steps';
import { MdxTable } from './table';

export function mdxComponents(lang: Language) {
  const t = i18n.getFixedT(lang, 'common');
  const permalinkLabel = t(($) => $.actions.permalink);

  const heading = (level: MdxHeading.Level) => (props: MdxHeading.SlotProps) => (
    <MdxHeading level={level} permalinkLabel={permalinkLabel} {...props} />
  );

  return {
    a: MdxLink,
    h1: heading(1),
    h2: heading(2),
    h3: heading(3),
    h4: heading(4),
    h5: heading(5),
    h6: heading(6),
    table: MdxTable,
    Callout,
    Detail,
    Figure,
    Shortcut,
    Stat,
    Stats,
    Step,
    Steps,
  };
}
