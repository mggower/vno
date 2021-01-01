import {
  ComponentInterface,
  StorageInterface,
  UtilityInterface,
} from "../lib/types.ts";

export const Queue: ComponentInterface[] = [];

export const Storage: StorageInterface = {};

export const Root: ComponentInterface[] = [];

const Utils: UtilityInterface = {
  indexOfRegExp(regex: RegExp, array: any[]) {
    return array.findIndex((element) => regex.test(element));
  },

  sliceAndTrim(
    array: any[],
    start: number,
    end: number,
    regex: RegExp = /(\s{2,})/g,
    replaced: string = " ",
  ) {
    return array.slice(start, end).join("").replace(regex, replaced);
  },

  toKebab(str: string) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  },

  print() {
    console.log(` 
  __   ___ __   ___  
  \\ \\ / / '_ \\ / _ \\ 
   \\ V /| | | | (_) |
    \\_/ |_| |_|\\___/         

  `);

    return true;
  },
};

export default Utils;
