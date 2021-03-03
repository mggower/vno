import {
  Component,
  ComponentContainer,
  Storage,
} from "../dts/factory.d.ts";

function memoize() {
  const cache = {} as ComponentContainer;

  return function (label: string, current: Component, storage: Storage): void {
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
}

function scrubSearch(label: string, component: Component): void {
  if (component.dependants) {
    component.dependants.scrub(label);

    if (component.dependants.head) {
      scrubSearch(label, component.dependants.head);
    }
  }
  if (component.sibling) {
    scrubSearch(label, component.sibling);
  }
}

export const preorderScrub = memoize();
