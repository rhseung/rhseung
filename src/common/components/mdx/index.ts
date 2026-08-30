import { Callout } from './callout';
import { Detail } from './detail';
import { Figure } from './figure';
import { MdxH2, MdxH3, MdxH4 } from './heading';
import { MdxLink } from './link';
import { Shortcut } from './shortcut';
import { Stat, Stats } from './stat';
import { Step, Steps } from './steps';

export { Callout } from './callout';
export { Detail } from './detail';
export { Figure } from './figure';
export { MdxHeading, MdxH2, MdxH3, MdxH4 } from './heading';
export { MdxLink } from './link';
export { Shortcut } from './shortcut';
export { Stat, Stats } from './stat';
export { Step, Steps } from './steps';

export const MDX_COMPONENTS = {
  a: MdxLink,
  h2: MdxH2,
  h3: MdxH3,
  h4: MdxH4,
  Callout,
  Detail,
  Figure,
  Shortcut,
  Stat,
  Stats,
  Step,
  Steps,
};
