import Component from "../../factory/Component.ts";
export namespace Factory {
  export interface Options {
    entry: string;
    root: string;
    vue?: string;
    terminal?: boolean;
  }
  export interface AppStorage {
    [key: string]: Component;
  }
  export interface Storage {
    root: Component;
    app: AppStorage;
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
  export interface Tags {
    template: ast;
    script: ast;
    styles: ast[];
  }

  export interface ParCom {
    (storage: Factory.Storage, queue: Factory.Queue): Promise<void>;
  }
 

  interface postParser {
    template?: string;
    script?: string;
    middlecode?: string | null;
    styles?: string;
    instance?: string;
  }

  export type ParsedData = postParser;
}

export namespace Prs {
  export interface gen {
    (curr: Component): void;
  }
  export interface scrpt {
    (
      curr: Component,
      storage: Factory.Storage,
      queue: Factory.Queue,
    ): void;
  }

  export interface str {
    (curr: Component, storage: Factory.Storage): string;
  }

  export interface rS {
    (data: string[], tsCheck: boolean, path: string): Promise<string>;
  }

  export interface mCR {
    (curr: Component, script: string): Promise<string>;
  }

  export interface cD {
    (
      curr: Component,
      arr: string[],
      storage: Factory.Storage,
      queue: Factory.Queue,
    ): void;
  }
}
