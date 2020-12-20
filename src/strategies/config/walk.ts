import Config from './base.ts';
import Component from "../objects/component.ts";
import Storage from "../objects/storage.ts";
import { walk } from "https://deno.land/std@0.80.0/fs/mod.ts";


Config.prototype.walk = async function (entry: string, id: string) {
  for await (const file of walk(`${entry}`, { exts: ["vue"] })) {
    const { path } = file;

    if (path.includes(id)) this.root = new (Component as any)(id, path);
    else {
      const regex: RegExp = new RegExp(/\/(?<label>\w*)(\.vue)$/);
      const label: string | undefined = path.match(regex)?.groups?.label;
      if (label) Storage[label] = new (Component as any)(label, path);
    }
  }
  if (this.root) return true;
};

export default Config;