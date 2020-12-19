import renderer from './renderer.ts'
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

function Cache (this: cache, root: component) {
  this.root = root;
}

function Component (this: component, label: string, path: string) {
  this.label = label;
  this.path = path;
  this.child = null;
  this.sibling = null;
}
const App = new (Component as any)("App", './App.vue');
const Green = new (Component as any)("Green", './components/Green.vue');
const Purple = new (Component as any)("Purple", './components/Purple.vue');
const Orange = new (Component as any)("Orange", './components/Orange.vue');

let const = {
  components: {
    Green,
    Purple,
    Orange,
  }
}

/**
 * parser will contain the components of the tree:: cache will be the tree
 *
 *
*/