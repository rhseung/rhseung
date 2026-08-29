import type { MDX_COMPONENTS } from '.';

declare global {
  type MDXProvidedComponents = typeof MDX_COMPONENTS;
}
