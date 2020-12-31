import { ComponentInterface, SiblingInterface } from "../lib/types.ts";

function SiblingList(this: SiblingInterface) {
  this.head = null;
  this.tail = null;
}

SiblingList.prototype.add = function (component: object) {
  if (!this.head) {
    this.head = component;
    this.tail = component;
  } else {
    this.tail.sibling = component;
    this.tail = component;
  }
};

SiblingList.prototype.contains = function (label: string) {
  if (!this.head) return false;
  let current = this.head;
  let prev;
  while (current.sibling) {
    console.log("current", current);
    if (current.label === label) {
      if (current === this.head) this.head = current.sibling;
      if (prev) prev.sibling = current.sibling;
      return true;
    }
    prev = current;
    current = current.sibling;
  }
  if (current.label === label) {
    this.tail = prev;
    this.tail.sibling = null;
    return true;
  }
  return false;
};


export default SiblingList;
