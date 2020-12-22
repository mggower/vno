export interface InitializeInterface {
  root: ComponentInterface | null;
  config(options: OptionsInterface): void;
  walk(entry: string, rootLabel: string): boolean;
}

export interface RendererInterface {
  defaults: HtmlInterface;
  html: string;
}

export interface CompilerInterface {
  root: ComponentInterface;
  mount: string;
  vue: string;
  build(): void;
  write(current: ComponentInterface): void;
  traverse(current: ComponentInterface): void;
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
  isRoot: boolean;
  split?: string[];
  data?: string;
  runData(): boolean;
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
  add(component: ComponentInterface): void;
}

export interface StorageInterface {
  [key: string]: ComponentInterface;
}

export interface OptionsInterface {
  entry: string;
  root: string;
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
