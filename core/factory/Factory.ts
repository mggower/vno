import { Fctry } from "../dts/factory.d.ts";
import { configReader } from "../lib/config_reader.ts";
import { vueLogger } from "../lib/vue_logger.ts";
import { writeBundle } from "../lib/bundle.ts";
import { fs, path, v4 } from "../utils/deps.ts";
import Component from "./Component.ts";
import Storage from "./Storage.ts";
import Queue from "./Queue.ts";
import {
  checkOptions,
  checkVueVersion,
  isStorageReady,
} from "../utils/type_gaurds.ts";

export default class Factory {
  public storage: Storage;
  public queue: Queue;
  public variable: string;
  private _config: Fctry.Config;
  private _port!: number;
  private _title!: string;
  private _hostname!: string;
  private _server!: string;
  private static instance: Factory;
  private constructor(options?: Fctry.Config) {
    this.storage = new Storage();
    this.queue = new Queue();
    this.variable = v4.generate();
    this._config = options ?? <Fctry.Config> {};
  }

  public static create(options?: Fctry.Config): Factory {
    if (!Factory.instance) {
      Factory.instance = new Factory(options);
    }

    return Factory.instance;
  }

  public async assignConfig(): Promise<void> {
    if (!checkOptions(this.config)) {
      this._config = await configReader() as Fctry.Config;
    }
    if (this.config.options?.port) {
      this._port = this.config.options.port;
    }
    if (this.config.options?.hostname) {
      this._hostname = this.config.options.hostname;
    }
    if (this.config.server) {
      this._server = this.config.server;
    }
  }

  private async createStorage(): Promise<void> {
    await this.assignConfig();

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
    isStorageReady(this.storage);

    this.storage.vue = vueLogger(
      this._config.vue as Fctry.Version,
      this.storage.root,
      this.variable,
    );

    this.queue.enqueue(this.storage.root);

    while (!this.queue.isEmpty()) {
      const current = this.queue.dequeue() as Component;
      await current.parseComponent(this.storage, this.queue, this.variable);
    }
  }

  public async build(): Promise<Storage> {
    await this.createStorage();
    await this.parseApplication();

    writeBundle(this.storage);

    return this.storage as Storage;
  }

  get config() {
    return this._config;
  }

  get port() {
    if (this._port) return this._port;
    return 3000;
  }

  get hostname() {
    if (this._hostname) return this._hostname;
    return "0.0.0.0";
  }

  get title() {
    if (this._title) return this._title;
    return "Your Project";
  }

  get server() {
    if (this._server) return this._server;
    return null;
  }
}
