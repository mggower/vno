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
function Parser(this: vno, root: component, queue: [], cdn: string) {
  this.root = root;
  this.queue = queue;
  this.cdn = cdn;
  this.cache = {};
}

/**
   * locate creates an absolute path based on the current working directory
   * @param relative ;; the relative path provided in each file
   */
Parser.prototype.locate = function (relative: string) {
  return join(Deno.cwd(), `./${relative}`); // --> likely develop to `./components${relative}`
};

/**
 * init will read the components file and break apart the data once,
 * this will limit the amount of times the data must be mutated
 * hopefully to limit the time complexity of our parser
 * @params current: component ;; the component currently being parsed;
 */
Parser.prototype.init = async function (current: component) {
  try {
    const { path } = current;

    if (!path) {
      throw `There was an error identifying the path for ${current.label}`;
    }

    const data = await Deno.readTextFile(path);

    if (!data) {
      throw `There was an error reading the file for path ${path}`;
    }

    const split = data?.split(/\n/);

    return this.template({ ...current, split });
  } catch (error) {
    console.error("Error inside of Parser.init:", { ERROR: error });
  }
};

/**
   * template parses through <template> tags, and then
   * adds to the 'template' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */
Parser.prototype.template = function (current: component) {
  try {
    if (!current.split) {
      throw `There was an error locating 'split' data for ${current.label} component`;
    }

    const open: number | undefined = current.split.indexOf("<template>");
    const close: number | undefined = current.split.indexOf("</template>");

    if (typeof open !== "number" || typeof close !== "number") {
      throw `There was an error isolating content inside of <template> tags for ${current.label}.vue`;
    }

    const split = current.split.slice(close + 2);
    const template = current.split.slice(open + 1, close)
      .join("")
      .replace(/(\s{2,})/g, "");

    return this.script({ ...current, split, template });
  } catch (error) {
    console.error("Error inside of Parser.template:", { ERROR: error });
  }
};

/**
   * script parses through <script> tags, and then
   * adds to the 'script' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */
Parser.prototype.script = function (current: component) {
  try {
    if (!current.split) {
      throw `There was an error locating 'split' data for ${current.label} component`;
    }

    const open: number | undefined = current.split.indexOf("<script>");
    const close: number | undefined = current.split.indexOf("</script>");

    if (typeof open !== "number" || typeof close !== "number") {
      throw `There was an error isolating content inside of <script> tags for ${current.label}.vue`;
    }

    const script = current.split.slice(open + 1, close);

    const nameRegEx = /(name)/;
    const name: string | undefined = script
      .filter((element) => nameRegEx.test(element))[0]
      .split(/[`'"]/)[1];

    if (!name) {
      throw `There was an error while identifying the name property inside ${current.label}.vue`;
    }

    const exportRegEx = /^(export)/;
    const start: number | undefined = script
      .findIndex((element) => exportRegEx.test(element));

    const end: number | undefined = script.lastIndexOf("}");

    if (typeof start !== "number" || typeof end !== "number") {
      throw `There was an error while identifying the exported instance inside ${current.label}.vue`;
    }

    const split = current.split.slice(close + 2);
    const exports = script
      .slice(start + 1, end)
      .join("")
      .replace(/(\s)/g, "");

    return this.style({ ...current, split, script: exports });
  } catch (error) {
    console.error("Error inside of Parser.script:", { ERROR: error });
  }
};

/**
   * style parses through <style> tags, and then
   * adds to the 'style' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */
Parser.prototype.style = function (current: component) {
  try {
    if (!current.split) {
      throw `There was an error locating 'split' data for ${current.label} component`;
    }

    const open: number | undefined = current.split.indexOf("<style>");
    const close: number | undefined = current.split.indexOf("</style>");

    if (typeof open !== "number" || typeof close !== "number") {
      return this.instance({ ...current });
    }

    const style: string | undefined = current.split
      .slice(open + 1, close)
      .join("")
      .replace(/(\s)/g, "");

    return this.instance({ ...current, style });
  } catch (error) {
    console.error("Error inside of Parser.style:", { ERROR: error });
  }
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
Parser.prototype.parse = async function () {
  while (this.queue.length) {
    const current: component = this.queue.shift();

    await this.init(current);

    // this.template(current);
    // this.script(current);
    // this.style(current);
    // this.instance(current);

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

export default Parser;
