// citation-js 는 타입을 안 싣는다. 이 파일이 쓰는 표면만 좁게 적는다.
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
