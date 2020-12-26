import { ComponentInterface } from "../lib/types.ts";

async function Component(this: ComponentInterface, label: string, path: string, isRoot: boolean = false) {
  this.label = label;
  this.path = path;
  this.isRoot = isRoot;
  await this.runData();
}

Component.prototype.runData = async function data() {
  try {
    if (!this.path) {
      throw `There was an error identifying the path for ${this.label}`;
    }

    this.data = await Deno.readTextFile(this.path);

    if (!this.data) {
      throw `There was an error reading the file for path ${this.path}`;
    }

    this.split = this.data.split(/\n/);

    return true;
  } catch (error) {
    console.error("Error inside of Component.runData():", { error });
  }
};


export default Component;
