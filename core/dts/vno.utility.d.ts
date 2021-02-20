import { Component, Storage, Queue } from "./type.vno.d.ts";

export interface Pattern {
  [x: string]: RegExp;
}

export interface TsHelper {
  (s: string, p: string, cut?: boolean): Promise<string>;
}

export type IdxOf = (exp: RegExp, arr: string[]) => number;

export type Join = <Elem>(array: Elem[], idx1: number, idx2: number) => string;

export type Split = (str: string, idx1: number, idx2: number) => string[];

export type CompId = (id: string, ref: Component, box?: Storage) => void;

export interface ResolveAttrs {
  (
    curr: Component,
    ref: string | string[],
    storage?: Storage,
    queue?: Queue,
  ): Promise<string> | void;
}

export interface ResolveSrc {
  (
    src: string | string[],
    path: string,
    ref: string | boolean,
  ): Promise<string>;
}

export interface ParserMethod {
  (src: Component, storage?: Storage, queue?: Queue): void;
}
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
