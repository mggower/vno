import { Cmpt, Component, Fctry } from "../dts/factory.d.ts";
export default class Storage {
  private _root: Component;
  private _vue: Fctry.Vue;
  public size: number;
  public app: Cmpt.Container;

  constructor() {
    this.app = <Cmpt.Container> {};
    this._root = <Component> {};
    this._vue = <Fctry.Vue> {};
    this.size = 0;
  }

  public cache(label: string, component: Component): Component {
    this.app[label] = component;
    this.size += 1;
    return component;
  }

  public get(label: string): Component | undefined {
    return this.app[label];
  }

  get root() {
    return this._root;
  }

  set root(component: Component) {
    this._root = component;
  }

  get vue() {
    return this._vue;
  }

  set vue(vue: Fctry.Vue) {
    this._vue = vue;
  }
}
