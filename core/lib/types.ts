import cmpnt from "../factory/Component.ts";

export type Component = cmpnt;
export interface Storage {
  root: Component;
  app: container;
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

export interface Options {
  entry: string;
  root: string;
  vue?: string;
  terminal?: boolean;
}
export interface container {
  [key: string]: Component;
}

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
export interface split {
  template: tag;
  styles: tag[];
  script: tag;
}

export interface tag {
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

export interface desc {
  filename: string;
  source: string;
  template: tag;
  script: tag;
  scriptSetup: unknown;
  styles: tag[];
  customBlocks: [];
  cssVars: [];
}

export interface src {
  descriptor: desc;
  errors: [];
}


export type prsComp = (
  storage: Storage,
  queue: Queue,
) => Promise<void>;

export interface parsedData {
  template?: string;
  script?: string;
  middlecode?: string | null;
  styles?: string;
  instance?: string;
}

