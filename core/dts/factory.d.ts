import FactoryClass from "../factory/Factory.ts";
import ComponentClass from "../factory/Component.ts";
import DepsListClass from "../factory/DepsList.ts";
import QueueClass from "../factory/Queue.ts";
import StorageClass from "../factory/Storage.ts";

export type Factory = FactoryClass;
export type Component = ComponentClass;
export type DepsList = DepsListClass;
export type Queue = QueueClass;
export type Storage = StorageClass;

// Factory library
export declare namespace Fctry {
  // vno.config.json or Factory constructor options
  export interface Config {
    entry: string;
    root: string;
    vue?: Version;
    terminal?: boolean;
    server?: string;
    options?: {
      port?: number;
      title?: string;
      hostname?: string;
    };
  }
  export type Version = 2 | 3;
  export interface Vue {
    state: Version;
    dep: string;
    cdn: string;
    mount: string;
  }
}

// component library
export declare namespace Cmpt {
  export type List = Component[];

  export interface Container {
    [key: string]: Component;
  }

  export interface Source {
    descriptor: Descriptor;
    errors: [];
  }

  export interface Descriptor {
    filename: string;
    source: string;
    template: Tag;
    script: Tag;
    scriptSetup: unknown;
    styles: Tag[];
    customBlocks: [];
    cssVars: [];
  }

  export interface Tag {
    type: string;
    content: string;
    loc: {
      source: string;
      start: Record<string, unknown>;
      end: Record<string, unknown>;
    };
    lang?: string;
    ast?: Record<string, unknown>;
    attrs?: {
      load: unknown;
    };
    scoped?: boolean;
  }

  export interface RawData {
    template: Tag;
    styles: Tag[];
    script: Tag;
  }

  export interface Parser {
    (src: Component, storage?: Storage, queue?: Queue): void;
  }
}

export declare namespace Util {
  export interface CreateInputs {
    title: string;
    root: string;
    components: string[];
    port: number;
  }

  export type TRIM = (
    input: string | string[],
    indexStart: number,
    indexEnd: number,
  ) => string[] | string;
  export type TXT = (text: string) => string;
  export type IOF = (exp: RegExp, arr: string[]) => number;
  export type MEMO = (id: string, ref: Component, box?: Storage) => void;
  export type TSC = (s: string, p: string, cut?: boolean) => Promise<string>;
  export type SCF = (content: Cmpt.Descriptor, errors?: string[]) => void;
}

export declare namespace Resolve {
  export interface Attrs {
    (
      curr: Component,
      ref: string | string[],
      storage?: Storage,
      queue?: Queue,
    ): Promise<string> | void;
  }

  export interface Source {
    (
      src: string | string[],
      path: string,
      ref: string | boolean,
    ): Promise<string>;
  }
}
