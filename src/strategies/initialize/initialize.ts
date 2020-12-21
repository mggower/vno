import Initialize from "./base.ts";

import Parser from "../parser/parser.ts";
import Component from "../component.ts";
import Storage from "../storage.ts";

import { OptionsInterface } from "../../lib/types.ts";

import { walk } from "https://deno.land/std@0.80.0/fs/mod.ts";


Initialize.prototype.config = async function (options: OptionsInterface) {
  try {
    let vue;
    const { entry, root } = options;

    if (!entry) {
      throw "an entry path is required inside of your config method";
    }
    if (!root) {
      throw "a root label is required to identify the root of your application";
    }

    const ready = await this.walk(entry, root);

    if (!ready) {
      throw "an error occured building out the queue";
    }
 
    options.vue ? { vue } = options : null;
    
    const children = Object.values(Storage);

    const read = new (Parser as any)(this.root, [this.root, ...children], vue && vue);
    const bundled = await read.parse();

    if (bundled) return true;
  } catch (error) {
    return console.error("Error inside of Initialize.config", { error });
  }
};

Initialize.prototype.walk = async function (entry: string, rootLabel: string) {
  for await (const file of walk(`${entry}`, { exts: ["vue"] })) {
    const { path } = file;

    if (path.includes(rootLabel)) this.root = new (Component as any)(rootLabel, path, true);
    else {
      const regex: RegExp = new RegExp(/\/(?<label>\w*)(\.vue)$/);
      const label: string | undefined = path.match(regex)?.groups?.label;

      if (label) Storage[label] = new (Component as any)(label, path);
      else throw `there was an error reading the label on ${path}`
    }
  }
  if (this.root) return true;
};

export default Initialize;
