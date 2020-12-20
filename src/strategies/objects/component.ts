import { component } from "../../lib/types.ts";

function Component(this: component, label: string, path: string) {
  this.label = label;
  this.path = path;
  this.child = null;
  this.sibling = null;
}

export default Component;
