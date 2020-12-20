import { ComponentInterface } from "../../lib/types.ts";
import Parser from "./instance.ts";

/**
   * style parses through <style> tags, and then
   * adds to the 'style' property on component object
   * @param data ;; collected data sourced from file
   * @param current ;; the current active component object
   */

Parser.prototype.style = function (current: ComponentInterface) {
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

export default Parser;
