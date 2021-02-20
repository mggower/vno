import * as types from '../lib/types.ts';
import * as _def from '../lib/defaults.ts';

export default class Storage implements types.Storage {
  public app: types.container;
  public vue: string;
  public root: types.Component;

  constructor() {
    this.app = {} as types.container;
    this.root = {} as types.Component;
    this.vue = _def.CDN;
  }

  public setRoot(component: types.Component): void {
    this.root = component;
  }

  public setVue(vue: string|undefined): void {
    if (vue !== undefined) this.vue = vue;
  }
}