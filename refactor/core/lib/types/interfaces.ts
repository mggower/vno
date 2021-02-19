import cmpnt from "../../factory/Component.ts";

export namespace App {
  export type Component = cmpnt;
  export interface Storage {
    root: Component;
    app: Fctry.store.container;
    vue: string;
    setRoot: Fctry.store.set_root;
    setVue: Fctry.store.set_vue;
  }
  export interface Queue {
    components: Component[];
    length: number;
    enqueue: Fctry.que.enqueue;
    dequeue: Fctry.que.dequeue;
    isFilled: Fctry.que.is_filled;
  }
  export interface DepsList {
    head: Component | null;
    tail: Component | null;
    add: Fctry.deps.add;
    scrub: Fctry.deps.scrub;
  }
}
export namespace Fctry {
  export interface Options {
    entry: string;
    root: string;
    vue?: string;
    terminal?: boolean;
  }
  export namespace store {
    export interface container {
      [key: string]: App.Component;
    }
    export type set_root = (component: App.Component) => void;
    export type set_vue = (vue: string | undefined) => void;
  }
  export namespace que {
    export type enqueue = (component: App.Component) => void;
    export type dequeue = () => App.Component | undefined;
    export type is_filled = () => boolean;
  }

  export namespace deps {
    export type add = (component: App.Component) => void;
    export type scrub = (label: string) => boolean;
  }
}

export namespace Cmpnt {
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
  interface ast {
    type: string;
    content: string;
    loc?: object;
    lang?: string;
    attrs?: {
      load: any;
    };
    scoped?: boolean;
  }
  export interface tags {
    template: ast;
    script: ast;
    styles: ast[];
  }

  export type prs_comp = (
    storage: App.Storage,
    queue: App.Queue,
  ) => Promise<void>;

  interface parsed_data {
    template?: string;
    script?: string;
    middlecode?: string | null;
    styles?: string;
    instance?: string;
  }

  export type ParsedData = parsed_data;
}

export namespace Prs {
  export type str = (curr: App.Component, storage: App.Storage) => string;
  export type gen = (curr: App.Component) => void;
  export type scrpt = (
    curr: App.Component,
    storage: App.Storage,
    queue: App.Queue,
  ) => void;
}

export namespace Rslvr {
  export type imp = (
    source: string,
    path: string,
    script: string,
  ) => Promise<string>;
  export type mid = (curr: App.Component, script: string) => Promise<string>;
  export type scr = (
    data: string[],
    tsCheck: boolean,
    path: string,
  ) => Promise<string>;
  export type dep = (
    curr: App.Component,
    arr: string[],
    storage: App.Storage,
    queue: App.Queue,
  ) => void;
}

export namespace Uti {
  export type iore = (regex: RegExp, array: any[]) => number;
  export type sat = (
    array: any[],
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
}
