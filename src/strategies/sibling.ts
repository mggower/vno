import { ComponentInterface, SiblingInterface } from "../lib/types.ts";

function SiblingList(this: SiblingInterface) {
  this.head = null;
  this.tail = null;
}

/**
 * if list has no current head, the initial descendent (child) passed into it
 * will become the head and tail. Otherwise, the tail's sibling (ie next) will become the
 * descendent and we reassign tail to the descendent
 */
SiblingList.prototype.add = function (component: ComponentInterface) {
  if (!this.head) {
    this.head = component;
    this.tail = component;
  } else {
    this.tail.sibling = component;
    this.tail = component;
  }
};

export default SiblingList;
