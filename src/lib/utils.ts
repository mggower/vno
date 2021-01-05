import {
  ComponentInterface,
  StorageInterface,
  UtilityInterface,
} from "../lib/types.ts";

// #region memoize
// memoize is used to cache child components that 
// have already been "scrubbed" in preorderScrub
// #endregion
export function memoize() {
  // #region memoize cache
  // cache stores the label of the component that was "scrubbed"
  // and it's value is the "current" or parent component that
  // it was last attached to.
  // #endregion
  const cache: StorageInterface = {};
  // #region "scrubbed" conditions
  // if the 'label' argument is located in the cache, invoke  
  // scrub with the last parent component, and the label as 
  // arguments; otherwise, invoke scrub from the root
  // #endregion
  return (label: string, current: ComponentInterface) => {
    if (cache[label]) {
      scrub(cache[label], label);
    } else {
      scrub(Storage.root, label);
    }
    cache[label] = current;
  };
}
// scrub mimics a preorder tree traversal
function scrub(component: ComponentInterface, label: string) {
  if (component.child) component.child.scrub(label);
  if (component.child?.head) scrub(component.child.head, label);
  if (component.sibling) scrub(component.sibling, label);
}
// the Queue is used to sequence child components to be parsed
export const Queue: ComponentInterface[] = [];
// the Storage holds a reference to all components
export const Storage: StorageInterface = {};

// global utility functions
const utils: UtilityInterface = {
  // #region preorderScrub 
  // traverses the component tree, and repositions components to a 
  // higher place in the tree to secure the component hierarchy
  // #endregion
  preorderScrub: memoize(),

  // prompt is used in the command line to write i/o to users
  async prompt(msg: string = "") {
    const buf = new Uint8Array(1024);
    await Deno.stdout.write(new TextEncoder().encode(`${msg}: `));
    const n = <number> await Deno.stdin.read(buf);
    return new TextDecoder().decode(buf.subarray(0, n)).trim();
  },
  
  // indexOfRegExp accepts a regex and an array and returns a number;
  indexOfRegExp(regex: RegExp, array: any[]) {
    return array.findIndex((element) => regex.test(element));
  },

  // #region sliceAndTrim
  // sliceAndTrim accepts an array, start index(inclusive), end index(exclusive)
  // optional regular expression to replace with optional string
  // slices an array, joins it as a string, and then replaces characters
  // the default behavior is to remove unnecessary whitespace from strings
  // #endregion
  sliceAndTrim(
    array: any[],
    start: number,
    end: number,
    regex: RegExp = /(\s{2,})/g,
    replaced: string = " ",
  ) {
    return array.slice(start, end).join("").replace(regex, replaced);
  },
  
  // #region trimAndSplit
  // accepts a string, a start index(inclusive), an end index(exclusive)
  // optional: char to split at, regex char and string
  // default behavior is to slice a string, split it into an array
  // and remove all white space
  // #endregion
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
};

export default utils;
