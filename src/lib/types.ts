export interface InitializeInterface {
  config(options: OptionsInterface): Function;
  walk(entry: string, rootLabel: string): true;
}

export interface ParserInterface {
  parse(): Function;
}

export interface CompilerInterface {
  mount: string;
  vue: string;
}

export interface RendererInterface {
  html: string;
}

export interface ComponentInterface {
  label: string;
  path: string | URL;
  child: SiblingInterface | null;
  sibling: ComponentInterface | null;
  isRoot: boolean;
  isParsed: boolean;
  runData(): boolean;
  vue?: string;
  split?: string[];
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
  scrub(label: string): boolean;
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
export interface UtilityInterface {
  indexOfRegExp(regex: RegExp, array: any[]): number;
  sliceAndTrim(
    array: any[],
    start: number,
    end: number,
    regex?: RegExp,
    replaced?: string,
  ): string;
  trimAndSplit(
    str: string,
    start: number,
    end: number,
    split?: string,
    regex?: RegExp,
    replaced?: string,
  ): string[];
  preorderScrub: Function;
  print(): true;
}
