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
const cdn = "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";
function Parser(this: vno, root: component, queue: [], vue: string = cdn) {
  this.root = root;
  this.queue = queue;
  this.vue = vue;
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

    const split = data.split(/\n/);
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
    const split = current.split.slice(close + 1);
    const template = current.split.slice(open + 1, close)
      .join("")
      .replace(/(\s{2,})/g, "");

    return this.script({ ...current, split, template });
  } catch (error) {
    console.error("Error inside of Parser.template:", { error });
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
    const { split } = current;
    if (!split) {
      throw `There was an error locating 'split' data for ${current.label} component`;
    }
    const open: number | undefined = split.indexOf("<script>");
    const close: number | undefined = split.indexOf("</script>");

    if (typeof open !== "number" || typeof close !== "number") {
      throw `There was an error isolating content inside of <script> tags for ${current.label}.vue`;
    }

    const script = split.slice(open + 1, close);

    if (!script) {
      throw `There was an error while reading through the script tag in ${current.label}.vue`;
    }

    const nameRegEx = /(name)/;
    let name: string[] | string = script.filter((element: any) =>
      nameRegEx.test(element)
    );

    if (!name.length) {
      throw `There was an error while identifying the name property inside ${current.label}.vue`;
    }

    name = name[0].split(/[`'"]/)[1];

    const exportRegEx = /^(export)/;
    const start: number | undefined = script
      .findIndex((element) => exportRegEx.test(element));

    const end: number | undefined = script.lastIndexOf("}");

    if (typeof start !== "number" || typeof end !== "number") {
      throw `There was an error while identifying the exported instance inside ${current.label}.vue`;
    }

    const exports = script
      .slice(start + 1, end)
      .join("")
      .replace(/(\s)/g, "");

    return this.style({ ...current, split, name, script: exports });
  } catch (error) {
    console.error("Error inside of Parser.script:", { error });
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
      throw "an error occured access split property of " + current.label;
    }
    const open: number | undefined = current.split.indexOf("<style>");
    const close: number | undefined = current.split.indexOf("</style>");

    if (open < 0 || close < 0) return this.instance({ ...current });

    if (typeof open !== "number" || typeof close !== "number") {
      return this.instance({ ...current });
    }

    const style: string | undefined = current.split
      .slice(open + 1, close)
      .join("")
      .replace(/(\s)/g, "");

    return this.instance({ ...current, style });
  } catch (error) {
    console.error("Error inside of Parser.style:", { error });
  }
};

/**
 * instance method writes the appropriate vue instance to prep for build
 * @params: current = component object;
 */
Parser.prototype.instance = function (current: component) {
  try {
    const { label, name, template, script, style } = current;

    if (!label || !name || !template || !script || !style) {
      throw `There was an error identifying data from ${current.label}`;
    }

    if (label === this.root.label) {
      const instance: string =
        `\nvar ${label} = new Vue({template: \`${template}\`,${script}});\n`;

      this.root = { label, name, instance, style };
      return this.root;
    } else {
      const instance: string =
        `\nvar ${label} = Vue.component("${name}", {template: \`${template}\`,${script}});`;

      this.cache[label] = { label, name, instance, style };

      if (!this.cache[label]) {
        throw `There was an error writing ${label} to the cache`;
      }

      return this.cache[label];
    }
  } catch (error) {
    console.error("Error inside of Parser.instance:", { error });
  }
};

/**
 * mount method finishes the build by writing the Application mount & root instance
 * @params: the root component object and buildPath from build method
 */
Parser.prototype.mount = async function (root: component, buildPath: string) {
  try {
    const mount =
      `\n${root.label}.$mount("#${root.name}");\nexport default ${root.label};\n`;

    if (this.root.instance) {
      await Deno.writeTextFile(buildPath, this.root.instance, { append: true });
    } else throw `${this.root.label} is missing an instance property`;

    await Deno.writeTextFile(buildPath, mount, { append: true });

    return true;
  } catch (error) {
    console.error("Error inside of Parser.mount:", { error });
  }
};

/**
   * build method will iterate through the cache and write the
   * components as Vue instances into a single file for production.
   */
Parser.prototype.build = async function () {
  try {
    await ensureDir("./vno-build");
    const buildPath = "./vno-build/build.js";
    const stylePath = "./vno-build/style.css";

    const ignore = `/* eslint-disable */\n// prettier-ignore\n`;
    const vue = `import Vue from '${this.vue}';\n`;

    if (await exists(buildPath)) await Deno.remove(buildPath);
    await Deno.writeTextFile(buildPath, ignore + vue, { append: true });

    if (await exists(stylePath)) await Deno.remove(stylePath);
    await Deno.writeTextFile(stylePath, this.root.style, { append: true });

    await Object.keys(this.cache)
      .forEach(
        async (child) => {
          const { instance } = this.cache[child];

          if (!instance) {
            throw `${this.cache[child].label} is missing it's instance data`;
          }
          await Deno.writeTextFile(buildPath, instance, { append: true });

          if (this.cache[child].style) {
            const { style } = this.cache[child];
            await Deno.writeTextFile(stylePath, style, { append: true });
          }
        },
      );

    const mounted = await this.mount(this.root, buildPath);

    if (mounted) return print();
    else {
      throw `an error occured mounting your application's root`;
    }
  } catch (error) {
    return console.error(`Error inside of Parser.build:`, { error });
  }
};

/**
   * parse is an async method that will be invoked with the application root
   * to begin app parsing. Parse calls all vno methods.
   * @param root ;; a component object { name, path }
   */
Parser.prototype.parse = async function () {
  while (this.queue.length) {
    const current: component = this.queue.shift();
    const cached = await this.init(current);

    if (!cached) {
      throw `There was an error parsing ${current.label}`;
    }
  }
  const ready = await this.build();

  if (ready) return this.cache;
};

export default Parser;
