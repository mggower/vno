import { DepsList, ParsedData, RawData, Src } from "../dts/type.vno.d.ts";
import { utils } from "../utils/vno.utils.ts";
import { _, sfcCompiler } from "../lib/deps.ts";

export enum ComponentType {
  Primitive = "PRIMITIVE",
  Composite = "COMPOSITE",
}
export default abstract class Base {
  protected __type__: ComponentType;
  protected __raw__: string;
  protected __ast__: Src;
  protected __data__: RawData;

  public name: string;
  public parsed_data: ParsedData;
  public dependants: DepsList | null;
  public is_parsed: boolean;

  constructor(public label: string, public path: string) {
    this.label = label;
    this.path = path;

    this.__type__ = ComponentType.Primitive;
    this.__raw__ = Deno.readTextFileSync(path);
    this.__ast__ = sfcCompiler.parse(this.__raw__, {
      filename: `${this.label}.vue`,
      sourceMap: false,
    });
    this.__data__ = {
      template: this.__ast__.descriptor.template,
      script: this.__ast__.descriptor.script,
      styles: this.__ast__.descriptor.styles,
    };
    this.name = this.setComponentName();
    this.parsed_data = <ParsedData> {};
    this.dependants = null;
    this.is_parsed = false;
  }

  private setComponentName() {
    const data = this.script_data.content.split("\n");
    const index = utils.indexOfRegExp(/^\s*(name\s*:)/, data);

    if (index < 0) return _.kebabCase(this.label);
    return data[index].split(/[`'"]/)[1];
  }

  get type() {
    return this.__type__;
  }

  set type(input: ComponentType) {
    switch (input) {
      case ComponentType.Composite:
        this.__type__ = ComponentType.Composite;
        break;
      default:
        this.__type__ = ComponentType.Primitive;
    }
  }

  // raw data
  get temp_data() {
    return this.__data__.template;
  }

  get script_data() {
    return this.__data__.script;
  }

  get style_data() {
    return this.__data__.styles;
  }

  // resolved data
  set template(template: string | undefined) {
    if (template != null) {
      this.parsed_data = {
        ...this.parsed_data,
        template,
      };
    }
  }

  get template() {
    if (this.parsed_data.template) {
      return this.parsed_data.template as string;
    }
    return undefined;
  }

  set script(script: string | undefined) {
    if (script != null) {
      this.parsed_data = {
        ...this.parsed_data,
        script,
      };
    }
  }

  get script() {
    if (this.parsed_data.script) {
      return this.parsed_data.script as string;
    }
    return undefined;
  }

  set styles(styles: string | undefined) {
    if (styles != null) {
      this.parsed_data = {
        ...this.parsed_data,
        styles,
      };
    }
  }
  get styles() {
    if (this.parsed_data.styles) {
      return this.parsed_data.styles as string;
    }
    return undefined;
  }

  set middlecode(middlecode: string | undefined) {
    if (middlecode != null) {
      this.parsed_data = {
        ...this.parsed_data,
        middlecode,
      };
    }
  }

  get middlecode() {
    if (this.parsed_data.middlecode) {
      return this.parsed_data.middlecode as string;
    }
    return undefined;
  }

  set instance(instance: string | undefined) {
    if (instance != null) {
      this.parsed_data = {
        ...this.parsed_data,
        instance,
      };
    }
  }

  get instance() {
    if (this.parsed_data.instance) {
      return this.parsed_data.instance as string;
    }
    return undefined;
  }
}
