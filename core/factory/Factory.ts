import { Options } from "../dts/type.vno.d.ts";

import { fs, path } from "../lib/deps.ts";
import * as gaurd from "../lib/typeGaurds.ts";
import * as _def from "../lib/defaults.ts";

import Component from "./Component.ts";
import Storage from "./Storage.ts";
import Queue from "./Queue.ts";

import { writeBundle } from "../utils/vno.utils.ts";
export default class Factory {
  private options: Options;
  public storage: Storage;
  public queue: Queue;
  // remove options and refactor to read vno.config.json
  constructor(options: Options) {
    if (gaurd.isValidOptions(options) === false) {
      throw new TypeError("received invalid options");
    }

    this.storage = new Storage();
    this.queue = new Queue();
    this.options = options;
  }

  private async createStorage(): Promise<void> {
    if (gaurd.checkVueCDN(this.options)) {
      this.storage.setVue(this.options.vue);
    }

    for await (
      const file of fs.walk(`${this.options.entry}`, { exts: ["vue"] })
    ) {
      const label = path.parse(file.path).name;
      const component = new Component(label, file.path);

      this.storage.app[label] = component;
      if (label === this.options.root) {
        this.storage.root = component;
      }
    }
  }

  private async parseApplication(): Promise<void> {
    if (gaurd.isStorageReady(this.storage) === false) {
      throw new TypeError("failure to ready build");
    }

    this.queue.enqueue(this.storage.root);
    while (this.queue.isFilled()) {
      const current = this.queue.dequeue();

      if (current === undefined) {
        throw new Error("error in parser");
      }

      await current.parseComponent(this.storage, this.queue);
    }
  }

  public async build(): Promise<Storage> {
    await this.createStorage();
    await this.parseApplication();
    writeBundle(this.storage);
    return this.storage as Storage;
  }
}
