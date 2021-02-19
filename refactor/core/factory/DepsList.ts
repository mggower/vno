import { App, Factory } from "../lib/types/interfaces.ts";

export default class DepsList implements Factory.DepsList {
  head: App.Primitive | App.Composite | null;
  tail: App.Primitive | App.Composite | null;
  constructor() {
    this.head = null;
    this.tail = null;
  }
  add(component: App.Component): void {
    throw new Error("Method not implemented.");
  }
  scrub(label: string): boolean {
    throw new Error("Method not implemented.");
  }

}