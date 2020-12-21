import { indexOfRegExp, sarahJessicaParker } from "../../../lib/funx.ts";
import { ComponentInterface } from "../../../lib/types.ts";

import SiblingList from "../../sibling.ts";
import Storage from "../../storage.ts";
import Queue from "../../queue.ts";

const parseScript = function pS(current: ComponentInterface) {
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

    const nameIndex = indexOfRegExp(/(name)/, script);

    if (nameIndex < 0) {
      throw `There was an error while identifying the name property inside ${current.label}.vue`;
    }

    current.name = script[nameIndex].split(/[`'"]/)[1];

    const exportStart = indexOfRegExp(/^(export)/, script);
    const exportEnd: number | undefined = script.lastIndexOf("}");

    if (typeof exportStart !== "number" || typeof exportEnd !== "number") {
      throw `There was an error while identifying the exported instance inside ${current.label}.vue`;
    }

    current.script = sarahJessicaParker(script, exportStart + 1, exportEnd, /(\s)/g);

    const cmpsStart = indexOfRegExp(/(components:)/, script);
    const children = cmpsStart > 0 && script.slice(cmpsStart);

    if (children) {
      const cmpsEnd = children.findIndex((element) => element.includes("}"));
      const cmpsString = sarahJessicaParker(children, 0, cmpsEnd + 1, /(\s)/g);

      const foundChildren = cmpsString
        .slice(cmpsString.indexOf("{") + 1, cmpsString.indexOf("}"))
        .split(",")
        .filter((el) => el)
        .map((child) => Storage[child]);

      current.child = new (SiblingList as any)();

      while (foundChildren.length) {
        const child: ComponentInterface | undefined = foundChildren.pop();

        if (child) {
          Queue.push(child);
          current.child?.add(child);
        }
      }
    }

    return "parseScript()=> successful";
  } catch (error) {
    console.error("Error inside of Parser.script:", { error });
  }
};

export default parseScript;
