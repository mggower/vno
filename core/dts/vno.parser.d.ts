import { Component, Storage, Queue } from './type.vno.d.ts';

export interface ParserMethod {
  (src: Component, storage?: Storage, queue?: Queue): void;
}

// export type str = (curr: Component, storage: Storage) => string;
// export type gen = (curr: Component) => void;
// export type scrpt = (
//   curr: Component,
//   storage: Storage,
//   queue: Queue,
// ) => void;

