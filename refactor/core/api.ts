import { App, Factory } from "./lib/types/interfaces.ts";
import { fs, path } from "./lib/deps.ts";

import * as gaurd from "./lib/types/typegaurds.ts";
import * as _def from "./lib/defaults.ts";

import Storage from "./factory/Storage.ts";
import Component from "./factory/Component.ts";
import Queue from "./factory/Queue.ts";

import compileApp from "./compiler.ts";
export default class VNO {
  public storage: Factory.Storage;
  public queue: Factory.Queue;
  public options: Factory.Options;
  // remove options and refactor to read vno.config.json
  constructor(options: Factory.Options) {
    if (gaurd.isValidOptions(options) === false) {
      throw new TypeError("received invalid options");
    }

    this.storage = new Storage();
    this.queue = new Queue();
    this.options = options;
  }

  public async createStorage(): Promise<Factory.Storage> {
    if (gaurd.checkVueCDN(this.options)) {
      this.storage.setVue(this.options.vue);
    }

    for await (
      const file of fs.walk(`${this.options.entry}`, { exts: ["vue"] })
    ) {
      const label = path.parse(file.path).name;
      const component = new Component(label, file.path);

      if (label === this.options.root) this.storage.root = component;
      else this.storage.app[label] = component;
    }

    return this.storage as Factory.Storage;
  }

  public async parseApplication(): Promise<Factory.Storage> {
    if (gaurd.isStorageReady(this.storage) === false) {
      throw new TypeError("failure to ready build")
    }

    this.queue.enqueue(this.storage.root as App.Component);
    while (this.queue.isFilled()) {
      const current = this.queue.dequeue();

      if (current === undefined) {
        throw new Error("error in parser");
      }

      await current.parseComponent(this.storage, this.queue)
    }

    return this.storage as Factory.Storage;
  }

  public async build(): Promise<Factory.Storage> {
    await this.createStorage();
    await this.parseApplication();
    compileApp(this.storage as Factory.Storage);
    return this.storage as Factory.Storage;
  }
}
