import { Component, Options, ParsedApp, Storage } from "../lib/newtypes.ts";

import compileApp from "./compiler.ts";
import Comp from "./component.ts";

import _def from "../lib/defaults.ts";
import { fs, path } from "../lib/deps.ts";
class vno {
  public storage: Storage;
  public queue: Component[];

  constructor() {
    this.storage = {} as Storage;
    this.queue = [];
  }

  public async createStorage(options: Options): Promise<Storage> {
    if (isValidOptions(options) === false) {
      throw new TypeError("recieved incorrect options");
    }

    for await (const file of fs.walk(`${options.entry}`, { exts: ["vue"] })) {
      /** create a new component for each .vue file */
      const label = path.parse(file.path).name;

      this.storage[label] = new Comp(label, file.path);

      if (label === options.root) {
      /** label as root in storage */
        this.storage[label].saveAsRoot(options.vue || _def.CDN);
        this.storage.root = this.storage[label]
      }
    }

    return this.storage as Storage;
  }

  public async parseApplication(): Promise<ParsedApp> {
    this.queue.push(this.storage.root);

    while (this.queue.length) {
      const current = this.queue.shift();

      if (current === undefined) {
        throw new Error("help");
      }

      await current.parseComponent(this.storage, this.queue);
    }

    return this.storage as ParsedApp;
  }

  public async build(options: Options): Promise<ParsedApp> {
    await this.createStorage(options);
    await this.parseApplication();
    compileApp(this.storage as ParsedApp);
    return this.storage as ParsedApp;
  }
}

const demo = new vno();
const options = {
  entry: "./",
  root: "App",
};

demo.build(options);

function isValidOptions(obj: unknown): obj is Options {
  return obj !== null &&
    typeof (obj as Options).entry === "string" &&
    typeof (obj as Options).root === "string";
}
