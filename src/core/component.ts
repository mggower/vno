import { Component, Composite, Primitive, Root } from "../lib/newtypes.ts";
import SiblingList from "./sibling_list.ts";

export function createComponent(label: string, path: string): Primitive {
  const sourceRaw = Deno.readTextFileSync(path);
  const split = sourceRaw.split(/\n/);

  return {
    label,
    path,
    sourceRaw,
    split,
    type: "primitive",
    stage: "init",
    name: null,
    sibling: null,
    template: null,
    script: null,
    middlecode: null,
    style: null,
    instance: null,
    child: null,
    vue: null,
    isRoot: false,
    isParsed: false,
  };
}

export function saveAsRoot(component: Component, vue: string): Root {
  return {
    ...component,
    vue,
    isRoot: true
  };
}

export function saveAsParent(component: Component): Composite {
  return {
    ...component,
    type: "composite",
    child: new SiblingList(),
  };
}