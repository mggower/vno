import renderer from "./renderer.ts";
// import { component } from "./types.ts";

export interface component {
  label: string;
  path: string | URL;
  child: component | null;
  sibling: component | null;
  split?: string[];
  imports?: string[];
  name?: string;
  template?: string;
  script?: string;
  style?: string;
  instance?: any;
}
interface cache {
  root: component;
}

function Cache(this: cache, root: component) {
  this.root = root;
}

function Component(this: component, label: string, path: string) {
  this.label = label;
  this.path = path;
  this.child = null;
  this.sibling = null;
}
/* storage <-- populated via walk with "label" as property names with a new
component w/ (label, path) as values */
const storage = {
  App: new (Component as any)("App", "./App.vue"),
  Green: new (Component as any)("Green", "./components/Green.vue"),
  Purple: new (Component as any)("Purple", "./components/Purple.vue"),
  Orange: new (Component as any)("Orange", "./components/Orange.vue"),
};

const komponents: string[] = ["Green", "Purple", "Orange"];
// "Green"

Component.prototype.add = function (sibling: component) {
};

function BobTheBuilder(parent: component) {
  // this = App
  let index = komponents.pop(); // <-- currently "Orange"
  const child = storage[index]; // <-- storage['Orange'] = component {}

  parent.child = child;

  while (komponents.length) {
    const current = komponents.pop();
    parent.child.sibling = current;
    // const current = storage[komponents.pop()]
  }
}

// BobTheBuilder(storage.App)
/**
 * parser will contain the components of the tree:: cache will be the tree
 *
 * this.root = App;
 * App.child = Green;
 * Green.sibling = Purple
 * Purple.sibling = Orange
 * 
 * queue = [ Green, Purple, Orange ]
*/
