import { InitializeInterface, OptionsInterface } from "../lib/types.ts";
import { fs, path } from "../lib/deps.ts";
import Utils, { Storage } from "../lib/utils.ts";
import _def from "../lib/defaults.ts";

import Parser from "./parser.ts";
import Component from "./component.ts";

// #region Initialize
// (1/3) in bundling cycle -> initialize invokes parser
// responsible for establishing a network of component objects
// #endregion
function Initialize(this: InitializeInterface) {}
// config is the entry point of the build methods
Initialize.prototype.config = async function (options: OptionsInterface) {
  try {
    // ensure the user has provided an entry path and the root component's label
    const { entry, root } = options;
    // entry is the relative path from "vno.config" to the root component
    if (!entry) {
      throw "an entry path is required inside of your config method";
    }
    // root is the label used for the root component, this should be the filename
    if (!root) {
      throw "a root label is required to identify the root of your application";
    }

    // invoke walk method with our arguments
    await this.walk(entry, root);
    // if the user has provided a unique vue cdn or use vno's default
    // the applications cdn is then saved on the root component object
    Storage.root.vue = options.vue || _def.CDN;
    // instantiate the Parser object and invoke the parse method
    return new (Parser as any)().parse();
  } catch (error) {
    return console.error(
      "Error inside of Initialize.config",
      { error },
    );
  }
};
// walk will recursively iterate through an applications file system and locate .vue ext files
Initialize.prototype.walk = async function (entry: string, rootLabel: string) {
  for await (const file of fs.walk(`${entry}`, { exts: ["vue"] })) {
    // for each .vue file, assign the files name to a variable
    const label = path.parse(file.path).name;
    // if the current label is the provide root label
    if (label === rootLabel) {
      // save a new instance of the Component object in storage and mark it as the root
      Storage.root = new (Component as any)(rootLabel, file.path, true);
    } else if (label) {
      // store all other components as new instances of Component in storage
      Storage[label] = new (Component as any)(label, file.path);
    }
  }
};

export default Initialize;
