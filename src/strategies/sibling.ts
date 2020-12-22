import { ComponentInterface, SiblingInterface } from "../lib/types.ts";

class SiblingList implements SiblingInterface {
  head: (ComponentInterface | null);
  tail: (ComponentInterface | null);

  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(component: ComponentInterface) {
    if (!this.head) {
      this.head = component;
      this.tail = component;
    } else if (this.tail) {
      this.tail.sibling = component;
      this.tail = component;
    }
  }
}


/**
 * if list has no current head, the initial descendent (child) passed into it
 * will become the head and tail. Otherwise, the tail's sibling (ie next) will become the
 * descendent and we reassign tail to the descendent
 */


export default SiblingList;
