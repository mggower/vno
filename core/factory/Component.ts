import CBase from "./Base.ts";
import * as Parse from "../utils/parser.ts";
import * as types from "../lib/types.ts";
import { colors } from "../lib/deps.ts";
import * as utils from "../utils/utils.ts";
import DepsList from "./DepsList.ts";
export default class Component extends CBase {
  public sibling: Component | null;
  constructor(label: string, path: string) {
    super(label, path);
    this.label = label;
    this.path = path;
    this.sibling = null;
  }

  ast() {
    console.log(this.__ast__)
  }

  public defineComposite(): void {
    this.dependants = new DepsList();
    this._type = types.EnType.Composite;
  }

  public parseComponent: types.prsComp = async (storage, queue) => {
    console.log(
      colors
        .green(`[vno: compiling] => ${colors.yellow(this.path)}`),
    );

    if (this.__ast__.errors.length) {
      utils.ShowCodeFrame(this.__ast__.descriptor, this.__ast__.errors);
    } else {
      await Parse.script(this, storage, queue);
      Parse.template(this);
      Parse.style(this);
      Parse.stringify(this, storage);
      this.is_parsed = true;
    }
  };
}
