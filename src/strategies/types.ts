/** types/interfaces for vno-parser.ts
 * 
 * component: for data collection for single file components
 * filePath: for finding absolute path to directories
 * parseTools: for vno methods and parsing data
 * traverse: for iteration function
 */
export interface component {
  label: string;
  path: string;
  name?: string;
  template?: string;
  script?: string;
  style?: string;
  instance?: any;
}

interface filePath {
  (relativePath: string): string;
}
interface parseTools {
  (data: string, obj: component): void;
}

interface buildTools {
  (obj: component): any;
}

export interface vno {
  locate: filePath;
  template: parseTools;
  script: parseTools;
  style: parseTools;
  imports: parseTools;
  instance: buildTools;
  mount: buildTools;
  build: parseTools;
  parse: buildTools;
}
