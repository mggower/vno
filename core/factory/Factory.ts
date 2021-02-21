import { Options } from "../dts/type.vno.d.ts";
import { fs, path } from "../lib/deps.ts";
import { configReader, writeBundle } from "../utils/vno.utils.ts";
import { VueCDN } from '../lib/constants.ts';
import * as gaurd from "../lib/type_gaurds.ts";
import * as _default from "../lib/defaults.ts";
import Component from "./Component.ts";
import Storage from "./Storage.ts";
import Queue from "./Queue.ts";

export default class Factory {
  private _config: Options | null;
  public storage: Storage;
  public queue: Queue;

  constructor(options?: Options) {
    if (options) {
      if (!gaurd.isValidOptions(options)) {
        throw new TypeError("received invalid options");
      }
      options.vue = gaurd.vueLogger(options);
    }

    this.storage = new Storage();
    this.queue = new Queue();
    this._config = options ?? null;
  }

  get config() {
    return this._config;
  }

  public async init(): Promise<void> {
    const config = await configReader();
    if (config) this._config = config;
  }

  private async createStorage(): Promise<void> {
    if (this.config == null) await this.init();
    this.storage.vue = this.config?.vue as VueCDN;

    for await (
      const file of fs.walk(`${this.config?.entry}`, { exts: ["vue"] })
    ) {
      const label = path.parse(file.path).name;
      const component = new Component(label, file.path);

      this.storage.cache(label, component);

      if (label === this.config?.root) {
        this.storage.root = component;
      }
    }
  }

  private async parseApplication(): Promise<void> {
    if (!gaurd.isStorageReady(this.storage)) {
      throw new Error("failure to ready build");
    }

    this.queue.enqueue(this.storage.root);

    while (!this.queue.isEmpty()) {
      const current = this.queue.dequeue() as Component;
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
