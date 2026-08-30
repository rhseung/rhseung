import { ExternalLink } from '../../layout/external-link';

export function MdxLink({ href, children }: MdxLink.Props) {
  if (href !== undefined && /^https?:\/\//.test(href)) {
    return <ExternalLink href={href}>{children}</ExternalLink>;
  }

  return <a href={href}>{children}</a>;
}

export declare namespace MdxLink {
  export type Props = {
    href?: string;
    children: React.ReactNode;
  };
}
