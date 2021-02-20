import { Component, ComponentContainer } from "../dts/type.vno.d.ts";
import * as _def from "../lib/defaults.ts";
export default class Storage {
  private _root: Component;
  private _vue: string;
  public app: ComponentContainer;

  constructor() {
    this.app = <ComponentContainer> {};
    this._root = <Component> {};
    this._vue = _def.CDN;
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

  set vue(vue: string) {
    this._vue = vue;
  }
}
