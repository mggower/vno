import * as types from "../lib/types.ts";
import { _, sfcCompiler } from "../lib/deps.ts";
import * as utils from "../utils/utils.ts";

export default abstract class Base {
  protected _type: types.EnType;
  protected _phase: types.EnPhase;
  protected __raw__: string;
  protected __ast__: types.src
  protected __split__: types.split;
  protected _name: string | unknown;
  public parsed_data: types.parsedData | null;
  public dependants: types.DepsList | null;
  public is_parsed: boolean;
  constructor(public label: string, public path: string) {
    this._type = types.EnType.Primitive;
    this._phase = types.EnPhase.Constructor;
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
    const data = this.script_data.content.split("\n");
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

  set template(template: string) {
    this.parsed_data = {
      ...this.parsed_data,
      template
    }
  }

  get template() {
    if (this.parsed_data?.template) {
      return this.parsed_data.template;
    }
    return "no template";
  }

  set script(script: string) {
    this.parsed_data = {
      ...this.parsed_data,
      script
    }
  }

  get script() {
    if (this.parsed_data?.script) {
      return this.parsed_data.script;
    }
    return "no script";
  }

  set styles(styles: string) {
    this.parsed_data = {
      ...this.parsed_data,
      styles,
    };
  }
  get styles() {
    if (this.parsed_data?.styles) {
      return this.parsed_data.styles;
    }
    return "no styles";
  }

  set middlecode(middlecode: string | null) {
    if (middlecode !== null) {
      this.parsed_data = {
        ...this.parsed_data,
        middlecode,
      };
    }
  }

  get middlecode() {
    if (this.parsed_data?.middlecode) {
      return this.parsed_data?.middlecode;
    }
    return "no middlecode";
  }

  set instance(instance: string) {
    this.parsed_data = {
      ...this.parsed_data,
      instance
    }
  }

  get instance() {
    if (this.parsed_data?.instance) {
      return this.parsed_data?.instance;
    }
    return "no instance";
  }
}
