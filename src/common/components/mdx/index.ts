export { Callout } from './callout';
export { Figure } from './figure';

import { Callout } from './callout';
import { Figure } from './figure';

/**
 * `<Content components={MDX_COMPONENTS} />`로 넘긴다 — MDX 파일마다 import 를 쓰지
 * 않아도 되고, 컴포넌트를 옮겨도 본문을 안 고친다.
 */
export const MDX_COMPONENTS = { Callout, Figure };
