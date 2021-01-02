import {
  ComponentInterface,
  StorageInterface,
  UtilityInterface,
} from "../lib/types.ts";

function memoize() {
  const cache: StorageInterface = {};
  return (label: string, current: ComponentInterface) => {
    if (cache[label]) {
      scrub(cache[label], label);
    } else {
      scrub(Storage.root, label);
    }
    cache[label] = current;
  };
}

function scrub(component: ComponentInterface, label: string) {
  if (component.child) component.child.scrub(label);
  if (component.child?.head) scrub(component.child.head, label);
  if (component.sibling) scrub(component.sibling, label);
}

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

  preorderScrub: memoize(),

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
