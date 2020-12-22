import { ComponentInterface, SiblingInterface } from "../lib/types.ts";

class Component implements ComponentInterface {
  label: string;
  path: string;
  isRoot: boolean;
  data: string | null;
  split: string[] | null;
  child: SiblingInterface | null;
  sibling: ComponentInterface | null;

  constructor(label:string, path:string, isRoot:boolean = false) {
    this.isRoot = isRoot;
    this.label = label;
    this.path = path;
    this.data = null;
    this.split = null;
    this.child = null;
    this.sibling = null;
    this.runData();
  }

  async runData() {
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
  }
}

export default Component;
