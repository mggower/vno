import { Raw } from "../dts/factory.d.ts";
import { sfcCompiler } from "../utils/deps.ts";

/**
 * abstract Base Class defines the properties, methods, and getters/setters 
 * for values relevant to the construction of a Component class
 * 
 */
export default abstract class Base {
  protected _raw: string;
  protected _source: Raw.Source;
  protected _data: Raw.Data;
  public parsed_data: Record<string, unknown>;

  constructor(public label: string, public path: string) {
    this._raw = Deno.readTextFileSync(path);
    this._source = sfcCompiler.parse(this._raw, {
      filename: `${this.label}.vue`,
      sourceMap: false,
    });
    this._data = {
      template: this._source.descriptor.template,
      script: this._source.descriptor.script,
      styles: this._source.descriptor.styles,
    };
    this.parsed_data = {};
  }

  get source() {
    return this._source;
  }

  // raw data
  get temp_data() {
    return this._data.template;
  }

  get script_data() {
    return this._data.script;
  }

  get style_data() {
    return this._data.styles;
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
  /**
   * relevant for Vue3 Only
   */
  set registration(registration: string | undefined) {
    if (registration != null) {
      this.parsed_data = {
        ...this.parsed_data,
        registration,
      };
    }
  }

  get registration() {
    if (this.parsed_data.registration) {
      return this.parsed_data.registration as string;
    }
    return undefined;
  }
}
