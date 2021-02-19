import { App, Fctry } from '../lib/types/interfaces.ts';
import * as _def from '../lib/defaults.ts';
import Component from "./Component.ts";

export default class Storage implements App.Storage {
  public app: Fctry.store.container;
  public vue: string;
  public root: Component;

  constructor() {
    this.app = {} as Fctry.store.container;
    this.root = {} as Component;
    this.vue = _def.CDN;
  }

  public setRoot: Fctry.store.set_root = (component) => {
    this.root = component;
  }

  public setVue: Fctry.store.set_vue = (vue) => {
    if (vue !== undefined) this.vue = vue;
  }
}