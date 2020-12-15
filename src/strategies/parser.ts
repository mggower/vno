import { join } from "https://deno.land/std@0.74.0/path/mod.ts";
import { ensureDir, exists } from "https://deno.land/std@0.80.0/fs/mod.ts";

import { component, vno } from "./types.ts";
import print from "./console.ts";

/**
 * parser object interface vno contains the methods used during the parsing
 * process. all methods are called inside of 'parse', which then constructs
 * our cache of components and are sent through the build process.
 */
/**
  * The queue is used to line up component files that have not yet been parsed.
  * After parsing, the componet object is pushed into the cache for build.
  */
function Parser(this: vno) {
  this.root = null;
  this.queue = [];
  this.cache = {};
  this.cdn = "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";
}

/**
   * locate creates an absolute path based on the current working directory
   * @param relative ;; the relative path provided in each file
   */
Parser.prototype.locate = function (relative: string) {
  return join(Deno.cwd(), `./client/${relative}`); // --> likely develop to `./components${relative}`
};

/**
 * init will read the components file and break apart the data once,
 * this will limit the amount of times the data must be mutated
 * hopefully to limit the time complexity of our parser
 * @params current: component ;; the component currently being parsed;
 */
Parser.prototype.init = async function (current: component) {
  const { path } = current;
  console.log(current.label, "path -->", path);
  if (path) {
    const data = await Deno.readTextFile(path);
    current.split = data?.split(/\n/);
  }
};

/**
   * template parses through <template> tags, and then
   * adds to the 'template' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */
Parser.prototype.template = function (current: component) {
  const { split } = current;

  const open: any = split?.indexOf("<template>");
  const close: any = split?.indexOf("</template>");

  current.split = split?.slice(close + 2);

  const template = split?.slice(open + 1, close)
    .join("")
    .replace(/(\s{2,})/g, "");

  current.template = template;
};

/**
   * script parses through <script> tags, and then
   * adds to the 'script' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */
Parser.prototype.script = function (current: component) {
  const { split } = current;

  const open: any = split?.indexOf("<script>");
  const close: any = split?.indexOf("</script>");

  current.split = split?.slice(close + 2);

  const script = split?.slice(open + 1, close);

  const importRegEx = /^(import)/;
  const imports = script?.filter((element) => importRegEx.test(element));
  current.imports = imports;

  this.imports(current);

  const nameRegEx = /(name)/;
  const name = script?.filter((element) => nameRegEx.test(element))[0]
    .split(/[`'"]/)[1];
  current.name = name;

  const exportRegEx = /^(export)/;
  const start: any = script?.findIndex((element) => exportRegEx.test(element));
  const end: any = script?.lastIndexOf("}");

  const exports = script?.slice(start + 1, end)
    .join("")
    .replace(/(\s)/g, "");

  current.script = exports;
};

/**
   * style parses through <style> tags, and then
   * adds to the 'style' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */
Parser.prototype.style = function (current: component) {
  const { split } = current;

  const open: any = split?.indexOf("<style>");
  const close: any = split?.indexOf("</style>");

  const style: any = split?.slice(open + 1, close)
    .join("")
    .replace(/(\s)/g, "");

  current.style = style;
};

/**
   * imports parses through import statements, and then
   * creates new component objects including 'name' and 'path'
   * properties. Then the object is pushed into the queue if
   * that component is not found in the queue or cache.
   * @param data ;; collected data sourced from file
   */
Parser.prototype.imports = function (current: component) {
  const { imports, label } = current;

  const components: any = imports
    ?.reduce((accumulator: object[], current: string): object[] => {
      const array: string[] | undefined = current.split(/\s/);
      let children = accumulator.slice();

      const component: component = {
        label: array[1],
        path: this.locate(array[3].split(/[`'"]/)[1]),
      };

      if (
        !this.cache[label] &&
        !this.queue.some((child: any) => child.label === component.label)
      ) {
        children = [...accumulator, component];
      }
      return children;
    }, []);

  this.queue = [...this.queue, ...components];
};
/**
 * instance method writes the appropriate vue instance to prep for build
 * @params: current = component object;
 */
Parser.prototype.instance = function (current: component) {
  const { label, name, template, script } = current;
  if (label === this.root.label) {
    current.instance =
      `\nvar ${label} = new Vue({template: \`${template}\`,${script}});\n`;
  } else {
    current.instance =
      `\nvar ${label} = Vue.component("${name}", {template: \`${template}\`,${script}});`;
  }
};

/**
 * mount method finishes the build by writing the Application mount & root instance
 * @params: the root component object and buildPath from build method
 */
Parser.prototype.mount = async function (root: component, buildPath: string) {
  const mount =
    `\n${root.label}.$mount("#${root.name}");\nexport default ${root.label};\n`;

  await Deno.writeTextFile(buildPath, this.root.instance, { append: true });
  await Deno.writeTextFile(buildPath, mount, { append: true });
};

/**
   * build method will iterate through the cache and write the
   * components as Vue instances into a single file for production.
   */
Parser.prototype.build = async function () {
  await ensureDir("./vno-build");
  const buildPath = "./vno-build/build.js";
  const stylePath = "./vno-build/style.css";

  const ignore = `/* eslint-disable */\n// prettier-ignore\n`;
  const vue = `import Vue from '${this.cdn}';\n`;

  if (await exists(buildPath)) await Deno.remove(buildPath);
  await Deno.writeTextFile(buildPath, ignore + vue, { append: true });

  if (await exists(stylePath)) await Deno.remove(stylePath);
  await Deno.writeTextFile(stylePath, this.root.style, { append: true });

  await Object.keys(this.cache)
    .forEach(
      async (child) => {
        const { instance, style } = this.cache[child];
        await Deno.writeTextFile(buildPath, instance, { append: true });
        await Deno.writeTextFile(stylePath, style, { append: true });
      },
    );

  await this.mount(this.root, buildPath);
  print();
};

/**
   * parse is an async method that will be invoked with the application root
   * to begin app parsing. Parse calls all vno methods.
   * @param root ;; a component object { name, path }
   */
Parser.prototype.parse = async function (root: component) {
  this.queue.unshift(root);
  this.root = root;

  while (this.queue.length) {
    const current: component = this.queue.shift();

    await this.init(current);

    this.template(current);
    this.script(current);
    this.style(current);
    this.instance(current);

    const { label, name, template, script, style, instance } = current;
    if (current !== this.root) {
      this.cache[label] = {
        label,
        name,
        template,
        script,
        style,
        instance,
      };
    }
  }

  this.build();
  return this.cache;
};

export default new (Parser as any)();


/**
 * 
 * ."client"/App.vue
 * ./components/AppChild.vue
 */