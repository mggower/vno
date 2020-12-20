import Config from "./walk.ts";

import Parser from "../parser/parser.ts";
import Storage from "../storage.ts";

import { OptionsInterface } from "../../lib/types.ts";

Config.prototype.config = async function (options: OptionsInterface) {
  try {
    let vue;
    const { entry, label } = options;

    if (!entry) {
      throw "an entry path is required inside of your config method";
    }
    if (!label) {
      throw "a label is required to identify the root of your application";
    }

    const ready = await this.walk(entry, label);

    if (!ready) {
      throw "an error occured building out the queue";
    }

    const { root } = this;
    options.vue ? { vue } = options : null;

    const children = Object.values(Storage);

    const read = new (Parser as any)(root, [root, ...children], vue && vue);
    const bundled = await read.parse();

    if (bundled) return true;
  } catch (error) {
    return console.error("Error inside of Config.config", { error });
  }
};

export default Config;
