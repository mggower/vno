import { join } from "https://deno.land/std@0.74.0/path/mod.ts";

/**
 * The queue is used to line up component files that have not yet been parsed.
 * After parsing, the component object is pushed into the cache for build.
 */

const queue: object[] = [];
const cache: object[] = [];

/**
 * the component interface establishes types and properties for each
 * single file component during build
 */

interface component {
  name: string;
  path: string;
  template?: string;
  imports?: object[];
  script?: string;
  style?: string;
}

/**
 * the vno object contains the methods used during the parsing process.
 * all methods are called inside of 'parse', which then constructs
 * our cache of components and are sent through the build process.
 */

const vno = {
  /**
   * locate creates an absolute path based on the current working directory
   * @param relative ;; the relative path provided in each file
   */

  locate(relative: string) {
    // ***** --> this will likely develop to `./components${relative}`
    return join(Deno.cwd(), `${relative}`);
  },

  /**
   * template parses through <template> tags, and then 
   * adds to the 'template' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */

  template(data: string, current: component) {
    const regex = /<\W*template>/gm;
    const template = data.split(regex)[1].split(/\n|\s{2,}/).join("");

    current.template = template;
  },

  /**
   * script parses through <script> tags, and then 
   * adds to the 'script' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */

  script(data: string, current: component) {
    const regex = /<\W*script>/;
    const script = data.split(regex)[1].split(/[\n\s]/).join("");

    const start = script.indexOf("{") + 1;
    const end = script.lastIndexOf("}");

    current.script = script.slice(start, end);
  },

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
  },

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
      const [_, name, __, path] = item.split(" ");
      const component: component = {
        name,
        path: this.locate(path.split(/[`'"]/)[1]),
      };
      if (
        !cache.some((child: any) => child.name === component.name) &&
        !queue.some((child: any) => child.name === component.name)
      ) {
        queue.push(component);
      }
    });
  },

  /**
   * build method will iterate through the cache and write the
   * components as Vue instances into a single file for production.
   */

  build() {
  },

  /**
   * parse is an async method that will be invoked with the application root
   * to begin app parsing. Parse calls all vno methods.
   * @param root ;; a component object { name, path } 
   */

  async parse(root: component) {
    queue.push(root);

    while (queue.length) {
      const current: any = queue.shift();
      const data = await Deno.readTextFile(current.path);

      await this.template(data, current);
      await this.script(data, current);
      await this.style(data, current);
      await this.imports(data);

      cache.push(current);
    }
  },
};

const root = {
  name: "App",
  path: vno.locate("./App.vue"),
};

await vno.parse(root);
console.log("RE$ULTZ --> ", cache);
