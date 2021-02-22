import { ComponentContainer, CompId } from '../dts/type.vno.d.ts';

const memoize = function () {
  const cache = {} as ComponentContainer;

  const memo: CompId = (label, current, storage) => {
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

const scrub: CompId = function (label, component) {
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
