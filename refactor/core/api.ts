import { isValidOptions, checkVueCDN } from "./lib/types/typegaurds.ts";
import { Factory } from "./lib/types/interfaces.ts";
import * as _def from "./lib/defaults.ts";
import { fs, path } from "./lib/deps.ts";
import Storage from "./factory/Storage.ts";
import Component from './factory/Component.ts';
export default class VNO {
  public storage: Factory.Storage | null;
  public queue: Factory.Queue | null;
  public options: Factory.Options;
  
  constructor(options: Factory.Options) {
    if (isValidOptions(options) === false) {
      throw new TypeError("received invalid options")
    }

    this.options = options;
    this.storage = null;
    this.queue = null;
  }

  public async createStorage(): Promise<Factory.Storage> {
    this.storage = new Storage();

    if (checkVueCDN(this.options)) {
      this.storage.setVue(this.options.vue);
    }
  
    for await (const file of fs.walk(`${this.options.entry}`, { exts: ["vue"] })) {
      /** create a new component for each .vue file */
      const label = path.parse(file.path).name;
      const component = new Component(label, file.path);

      if (label === this.options.root) {
        this.storage.root = component;
      } else {
        this.storage.app[label] = component;
      }
    }

    return this.storage as Factory.Storage;
  }
}
