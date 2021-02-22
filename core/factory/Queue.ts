import { Component, Cmpt } from "../dts/factory.d.ts";
export default class Queue {
  public components: Cmpt.List;

  constructor() {
    this.components = <Cmpt.List> [];
  }

  get length() {
    return this.components.length;
  }

  public enqueue(component: Component): void {
    if (component != null) {
      this.components.push(component);
    }
  }

  public dequeue(): Component | undefined {
    if (!this.isEmpty()) {
      return this.components.shift();
    }
  }

  public isEmpty() {
    return this.length < 1;
  }
}
