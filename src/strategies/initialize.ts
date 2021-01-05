import { InitializeInterface, OptionsInterface } from "../lib/types.ts";
import { fs, path } from "../lib/deps.ts";
import Utils, { Storage } from "../lib/utils.ts";
import _def from "../lib/defaults.ts";

import Parser from "./parser.ts";
import Component from "./component.ts";

function Initialize(this: InitializeInterface) {}

Initialize.prototype.config = async function (options: OptionsInterface) {
  try {
    const { entry, root } = options;

    if (!entry) {
      throw "an entry path is required inside of your config method";
    }
    if (!root) {
      throw "a root label is required to identify the root of your application";
    }

    if (options.terminal === false) Utils.terminal = false;
    await this.walk(entry, root);

    Storage.root.vue = options.vue || _def.CDN;
    return new (Parser as any)().parse();
  } catch (error) {
    return console.error(
      "Error inside of Initialize.config",
      { error },
    );
  }
};

Initialize.prototype.walk = async function (entry: string, rootLabel: string) {
  for await (const file of fs.walk(`${entry}`, { exts: ["vue"] })) {
    const label = path.parse(file.path).name;

    if (label === rootLabel) {
      Storage.root = new (Component as any)(rootLabel, file.path, true);
    } else if (label) {
      Storage[label] = new (Component as any)(label, file.path);
    }
  }
  return true;
};

export default Initialize;
