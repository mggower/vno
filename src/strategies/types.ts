/** types/interfaces for vno-parser.ts
 * 
 * component: for data collection for single file components
 * filePath: for finding absolute path to directories
 * parseTools: for vno methods and parsing data
 * traverse: for iteration function
 */
export interface component {
  label: string;
  path?: string | URL;
  split?: string[];
  imports?: string[];
  name?: string;
  template?: string;
  script?: string;
  style?: string;
  instance?: any;
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
  cdn: string;
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
}

export interface options {
  entry: string;
  label: string;
  cdn?: string;
  title?: string;
  style?: string;
  meta?: string[];
  name?: string;
  build?: string;
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