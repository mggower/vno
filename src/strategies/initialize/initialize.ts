import {
  ComponentInterface,
  InitializeInterface,
  OptionsInterface,
} from "../../lib/types.ts";

import Parser from "../parser/parser.ts";
import Component from "../component.ts";
import Storage from "../storage.ts";

import { walk } from "https://deno.land/std@0.80.0/fs/mod.ts";

class Initialize implements InitializeInterface {
  root: ComponentInterface | null;

  constructor() {
    this.root = null;
  }

  async config(options: OptionsInterface) {
    try {
      const { entry, root } = options;

      if (!entry) {
        throw "an entry path is required inside of your config method";
      }
      if (!root) {
        throw "a root label is required to identify the root of your application";
      }

      const ready = await this.walk(entry, root);
      if (!ready) throw "an error occured building out the queue";

      let vue;
      options.vue ? { vue } = options : null;

      if (this.root) return new Parser(this.root, vue && vue).parse();
      else throw `an Error defining the root component`;
    } catch (error) {
      return console.error("Error inside of Initialize.config", { error });
    }
  }

  async walk(entry: string, rootLabel: string) {
    for await (const file of walk(`${entry}`, { exts: ["vue"] })) {
      const { path } = file;

      if (path.includes(rootLabel)) {
        this.root = new Component(rootLabel, path, true);
        if (!this.root) throw `there was an error reading ${path}`;
      } else {
        const regex: RegExp = new RegExp(/\/(?<label>\w*)(\.vue)$/);
        const label: string | undefined = path.match(regex)?.groups?.label;

        if (label) Storage[label] = new Component(label, path);
        else throw `there was an error reading ${path}`;
      }
    }

    return true;
  }
}
export default Initialize;
