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
import { VueCDN } from '../lib/constants.ts';
export interface ComponentContainer {
  [key: string]: Component;
}
export interface RawData {
  template: Tag;
  styles: Tag[];
  script: Tag;
}
interface StrObj {
  [x: string]: string;
}

export type ParsedData = Record<string, unknown> | StrObj;

interface ConfigRequired {
  entry: string;
  root: string;
}

interface ConfigExtension {
  vue?: VueCDN | number;
  terminal?: boolean;
}
interface ConfigOptions {
  child?: string;
  port?: number;
  title?: string;
}


export interface Options extends ConfigRequired, ConfigExtension {
  options?: ConfigOptions;
}
