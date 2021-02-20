import Base from "./Base.ts";
import DepsList from "./DepsList.ts";

import { colors } from "../lib/deps.ts";
import { parse, ShowCodeFrame } from "../utils/vno.utils.ts";
import { ComponentType, Queue, Storage } from "../dts/type.vno.d.ts";

export default class Component extends Base {
  public sibling: Component | null;
  constructor(label: string, path: string) {
    super(label, path);
    this.label = label;
    this.path = path;
    this.sibling = null;
  }

  get ast() {
    return this.__ast__;
  }

  public defineComposite(): void {
    this.dependants = new DepsList();
    this.type = ComponentType.Composite;
  }

  public async parseComponent(storage: Storage, queue: Queue): Promise<void> {
    console.log(
      colors
        .green(`[vno: compiling] => ${colors.yellow(this.path)}`),
    );

    if (this.__ast__.errors.length) {
      ShowCodeFrame(this.__ast__.descriptor, this.__ast__.errors);
    } else {
      await parse.script(this, storage, queue);
      parse.template(this);
      parse.style(this);
      parse.stringify(this, storage);
      this.is_parsed = true;
    }
  }
}
