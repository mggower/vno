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
  cache: any[];
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
