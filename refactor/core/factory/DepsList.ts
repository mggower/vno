import { App, Factory } from "../lib/types/interfaces.ts";
import Component from "./Component.ts";
export default class DepsList implements Factory.DepsList {
  head: Component | null;
  tail: Component | null;
  constructor() {
    this.head = null;
    this.tail = null;
  }
  add(component: Component): void {
    throw new Error("Method not implemented.");
  }
  scrub(label: string): boolean {
    throw new Error("Method not implemented.");
  }

}