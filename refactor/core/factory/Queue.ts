import Component from './Component.ts';
import { App, Fctry } from "../lib/types/interfaces.ts";

export default class Queue implements App.Queue {
  components: Component[];
  length: number;
  constructor() {
    this.components = [] as Component[];
    this.length = 0;
  }

  public enqueue: Fctry.que.enqueue = (component) => {
    if (component === null) return;
    this.components.push(component);
    this.length = this.components.length;
  }

  public dequeue: Fctry.que.dequeue = () => {
    if (!this.length) return undefined;
    const component = this.components.shift();
    this.length = this.components.length;
    return component;
  }

  public isFilled: Fctry.que.is_filled = (() => this.length > 0);
}