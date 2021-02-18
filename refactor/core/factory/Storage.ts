import { App, Factory } from '../lib/types/interfaces.ts';
import * as _def from '../lib/defaults.ts';

export default class Storage implements Factory.Storage {
  [key: string]: App.Component | unknown;
  app: Factory.AppStorage;
  root: App.Component | unknown;
  vue: string;

  constructor() {
    this.app = {} as Factory.AppStorage;
    this.vue = _def.CDN;
  }

  public setRoot(component: App.Component): void {
    this.root = component;
  }

  public setVue(vue: string | undefined): void {
    if (vue !== undefined) this.vue = vue;
  }
}