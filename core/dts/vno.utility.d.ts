import { Component, Storage } from "./type.vno.d.ts";

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
