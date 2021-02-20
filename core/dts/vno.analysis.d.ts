export interface Tag {
  type: string;
  content: string;
  loc: {
    source: string;
    start: Record<string, unknown>
    end: Record<string, unknown>
  };
  lang?: string;
  ast?: Record<string, unknown>
  attrs?: {
    load: unknown;
  };
  scoped?: boolean;
}

export interface Desc {
  filename: string;
  source: string;
  template: Tag;
  script: Tag;
  scriptSetup: unknown;
  styles: Tag[];
  customBlocks: [];
  cssVars: [];
}

export interface Src {
  descriptor: Desc;
  errors: [];
}
