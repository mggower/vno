import { InitializeInterface, OptionsInterface } from "../lib/types.ts";
import { fs, path } from "../lib/deps.ts";
import { Storage } from "../lib/utils.ts";
import {createComponent, saveAsRoot} from "./component.ts";
import _def from "../lib/defaults.ts";
import Parser from "./parser.ts";

/**
 * Initialize
 * (1/3) in bundling cycle -> initialize invokes parser
 * responsible for establishing a network of component objects
 */
class Initialize implements InitializeInterface {
  /** config is the entry point of the build methods */
  public async config(options: OptionsInterface): Promise<any> {
    try {
      /** ensure the user has provided an entry path and the root component's label
          @entry: the relative path from "vno.config" to the root component
          @root: the label used for the root component, this should be the filename */
      const { entry, root } = options;

      if (!entry) {
        throw "an entry path is required inside of your config method";
      }
      if (!root) {
        throw "a root label is required to identify the root of your application";
      }

      await this.walk(entry, root);
      /** if the user has provided a unique vue cdn or use vno's default, 
          the applications cdn is then saved on the root component object */
      Storage.root.vue = options.vue || _def.CDN;
      /** create Parser and invoke */
      return await new Parser().parse();
    } catch (error: any) {
      return console.error(
        "Error inside of Initialize.config",
        { error },
      );
    }
  }
  /** walk will recursively iterate through an applications file system and locate .vue ext files */
  public async walk(entry: string, rootLabel: string): Promise<void> {
    for await (const file of fs.walk(`${entry}`, { exts: ["vue"] })) {
      /** for each .vue file, assign the files name to a variable */
      const label = path.parse(file.path).name;
      /** if the current label is the provide root label */
      if (label === rootLabel) {
        /** save a new instance of the Component object in storage and mark it as the root */
        Storage.root = saveAsRoot(createComponent(rootLabel, file.path))
      } else if (label) {
        /** store all other components as new instances of Component in storage */
        Storage[label] = createComponent(label, file.path);
      }
    }
  }
}

export default Initialize;
