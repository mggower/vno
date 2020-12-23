import { UtilityInterface, ComponentInterface, StorageInterface  } from "../lib/types.ts";

export const Queue: ComponentInterface[] = [];

export const Storage: StorageInterface = {};

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
