import { component } from "../../lib/types.ts";
import Parser from "./template.ts";

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

export default Parser;
