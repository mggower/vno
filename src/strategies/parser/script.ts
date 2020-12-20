import { component } from "../../lib/types.ts";
import Parser from "./style.ts";


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

export default Parser;
