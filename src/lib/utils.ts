import {
  ComponentInterface,
  StorageInterface,
  UtilityInterface,
} from "../lib/types.ts";

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

  trimAndSplit(
    str: string,
    start: number,
    end: number,
    split: string = ",",
    regex: RegExp = /\s/g,
    replaced: string = "",
  ) {
    return str.slice(start, end).replace(regex, replaced).split(split);
  },

  toKebab(str: string) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  },

  preorderScrub(current: ComponentInterface, label: string) {
    if (current.child) current.child.scrub(label);
    if (current.child?.head) this.preorderScrub(current.child.head, label);
    if (current.sibling) this.preorderScrub(current.sibling, label);
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
