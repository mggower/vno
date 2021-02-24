import { Cmpt, Util } from "../dts/factory.d.ts";

const memoize = function () {
  const cache = {} as Cmpt.Container;

  const memo: Util.MEMO = (label, current, storage) => {
    if (!storage) {
      throw new Error("storage input is required");
    }

    if (cache[label]) {
      scrubSearch(label, cache[label]);
    } else {
      scrubSearch(label, storage.root);
    }

    cache[label] = current;
  };

  return memo;
}

const scrubSearch: Util.MEMO = function (label, component) {
  if (component.dependants) {
    component.dependants.scrub(label);

    if (component.dependants.head) {
      scrubSearch(label, component.dependants.head);
    }
  }
  if (component.sibling) {
    scrubSearch(label, component.sibling);
  }
};

export const preorderScrub = memoize();
