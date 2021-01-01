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

  if (this.head.label === label) {
    if (this.head.sibling) {
      this.head = this.head.sibling;
    } else {
      this.head = null;
    }
    return true;
  }

  let current;
  let prev;

  if (this.head.sibling) {
    current = this.head.sibling;
    prev = this.head;
  } else {
    current = this.head;
  }

  while (current.sibling) {
    if (current.label === label) {
      if (current === this.head) {
        this.head = current.sibling;
      }
      if (prev) {
        prev.sibling = current.sibling;
      }

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
