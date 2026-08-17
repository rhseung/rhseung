import { Callout } from './callout';
import { Detail } from './detail';
import { Figure } from './figure';
import { Stat, Stats } from './stat';
import { Step, Steps } from './steps';

export { Callout } from './callout';
export { Detail } from './detail';
export { Figure } from './figure';
export { Stat, Stats } from './stat';
export { Step, Steps } from './steps';

/**
 * `<Content components={MDX_COMPONENTS} />`로 넘긴다 — MDX 파일마다 import 를 쓰지
 * 않아도 되고, 컴포넌트를 옮겨도 본문을 안 고친다.
 */
export const MDX_COMPONENTS = { Callout, Detail, Figure, Stat, Stats, Step, Steps };
