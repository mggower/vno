import CBase from "./Base.ts";
import * as Parse from "../parser.ts";
import { Cmpnt } from "../lib/types/interfaces.ts";
import { colors } from "../lib/deps.ts";
import * as utils from '../utils/utils.ts';
import DepsList from "./DepsList.ts";
export default class Component extends CBase {
  public sibling: Component | null;
  constructor(label: string, path: string) {
    super(label, path);
    this.sibling = null;
  }

  public defineComposite = () => {
    this.dependants = new DepsList();
    this._type = Cmpnt.EnType.Composite;
  };

  public parseComponent: Cmpnt.prs_comp = async (storage, queue) => {
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

