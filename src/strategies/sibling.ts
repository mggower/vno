import { ComponentInterface, SiblingInterface } from "../lib/types.ts";

function SiblingList(this: SiblingInterface) {
  this.head = null;
  this.tail = null;
}

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
