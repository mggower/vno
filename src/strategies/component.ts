import renderer from "./renderer.ts";
// import { component } from "./types.ts";

export interface component {
  label: string;
  path: string | URL;
  child: sibling | null;
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

// interface storage {
//   App: component;
//   Green: component;
//   Purple: component;
//   Orange: component;
// }
// prettier-ignore
const Storage: any = {
  "App": new (Component as any)("App", "./App.vue"),
  "Green": new (Component as any)("Green", "./components/Green.vue"),
  "Purple": new (Component as any)("Purple", "./components/Purple.vue"),
  "Orange": new (Component as any)("Orange", "./components/Orange.vue"),
};

interface add {
  (descendent: component): void;
}
interface sibling {
  head: component | null;
  tail: component | null;
  add: add;
}

function SiblingList(this: sibling) {
  this.head = null;
  this.tail = null;
}

/**
 * if list has no current head, the initial descendent (child) passed into it
 * will become the head and tail. Otherwise, the tail's sibling (ie next) will become the
 * descendent and we reassign tail to the descendent
 */
SiblingList.prototype.add = function (descendent: component) {
  if (!this.head) {
    this.head = descendent;
    this.tail = descendent;
  } else {
    this.tail.sibling = descendent;
    this.tail = descendent;
  }
};
const komponents: any = ["Green", "Purple", "Orange"];
// "Green"

function listBuilder(parent: component) {
  // this = App
  parent.child = new (SiblingList as any)();
  while (komponents.length) {
    const str = komponents.pop(); // <-- currently "Orange"
    const descendent = Storage[str]; // <-- storage['Orange'] = component {}

    // console.log('descendent', descendent);
    parent.child?.add(descendent);
  }
  console.log("sibling list", parent.child);
}

const { App } = Storage;

listBuilder(App);

// const current = komponents.pop();
// parent.child.sibling = current;
// const current = storage[komponents.pop()]

// listBuilder(storage.App)
/**
 * parser will contain the components of the tree:: cache will be the tree
 *
 * this.root = App;
 * App.child = Green;
 * Green.sibling = Purple
 * Purple.sibling = Orange
 
 * queue = [ Green, Purple, Orange ]
*/
/**
 * function LinkedList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

function Node(val) {
  this.value = val;
  this.next = null;
}

LinkedList.prototype.push = function (value) {
  const node1 = new Node(value);
  // if there is no head or tail in the Linkedlist, then the node just created is the new head and tail
  if (!this.head) {
    this.head = node1;
    this.tail = node1;
  } else {
    // if there is a head, the new node that is created is the new tail and we must reassign the value of "next" for old node to point to the new tail
    this.tail.next = node1;
    this.tail = node1;
  }
  this.length += 1;
};
 */
