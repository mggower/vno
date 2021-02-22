import { Component } from "./factory.d.ts";
import { VueCDN } from '../lib/constants.ts';
import { Tag } from "./type.vno.d.ts";


export interface RawData {
  template: Tag;
  styles: Tag[];
  script: Tag;
}
interface StrObj {
  [x: string]: string;
}


interface ConfigRequired {
  entry: string;
  root: string;
}

interface ConfigExtension {
  vue?: VueCDN | number;
  terminal?: boolean;
  server?: string;
}
interface ConfigOptions {
  child?: string;
  port?: number;
  title?: string;
  hostname?: string;
}


export interface Options extends ConfigRequired, ConfigExtension {
  options?: ConfigOptions;
}
