import { App, Factory } from "../lib/types/interfaces.ts";

export default class Queue implements Factory.Queue {
  components: App.Component[];
  length: number;
  constructor() {
    this.components = [] as App.Component[];
    this.length = 0;
  }

  public enqueue(component: App.Component): void {
    this.components.push(component);
    this.length = this.components.length;
  }

  public dequeue(): App.Component | undefined {
    if (!this.length) return undefined;
    const component = this.components.shift();
    this.length = this.components.length;
    return component;
  }

  public isEmpty(): boolean {
    return this.length > 0;
  }
}