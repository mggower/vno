import Base from "./Base.ts";
import DepsList from "./DepsList.ts";
import { Queue, Storage, Cmpt } from "../dts/factory.d.ts";
import { parse, ShowCodeFrame } from "../utils/vno.utils.ts";
import { colors } from "../lib/deps.ts";

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

  public isComposite(): void {
    this.dependants = new DepsList();
    this.type = Cmpt.Type.Composite;
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
      parse.template(this as Component);
      parse.style(this);
      parse.toJavaScript(this, storage);
      this.is_parsed = true;
    }
  }
}
