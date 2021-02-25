import type { Queue, Storage } from "../dts/factory.d.ts";
import { compileForV3, javascriptCompile } from "../lib/js_compile.ts";
import { ComponentType } from "../lib/constants.ts";
import { showCodeFrame } from "../lib/code_frame.ts";
import { colors } from "../lib/deps.ts";
import * as parse from "../lib/parser.ts";
import DepsList from "./DepsList.ts";
import Base from "./Base.ts";

export default class Component extends Base {
  public sibling: Component | null;
  constructor(label: string, path: string) {
    super(label, path);
    this.label = label;
    this.path = path;
    this.sibling = null;
  }

  public isComposite(): void {
    this.dependants = new DepsList();
    this.type = ComponentType.Composite;
  }

  public async parseComponent(
    storage: Storage,
    queue: Queue,
    variable: string,
  ): Promise<void> {
    console.log(
      colors
        .green(`[vno: compiling] => ${colors.yellow(this.path)}`),
    );

    if (this.__source__.errors.length) {
      showCodeFrame(this.__source__.descriptor, this.__source__.errors);
    } else {
      await parse.script(this, storage, queue);
      parse.template(this as Component);
      parse.style(this);
      javascriptCompile(this, storage);
      if (storage.vue.state === 3) compileForV3(this, storage, variable);
      this.is_parsed = true;
    }
  }
}
