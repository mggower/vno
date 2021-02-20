import cmpnt from "../factory/Component.ts";

export type Component = cmpnt;
export interface Storage {
  root: Component;
  app: container;
  vue: string;
  setRoot(component: Component): void;
  setVue(vue: string | undefined): void;
}
export interface Queue {
  components: Component[];
  length: number;
  enqueue(component: Component): void;
  dequeue(): Component | undefined;
  isFilled(): boolean;
}
export interface DepsList {
  head: Component | null;
  tail: Component | null;
  add(component: Component): void;
  scrub(label: string): boolean;
}

export interface Options {
  entry: string;
  root: string;
  vue?: string;
  terminal?: boolean;
}
export interface container {
  [key: string]: Component;
}

export enum EnType {
  Primitive = "PRIMITIVE",
  Composite = "COMPOSITE",
}

export enum EnPhase {
  Constructor = "CONSTRUCTOR",
  Template = "TEMPLATE",
  Script = "SCRIPT",
  Style = "STYLE",
  Complete = "COMPLETE",
}
export interface split {
  template: tag;
  styles: tag[];
  script: tag;
}

export interface tag {
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

export interface desc {
  filename: string;
  source: string;
  template: tag;
  script: tag;
  scriptSetup: unknown;
  styles: tag[];
  customBlocks: [];
  cssVars: [];
}

export interface src {
  descriptor: desc;
  errors: [];
}


export type prsComp = (
  storage: Storage,
  queue: Queue,
) => Promise<void>;

export interface parsedData {
  template?: string;
  script?: string;
  middlecode?: string | null;
  styles?: string;
  instance?: string;
}

export type str = (curr: Component, storage: Storage) => string;
export type gen = (curr: Component) => void;
export type scrpt = (
  curr: Component,
  storage: Storage,
  queue: Queue,
) => void;

export type mid = (curr: Component, script: string) => Promise<string>;
export type imp = (
  source: string,
  path: string,
  script: string,
) => Promise<string>;
export type scr = (
  data: string[],
  tsCheck: boolean,
  path: string,
) => Promise<string>;
export type dep = (
  curr: Component,
  arr: string[],
  storage: Storage,
  queue: Queue,
) => void;

export type iore = (regex: RegExp, array: string[]) => number;
export type sat = (
  array: string[],
  start: number,
  end: number,
  regex?: RegExp,
  replaced?: string,
) => string;
export type tc = (
  source: string,
  path: string,
  cut?: boolean,
) => Promise<string>;
export type tas = (
  str: string,
  start: number,
  end: number,
  split?: string,
  regex?: RegExp,
  replaced?: string,
) => string[];
