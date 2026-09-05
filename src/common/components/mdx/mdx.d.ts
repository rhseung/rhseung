import type { mdxComponents } from '.';

declare global {
  type MDXProvidedComponents = ReturnType<typeof mdxComponents>;
}
