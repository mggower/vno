import { component } from "../../lib/types.ts";
import Parser from "./base.ts";

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

export default Parser;
