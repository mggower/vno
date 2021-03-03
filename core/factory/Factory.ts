import { checkOptions, isStorageReady } from "../utils/type_gaurds.ts";
import { fs, path } from "../utils/deps.ts";
import { configReader } from "../lib/config_reader.ts";
import { vueLogger } from "../lib/vue_logger.ts";
import { writeBundle } from "../lib/write_bundle.ts";
import { Config, Vue } from "../dts/factory.d.ts";
import Component from "./Component.ts";
import Storage from "./Storage.ts";
import Queue from "./Queue.ts";

/**
 * Factory class follows the Singelton design pattern
 * only one can be made for each application
 */
export default class Factory {
  public storage: Storage;
  public queue: Queue;
  public variable: string;
  private _config: Config;
  private _port!: number;
  private _title!: string;
  private _hostname!: string;
  private _server!: string;
  private static instance: Factory;
  private constructor(options?: Config) {
    this.storage = Storage.create();
    this.queue = new Queue();
    this.variable = `vno${Math.floor(Math.random() * 100 * 100 * 100)}`;
    this._config = options ?? <Config> {};
  }

  /**
   * an instance is made through the `create` method 
   * if an instance has already been made, it returns 
   * the original instance
   */
  public static create(options?: Config): Factory {
    if (!Factory.instance) {
      Factory.instance = new Factory(options);
    }

    return Factory.instance;
  }
  /**
   * assignConfig() runs type checks on the available config,
   * if it fails, it seeks out a vno.config.json to take its place
   * then assigns the data to the Factory's props
   */
  public async assignConfig(): Promise<void> {
    if (!checkOptions(this.config)) {
      this._config = await configReader() as Config;
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
  /**
   * createStorage() collects all .vue files
   * transforms the file into a new Component object
   * then caches the component in Storage
   */
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
  /**
   * parseApplication() initiates compilation
   * begins the Queue starting with the app Root
   */
  private async parseApplication(): Promise<void> {
    isStorageReady(this.storage);

    this.storage.vue = vueLogger(
      this._config.vue as Vue.Version,
      this.storage.root,
      this.variable,
    );

    this.queue.enqueue(this.storage.root);

    while (!this.queue.isEmpty()) {
      const current = this.queue.dequeue() as Component;
      await current.parseComponent(this.storage, this.queue, this.variable);
    }
  }
  /**
   * build is the entry to initiating bundle
   */
  public async build(): Promise<Storage> {
    await this.createStorage();
    await this.parseApplication();

    writeBundle(this.storage);

    return this.storage as Storage;
  }

  /**
   * getters for Read Only props to catch for default values
   */
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
