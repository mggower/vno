/** types/interfaces for vno-parser.ts
 * 
 * component: for data collection for single file components
 * filePath: for finding absolute path to directories
 * parseTools: for vno methods and parsing data
 * traverse: for iteration function
 */
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
interface add {
  (descendent: component): void;
}
export interface sibling {
  head: component | null;
  tail: component | null;
  add: add;
}

interface filePath {
  (relativePath: string): string;
}
interface buildTools {
  (obj: component): any;
}

export interface vno {
  root: any;
  queue: any[];
  cache: object;
  vue: string;
  locate: filePath;
  template: buildTools;
  script: buildTools;
  style: buildTools;
  imports: buildTools;
  instance: buildTools;
  mount: buildTools;
  build: buildTools;
  parse: buildTools;
}

export interface ssr {
  root: component | null;
  children: object[];
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

/**
 * 
 * new Component(label, path);
  label: string;
  path*: string | URL;
  child: component 
  sibling: componenent **linked list**
  split?: string[];
  imports?: string[];
  name?: string;
  template?: string;
  script?: string;
  style?: string;
  instance?: any;
 */
