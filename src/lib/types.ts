export interface ConfigInterface {
  root: ComponentInterface | null;
}

export interface RendererInterface {
  defaults: HtmlInterface;
  html: string;
}

export interface BuilderInterface {
  root: ComponentInterface;
  cache: object;
}

export interface ParserInterface {
  root: any;
  queue: any[];
  cache: object;
  vue: string;
  template(): any;
  script(): any;
  style(): any;
  imports(): any;
  instance(): any;
  mount(): any;
  build(): any;
  parse(): any;
}

export interface ComponentInterface {
  label: string;
  path: string | URL;
  child: SiblingInterface | null;
  sibling: ComponentInterface | null;
  split?: string[];
  imports?: string[];
  name?: string;
  template?: string;
  script?: string;
  style?: string;
  instance?: any;
}
export interface SiblingInterface {
  head: ComponentInterface | null;
  tail: ComponentInterface | null;
  add(): void;
}

export interface StorageInterface {
  [key: string]: ComponentInterface;
}

export interface OptionsInterface {
  entry: string;
  label: string;
  vue?: string;
}

export interface HtmlInterface {
  language: string;
  title: string;
  root: string;
  vue: string;
  link: any;
  script: any;
  meta: MetaInterface;
  build: BuildInterface;
}

interface MetaInterface {
  charset: string;
  httpEquiv: string[];
  viewport: string;
}

interface BuildInterface {
  bundle: string;
  style: string;
}


