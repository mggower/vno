// #region initialize.ts
export interface OptionsInterface {
  entry: string;
  root: string;
  vue?: string;
  terminal?: boolean;
}
export interface InitializeInterface {
  config(options: OptionsInterface): Function;
  walk(entry: string, rootLabel: string): void;
}
// #endregion

// #region parser.ts
export interface ParserInterface {
  parse(): Function;
}
// #endregion

// #region compiler.ts
export interface CompilerInterface {
  mount: string;
  vue: string;
  build(): void;
  write(): void;
  traverse(): void;
}
// #endregion

// #region component.ts
export interface ComponentInterface {
  label: string;
  path: string | URL;
  isRoot: boolean;
  isParsed: boolean;
  child: SiblingInterface | null;
  sibling: ComponentInterface | null;
  runData(): void;
  vue?: string;
  split?: string[];
  name?: string;
  template?: string;
  script?: string;
  style?: string;
  instance?: string;
  middlecode?: string;
}
// #endregion

// #region sibling.ts
export interface SiblingInterface {
  head: ComponentInterface | null;
  tail: ComponentInterface | null;
  add(component: ComponentInterface): void;
  scrub(label: string): boolean;
}
// #endregion

// #region utils.ts
export interface StorageInterface {
  [key: string]: ComponentInterface;
}
export interface UtilityInterface {
  prompt(msg: string): Promise<string>;
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
  multilineCommentPattern: string | RegExp;
  htmlCommentPattern: string | RegExp;
  importPattern: RegExp;
}
// #endregion

// #region renderer.ts
export interface RendererInterface {
  html: string;
  createRenderer(): string;
  htmlStringify(): string;
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
interface BuildInterface {
  bundle: string;
  style: string;
}
interface MetaInterface {
  charset: string;
  httpEquiv: string[];
  viewport: string;
}
// #endregion

// #region command-line
export interface terminalOptions {
  title: string;
  root: string;
  child: string;
  port: string;
}
// #endregion

// #region renderer.ts
export interface RendererInterface {
  html: string;
  createRenderer(): string;
  htmlStringify(): string;
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
interface BuildInterface {
  bundle: string;
  style: string;
}
interface MetaInterface {
  charset: string;
  httpEquiv: string[];
  viewport: string;
}
// #endregion

// #region info.ts
interface terminalActions {
  [key: string]: any;
  action: string;
  cmd: string[];
  about: string;
}
export interface infoInterface {
  version: string;
  description: string;
  docs: string;
  module: string;
  commands: terminalActions[];
  options: terminalActions[];
}
// #endregion
