import * as types from "../lib/types.ts";

export default class Queue implements types.Queue {
  components: types.Component[];
  length: number;
  constructor() {
    this.components = [] as types.Component[];
    this.length = 0;
  }

  public enqueue(component: types.Component): void {
    if (component === null) return;
    this.components.push(component);
    this.length = this.components.length;
  }

  public dequeue(): types.Component | undefined {
    if (!this.length) return undefined;
    const component = this.components.shift();
    this.length = this.components.length;
    return component;
  }

  public isFilled() {
    return this.length > 0
  }
}
