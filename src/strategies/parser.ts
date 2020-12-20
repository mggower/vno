import { _CDN } from "../lib/defaults.ts";
import { component, parser } from "../lib/types.ts";
import Builder from "./builder.ts";
/**
 * parser object interface vno contains the methods used during the parsing
 * process. all methods are called inside of 'parse', which then constructs
 * our cache of components and are sent through the build process.
 */
/**
 * The queue is used to line up component files that have not yet been parsed.
 * After parsing, the componet object is pushed into the cache for build.
 */

function Parser(this: parser, root: component, queue: [], vue: string = _CDN) {
  this.queue = queue;
  this.root = root;
  this.cache = {};
  this.vue = vue;
}

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
    let start: number | undefined = script
      .findIndex((element) => exportRegEx.test(element));

    let end: number | undefined = script.lastIndexOf("}");

    if (typeof start !== "number" || typeof end !== "number") {
      throw `There was an error while identifying the exported instance inside ${current.label}.vue`;
    }

    const exports = script
      .slice(start + 1, end)
      .join("")
      .replace(/(\s)/g, "");

    const componentRegEx = /(components:)/;
    start = script.findIndex((element) => componentRegEx.test(element));
    const fromComp = script.slice(start + 1);
    end = fromComp.findIndex((el) => el.includes("}"));
    // end = fromComp.indexOf("}");
    console.log("SLICDCOMPON", fromComp);
    console.log("sliceddd", fromComp.slice(0, end));

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

    // if (!label || !name || !template || !script || !style) {
    //   throw `There was an error identifying data from ${current.label}`;
    // }

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

  const write = new (Builder as any)(this.root, this.cache);

  return write.build();
};

export default Parser;
