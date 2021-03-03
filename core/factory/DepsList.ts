import { Component } from "../dts/factory.d.ts";

/**
 * DepsList is modeled after a singly LinkedList
 * its purpose is to cache child components on Composites
 */
export default class DepsList {
  head: Component | null;
  tail: Component | null;
  constructor() {
    this.head = null;
    this.tail = null;
  }
  /**
   * add method will add a Component to
   * the tail of a Component's deps list
   * @param component 
   */
  public add(component: Component): void {
    if (!this.head) {
      this.head = component;
      this.tail = component;
    } else if (this.tail != null) {
      this.tail.sibling = component;
      this.tail = component;
      this.tail.sibling = null;
    }
  }
  /**
   * remove uses a label as a reference to take a component
   * out of a DepsList, this is used to reposition references
   * as we resolve the dependency graph
   * @param label 
   */
  public remove(label: string): boolean {
    if (!this.head) return false;

    let removed, current, prev;

    if (this.head.label === label) {
      removed = this.head;

      if (this.head.sibling) {
        this.head = this.head.sibling;
      } else {
        this.head = null;
      }

      removed.sibling = null;
      return true;
    }

    if (this.head.sibling) {
      current = this.head.sibling;
      prev = this.head;
    } else {
      return false;
    }

    while (current.sibling) {
      if (current.label === label) {
        removed = current;
        prev.sibling = current.sibling;
        removed.sibling = null;

        return true;
      }

      prev = current;
      current = current.sibling;
    }

    if (current.label === label) {
      removed = current;

      this.tail = prev;
      this.tail.sibling = null;

      removed.sibling = null;
      return true;
    }

    return false;
  }
}
