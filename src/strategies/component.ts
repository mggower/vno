import { ComponentInterface } from "../lib/types.ts";

function Component(this: ComponentInterface, label: string, path: string) {
  this.label = label;
  this.path = path;
  this.child = null;
  this.sibling = null;
}

export default Component;
