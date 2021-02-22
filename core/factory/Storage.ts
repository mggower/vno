import { Component, ComponentContainer } from "../dts/type.vno.d.ts";
// import * as _default from "../lib/defaults.ts";
import { VueCDN } from '../lib/constants.ts';
export default class Storage {
  private _root: Component;
  private _vue: VueCDN;
  public size: number;
  public app: ComponentContainer;

  constructor() {
    this.app = <ComponentContainer> {};
    this._root = <Component> {};
    this._vue = VueCDN.Vue2;
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

  set vue(vue: VueCDN) {
    this._vue = vue;
  }
}
