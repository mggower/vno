import { Cmpt, Util } from "../dts/factory.d.ts";

const memoize = function () {
  const cache = {} as Cmpt.Container;

  const memo: Util.MEMO = (label, current, storage) => {
    if (!storage) {
      throw new Error("storage input is required");
    }

    if (cache[label]) {
      scrub(label, cache[label]);
    } else {
      scrub(label, storage.root);
    }

    cache[label] = current;
  };

  return memo;
}

const scrub: Util.MEMO = function (label, component) {
  if (component.dependants) {
    component.dependants.scrub(label);

    if (component.dependants.head) {
      scrub(label, component.dependants.head);
    }
  }
  if (component.sibling) {
    scrub(label, component.sibling);
  }
};

export const preorderScrub = memoize();
