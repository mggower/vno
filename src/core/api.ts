import { Options, Storage } from "../lib/newtypes.ts";
import createStorage from "./initialize.ts";
import parseApplication from "./parser.ts";
import compileApp from "./compiler.ts";

class vno {
  public storage: object;
  public queue: [];


  constructor() {
    this.storage = {};
    this.queue = [];
  }

  public async build(options: Options): Promise<Storage> {
    let storage = await createStorage(options);
    storage = await parseApplication(storage);
    return compileApp(storage) as Storage;
  }
}

const demo = new vno();
const options = {
  entry: "./",
  root: "App",
};

demo.build(options)
