import { Component, Storage, Queue } from './type.vno.d.ts';

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
