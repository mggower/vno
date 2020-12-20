export interface config {
  root: component | null;
  storage: storage;
}
export interface component {
  label: string;
  path: string | URL;
  child: sibling | null;
  sibling: component | null;
  split?: string[];
  imports?: string[];
  name?: string;
  template?: string;
  script?: string;
  style?: string;
  instance?: any;
}
export interface sibling {
  head: component | null;
  tail: component | null;
  add(): void;
}

export interface builder {
  cache: component;
}

export interface storage {
  [key: string]: component;
}

export interface cache {
  root: component | null;
}

export interface parser {
  root: any;
  queue: any[];
  cache: object;
  vue: string;
  locate(): string;
  template(): any;
  script(): any;
  style(): any;
  imports(): any;
  instance(): any;
  mount(): any;
  build(): any;
  parse(): any;
}

export interface ssr {
  defaults: html;
  html: string;
}

export interface options {
  entry: string;
  label: string;
  vue?: string;
}

export interface html {
  language: string;
  title: string;
  root: string;
  vue: string;
  link: any;
  script: any;
  meta: meta;
  build: build;
}

interface meta {
  charset: string;
  httpEquiv: string[];
  viewport: string;
}

interface build {
  bundle: string;
  style: string;
}
