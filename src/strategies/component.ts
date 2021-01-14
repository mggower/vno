import { ComponentInterface } from "../lib/types.ts";

// #region Component
// the component defines the architecture for parsing data
// it is constructed with file data and then parsed.
// #endregion
function Component(
  this: ComponentInterface,
  label: string,
  path: string,
  isRoot: boolean = false,
) {
  this.label = label;
  this.path = path;
  this.isRoot = isRoot;
  this.isParsed = false;
  this.runData();
}

// runData is invoked in the constructor
// the method reads the vue file and splits the file
// into an array of strings broken at each "new line"
Component.prototype.runData = function data() {
  try {
    if (!this.path) {
      throw `There was an error identifying the path for ${this.label}`;
    }
    this.sourceRaw = Deno.readTextFileSync(this.path);
    this.split = this.sourceRaw.split(/\n/);
  } catch (error) {
    console.error(
      "Error inside of Component.runData():",
      { error },
    );
  }
};

export default Component;
