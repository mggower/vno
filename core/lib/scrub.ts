import { Component, ComponentContainer, Storage } from "../dts/factory.d.ts";

function memoize() {
  const cache = {} as ComponentContainer;

  return function (label: string, current: Component, storage: Storage): void {
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
}

function scrub(label: string, component: Component): void {
  if (component.dependants) {
    component.dependants.remove(label);

    if (component.dependants.head) {
      scrub(label, component.dependants.head);
    }
  }
  if (component.sibling) {
    scrub(label, component.sibling);
  }
}

export const preorderScrub = memoize();
