import { StyleInterface } from "./types.ts";

// // #region initialize.ts
export interface Options {
  entry: string;
  root: string;
  vue?: string;
  terminal?: boolean;
}

export interface Component {
  type: "composite" | "primitive";
  stage: "init" | "template" | "script" | "styles" | "parsed";
  
  isRoot: boolean;
  label: string;
  path: string;
  name: string | null;
  vue: string | null;
  sourceRaw: string;
  split: string[];
  child: SibList | null;
  sibling: Component | null;
  template: string | null;
  script: string | null;
  middlecode: string | null;
  style: string | null;
  instance: string | null;
  isParsed: boolean;
  saveAsRoot(vue: string): void;
  saveAsParent(): void;
  parseComponent(storage: Storage, queue: Component[]): void;
  parseTemplate(ast:any): void;
  parseScript(analysis: any, storage: Storage,queue: Component[]): void;
  attachChildren(children: string[], storage: Storage, queue: Component[]): void;
  parseStyle(styles: any): void;
  componentStringify(): void;
  setComponentName(data: string[]): void;
  resolveScript(data: string[], tsCheck: boolean): void;
  
}


export interface Composite extends Component{
  type: "composite";
  child: SibList;
}

export interface Primitive extends Component {
  type: "primitive";
  child: null;
  vue: null;
  isRoot: false;
}

export interface Root extends Component {
  isRoot: true;
  vue: string;
}

export interface Parsed extends Component {
  isParsed: true;
  name: string;
  template: string;
  script: string;
  style: string;
  instance: string;
}

export interface Storage {
  [key: string]: Component;
  root: Component;
}

export interface ParsedApp {
  [key: string]: Parsed;
  root: Parsed;
}
export interface SibList {
  head: Component | null;
  tail: Component | null;
  add(component: Component): void;
  scrub(label: string): boolean;
}

// export interface InitializeInterface {
//   config(options: OptionsInterface): Promise<any>;
//   walk(entry: string, rootLabel: string): Promise<void>;
// }
// // #endregion

// // #region parser.ts
// export interface ParserInterface {
//   parse(): Promise<void>;
// }
// // #endregion

// // #region compiler.ts
// export interface CompilerInterface {
//   mount: string;
//   vue: string;
//   build(): void;
//   write(current: ComponentInterface): void;
//   traverse(current: ComponentInterface): void;
// }
// // #endregion

// // // #region component.ts
// // export interface ComponentInterface {
// //   label: string;
// //   path: string | URL;
// //   isParsed: boolean;
// //   child: SiblingInterface | null;
// //   sibling: ComponentInterface | null;
// //   data: any;
// //   sourceRaw: string;
// //   vue: string;
// //   isRoot: boolean;
// //   runData(): void;
// //   split?: string[];
// //   name?: string;
// //   template?: string;
// //   script?: string;
// //   style?: string;
// //   instance?: string;
// //   middlecode?: string;
// // }


// // #endregion

// // #region sibling.ts
// export interface SiblingInterface {
//   head: ComponentInterface | null;
//   tail: ComponentInterface | null;
//   add(component: ComponentInterface): void;
//   scrub(label: string): boolean;
// }
// // export type Component = Pick<ComponentInterface | RootInterface>
// // #endregion

// // #region utils.ts

// export interface UtilityInterface {
//   prompt(msg: string): Promise<string>;
//   indexOfRegExp(regex: RegExp, array: any[]): number;
//   sliceAndTrim(
//     array: any[],
//     start: number,
//     end: number,
//     regex?: RegExp,
//     replaced?: string,
//   ): string;
//   trimAndSplit(
//     str: string,
//     start: number,
//     end: number,
//     split?: string,
//     regex?: RegExp,
//     replaced?: string,
//   ): string[];
//   preorderScrub: Function;
//   multilineCommentPattern: string | RegExp;
//   htmlCommentPattern: string | RegExp;
//   importPattern: RegExp;
//   urlPattern: RegExp;
// }
// // #endregion

// // #region renderer.ts
// export interface RendererInterface {
//   html: string;
//   createRenderer(options: HtmlInterface, route: ComponentInterface): string;
//   htmlStringify(options: HtmlInterface, route?: ComponentInterface): string;
// }
// export interface HtmlInterface {
//   language: string;
//   title: string;
//   root: string;
//   vue: string;
//   link: any;
//   script: any;
//   meta: MetaInterface;
//   build: BuildInterface;
// }
// interface BuildInterface {
//   bundle: string;
//   style: string;
// }
// interface MetaInterface {
//   charset: string;
//   httpEquiv: string[];
//   viewport: string;
// }
// // #endregion

// // #region command-line
// export interface terminalOptions {
//   title: string;
//   root: string;
//   child: string;
//   port: string;
// }
// // #endregion

// // #region renderer.ts
// export interface RendererInterface {
//   html: string;
//   createRenderer(): string;
//   htmlStringify(): string;
// }
// export interface HtmlInterface {
//   language: string;
//   title: string;
//   root: string;
//   vue: string;
//   link: any;
//   script: any;
//   meta: MetaInterface;
//   build: BuildInterface;
// }
// interface BuildInterface {
//   bundle: string;
//   style: string;
// }
// interface MetaInterface {
//   charset: string;
//   httpEquiv: string[];
//   viewport: string;
// }
// // #endregion

// // #region info.ts
// interface terminalActions {
//   [key: string]: any;
//   action: string;
//   cmd: string[];
//   about: string;
// }
// export interface infoInterface {
//   version: string;
//   description: string;
//   docs: string;
//   module: string;
//   commands: terminalActions[];
//   options: terminalActions[];
// }
// // #endregion
