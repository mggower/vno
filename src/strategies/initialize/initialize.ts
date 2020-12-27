import Initialize from "./base.ts";

import { OptionsInterface } from "../../lib/types.ts";
import { fs, path } from "../../lib/deps.ts";
import { Storage } from "../../lib/utils.ts";

import Parser from "../parser/parser.ts";
import Component from "../component.ts";

Initialize.prototype.config = async function (options: OptionsInterface) {
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

    return new (Parser as any)(this.root, vue && vue).parse();
  } catch (error) {
    return console.error("Error inside of Initialize.config", { error });
  }
};

Initialize.prototype.walk = async function (entry: string, rootLabel: string) {
  for await (const file of fs.walk(`${entry}`, { exts: ["vue"] })) {
    const label = path.parse(file.path).name;

    if (label === rootLabel) {
      this.root = new (Component as any)(rootLabel, file.path, true);
    } else if (label) {
      Storage[label] = new (Component as any)(label, file.path);
    }
  }
  return true;
};

export default Initialize;
