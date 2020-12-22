export interface InitializeInterface {
  root: ComponentInterface | null;
  config(options: OptionsInterface): void;
  walk(entry: string, rootLabel: string): Promise<boolean>;
}

export interface RendererInterface {
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
  vue: string;
  parse(): any;
}

export interface ComponentInterface {
  label: string;
  path: string | URL;
  child: SiblingInterface | null;
  sibling: ComponentInterface | null;
  isRoot: boolean;
  split?: string[] | null;
  data?: string | null;
  runData(): Promise<true | undefined>;
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
