import ComponentClass from "../factory/Component.ts";
import StorageClass from "../factory/Storage.ts";
import QueueClass from "../factory/Queue.ts";
import DepsListClass from "../factory/DepsList.ts";

export type Component = ComponentClass;
export type ComponentList = Component[];

export type Storage = StorageClass;
export type Queue = QueueClass;
export type DepsList = DepsListClass;

import { Tag } from "./type.vno.d.ts";

export interface ComponentContainer {
  [key: string]: Component;
}

export enum ComponentType {
  Primitive = "PRIMITIVE",
  Composite = "COMPOSITE",
}

export interface RawData {
  template: Tag;
  styles: Tag[];
  script: Tag;
}
interface StrObj {
  [x:string]: string;
}

export type ParsedData = Record<string, unknown> | StrObj;

export interface Options {
  entry: string;
  root: string;
  vue?: string;
  terminal?: boolean;
}