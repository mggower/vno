import * as types from "../lib/types.ts";
import { fs, path } from "../lib/deps.ts";

import * as gaurd from "../lib/typeGaurds.ts";
import * as _def from "../lib/defaults.ts";

import Storage from "./Storage.ts";
import Component from "./Component.ts";
import Queue from "./Queue.ts";

import compileApp from "../utils/compiler.ts";

export default class VNO {
  public storage: types.Storage;
  public queue: types.Queue;
  public options: types.Options;
  // remove options and refactor to read vno.config.json
  constructor(options: types.Options) {
    if (gaurd.isValidOptions(options) === false) {
      throw new TypeError("received invalid options");
    }

    this.storage = new Storage();
    this.queue = new Queue();
    this.options = options;
  }

  private async createStorage(): Promise<types.Storage> {
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

    return this.storage as types.Storage;
  }

  private async parseApplication(): Promise<types.Storage> {
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

    return this.storage as types.Storage;
  }

  public async build(): Promise<types.Storage> {
    await this.createStorage();
    await this.parseApplication();
    compileApp(this.storage as types.Storage);
    return this.storage as types.Storage;
  }
}
