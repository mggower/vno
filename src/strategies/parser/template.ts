import { component } from "../../lib/types.ts";
import Parser from "./script.ts";

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
    console.error("Error inside of template()=>:", { error });
  }
};

export default Parser;
