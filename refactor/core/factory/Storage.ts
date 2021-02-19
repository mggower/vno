import { App, Factory } from '../lib/types/interfaces.ts';
import * as _def from '../lib/defaults.ts';
import Component from "./Component.ts";

export default class Storage implements Factory.Storage {
  public app: Factory.AppStorage;
  public vue: string;
  public root: App.Component;

  constructor() {
    this.app = {} as Factory.AppStorage;
    this.root = {} as App.Component;
    this.vue = _def.CDN;
  }

  public setRoot(component: App.Component): void {
    this.root = component;
  }

  public setVue(vue: string | undefined): void {
    if (vue !== undefined) this.vue = vue;
  }
}