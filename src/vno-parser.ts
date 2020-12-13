import { join } from "https://deno.land/std@0.74.0/path/mod.ts";
import { ensureDir, exists } from "https://deno.land/std@0.80.0/fs/mod.ts";
import { component, vno } from "./strategies/types.ts";
import print from "./strategies/console.ts";

/**
 * parser class contains the methods used during the parsing process.
 * all methods are called inside of 'parse', which then constructs
 * our cache of components and are sent through the build process.
 */
class Parser implements vno {
  root: any;
  queue: any[];
  cache: any[];
  cdn: string;

  /**
  * The queue is used to line up component files that have not yet been parsed.
  * After parsing, the component object is pushed into the cache for build.
  */

  constructor() {
    this.root = null;
    this.queue = [];
    this.cache = [];
    this.cdn =
      "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";
  }

  /**
   * locate creates an absolute path based on the current working directory
   * @param relative ;; the relative path provided in each file
   */
  locate(relative: string) {
    // ***** --> this will likely develop to `./components${relative}`
    return join(Deno.cwd(), `${relative}`);
  }

  /**
   * template parses through <template> tags, and then 
   * adds to the 'template' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */
  template(data: string, current: component) {
    const regex = /<\W*template>/;
    const template = data.split(regex)[1].split(/\n|\s{2,}/).join("");

    current.template = template;
  }

  /**
   * script parses through <script> tags, and then 
   * adds to the 'script' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */
  script(data: string, current: component) {
    const regex = /<\W*script>/;
    const script = data.split(regex)[1].split(/[\n\s]/);

    current.name = script[script.indexOf("name:") + 1].split("'")[1];

    const start = script.indexOf("{") + 1;
    const end = script.lastIndexOf("}");

    current.script = script.slice(start, end).join("");
  }

  /**
   * style parses through <style> tags, and then 
   * adds to the 'style' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */
  style(data: string, current: component) {
    const regex = /<\W*style>/;
    const style = data.split(regex)[1].split(/[\n\s]/).join("");

    current.style = style;
  }

  /**
   * imports parses through import statements, and then 
   * creates new component objects including 'name' and 'path'
   * properties. Then the object is pushed into the queue if
   * that component is not found in the queue or cache.
   * @param data ;; collected data sourced from file
   */
  imports(data: string) {
    const lines = data.split(/\n/);

    const regex = /^(import)/;
    const children = lines.filter((element) => regex.test(element));

    children.forEach((item) => {
      const [_, label, __, path] = item.split(" ");
      const component: component = {
        label,
        path: this.locate(path.split(/[`'"]/)[1]),
      };
      if (
        !this.cache.some((child: any) => child.label === component.label) &&
        !this.queue.some((child: any) => child.label === component.label)
      ) {
        this.queue.push(component);
      }
    });
  }

  instance(current: component) {
    const { label, name, template, script } = current;
    if (label === this.root.label) {
      current.instance =
        `\nconst ${label} = new Vue({template: \`${template}\`,${script}});\n`;
    } else {
      current.instance =
        `\nconst ${label} = Vue.component("${name}", {template: \`${template}\`,${script}});`;
    }
  }

  mount(root: component) {
    return `\n${root.label}.$mount("#${root.name}");\nexport default ${root.label};\n`;
  }
  /**
   * build method will iterate through the cache and write the
   * components as Vue instances into a single file for production.
   */
  async build() {
    await ensureDir("./vno-build");
    const buildPath = "./vno-build/build.js";

    const vue = `import Vue from '${this.cdn}';\n`;
    const mount = this.mount(this.root);

    if (await exists(buildPath)) await Deno.remove(buildPath);
    await Deno.writeTextFile(buildPath, vue, { append: true });

    this.cache.forEach(
      async (child: component) => {
        await Deno.writeTextFile(buildPath, child.instance, { append: true });
      },
    );

    await Deno.writeTextFile(buildPath, this.root.instance, { append: true });
    await Deno.writeTextFile(buildPath, mount, { append: true });

    print();
  }

  /**
   * parse is an async method that will be invoked with the application root
   * to begin app parsing. Parse calls all vno methods.
   * @param root ;; a component object { name, path } 
   */
  async parse(root: component) {
    this.root = root;
    this.queue.push(root);

    while (this.queue.length) {
      const current: component = this.queue.shift();
      const data = await Deno.readTextFile(current.path);

      this.template(data, current);
      this.script(data, current);
      this.style(data, current);
      this.instance(current);
      this.imports(data);

      if (current !== this.root) {
        this.cache.unshift(current);
      }
    }

    this.build();
    return this.cache;
  }
}

export default new Parser();
