import { component, sibling } from "../../lib/types.ts";

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

export default SiblingList;
