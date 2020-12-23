import Initialize from "./base.ts";
import { OptionsInterface } from "../../lib/types.ts";
import { walk } from '../../lib/deps.ts';
import Utils from "../../lib/utils.ts";

import Parser from "../parser/parser.ts";
import Component from "../component.ts";

const { Storage } = Utils;

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
  for await (const file of walk(`${entry}`, { exts: ["vue"] })) {
    const { path } = file;

    const regex: RegExp = new RegExp(/\/?(?<label>\w*)(\.vue)$/);
    const label: string | undefined = path.match(regex)?.groups?.label;
    
    if (label) {
      if (label === rootLabel) {
        this.root = new (Component as any)(rootLabel, path, true);
      } else {
        Storage[label] = new (Component as any)(label, path);
      }
    }
  }

  return true;
};

export default Initialize;
