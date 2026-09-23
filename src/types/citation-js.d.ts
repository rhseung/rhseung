declare module '@citation-js/core' {
  export type CiteFormat = { format?: string; template?: string; entry?: string[] };

  export class Cite {
    constructor(input: string);
    data: { id: string }[];
    format(type: 'citation' | 'bibliography' | 'bibtex', options?: CiteFormat): string;
  }
}

declare module '@citation-js/plugin-bibtex';
declare module '@citation-js/plugin-csl';
