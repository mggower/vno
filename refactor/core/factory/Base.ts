import { Cmpnt, Factory } from "../lib/types/interfaces.ts";
import { _, sfcCompiler } from "../lib/deps.ts";
import * as utils from "../utils/utils.ts";
export default abstract class CBase {
  protected _type: Cmpnt.EnType;
  protected _phase: Cmpnt.EnPhase;
  protected __raw__: string;
  protected __ast__: any;
  protected __split__: Cmpnt.Tags;
  protected _name: string | unknown;
  public parsed_data: Cmpnt.ParsedData | null;
  public dependants: Factory.DepsList | null;
  public is_parsed: boolean;
  constructor(public label: string, public path: string) {
    this._type = Cmpnt.EnType.Primitive;
    this._phase = Cmpnt.EnPhase.Constructor;
    this.label = label;
    this.path = path;
    this.__raw__ = Deno.readTextFileSync(path);
    this.__ast__ = sfcCompiler.parse(this.__raw__, {
      filename: `${this.label}.vue`,
      sourceMap: false,
    });
    this.__split__ = {
      template: this.__ast__.descriptor.template,
      script: this.__ast__.descriptor.script,
      styles: this.__ast__.descriptor.styles,
    };
    this._name = this.setComponentName();
    this.parsed_data = null;
    this.dependants = null;
    this.is_parsed = false;
  }

  private setComponentName() {
    let data = this.script_data.content.split("\n");
    const index = utils.indexOfRegExp(/^\s*(name\s*:)/, data);

    if (index < 0) return _.kebabCase(this.label);
    return data[index].split(/[`'"]/)[1];
  }

  get name() {
    return this._name as string;
  }

  get temp_data() {
    return this.__split__.template;
  }

  get script_data() {
    return this.__split__.script;
  }

  get style_data() {
    return this.__split__.styles;
  }
}
