import type { Fctry } from "../dts/factory.d.ts";
import { configReader } from "../lib/config_reader.ts";
import { vueLogger } from "../lib/vue_logger.ts";
import { writeBundle } from "../lib/bundle.ts";
import { fs, path, v4 } from "../lib/deps.ts";
import Component from "./Component.ts";
import Storage from "./Storage.ts";
import Queue from "./Queue.ts";
import {
  checkVueVersion,
  isStorageReady,
  isValidOptions,
} from "../utils/type_gaurds.ts";

export default class Factory {
  public storage: Storage;
  public queue: Queue;
  public variable: string;
  private _config: Fctry.Config | null;
  private _port: number;
  private _title: string;
  private _hostname: string;
  private _server: string | null;
  private static instance: Factory;
  private constructor(options?: Fctry.Config) {
    if (options) {
      if (!isValidOptions(options)) {
        throw new TypeError("received invalid options");
      }
    }
    // if no options check for vno.config.json
    this.variable = v4.generate();
    this.storage = new Storage();
    this.queue = new Queue();
    this._config = options ?? null;
    this._port = 3000;
    this._hostname = "0.0.0.0";
    this._title = "Your Project";
    this._server = null;
  }

  public static create(options?: Fctry.Config): Factory {
    if (!Factory.instance) {
      Factory.instance = new Factory(options);
    }

    return Factory.instance;
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

  public async init(): Promise<void> {
    const config = await configReader();
    if (config) {
      this._config = config;
      if (config?.options?.port) {
        this._port = config.options.port;
      }
      if (config?.options?.hostname) {
        this._hostname = config.options.hostname;
      }
      if (config?.server) {
        this._server = config.server;
      }
    }
  }

  private async createStorage(): Promise<void> {
    if (this.config == null) await this.init();

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
    if (!isStorageReady(this.storage)) {
      throw new Error("failure to ready build");
    }

    const version = checkVueVersion(this._config)
      ? this._config?.vue as Fctry.Version
      : 2;

    this.storage.vue = vueLogger(version, this.storage.root, this.variable);

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
}
