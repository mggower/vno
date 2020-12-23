import { ComponentInterface } from "../../../lib/types.ts";
import Utils, { Queue, Storage } from "../../../lib/utils.ts";

import SiblingList from "../../sibling.ts";

const parseScript = function pS(current: ComponentInterface) {
  try {
    if (current.split) {
      const { split } = current;

      const open: number | undefined = split.indexOf("<script>");
      const close: number | undefined = split.indexOf("</script>");

      if (typeof open !== "number" || typeof close !== "number") {
        throw `There was an error isolating content inside of <script> tags for ${current.label}.vue`;
      }

      const script = split.slice(open + 1, close);

      if (!script) {
        throw `There was an error while reading through the script tag in ${current.label}.vue`;
      }

      const nameIndex = Utils.indexOfRegExp(/(name)/, script);

      if (nameIndex < 0) {
        throw `There was an error while identifying the name property inside ${current.label}.vue`;
      }

      current.name = script[nameIndex].split(/[`'"]/)[1];

      const exportStart = Utils.indexOfRegExp(/^(export)/, script);
      const exportEnd: number | undefined = script.lastIndexOf("}");

      if (typeof exportStart !== "number" || typeof exportEnd !== "number") {
        throw `There was an error while identifying the exported instance inside ${current.label}.vue`;
      }

      current.script = Utils.sliceAndTrim(script, exportStart + 1, exportEnd);

      const cmpsStart = Utils.indexOfRegExp(/(components:)/, script);
      const children = cmpsStart > 0 && script.slice(cmpsStart);

      if (children) {
        const cmpsEnd = children.findIndex((element) => element.includes("}"));
        const cmpsString = Utils.sliceAndTrim(children, 0, cmpsEnd + 1);

        const foundChildren = cmpsString
          .slice(cmpsString.indexOf("{") + 1, cmpsString.indexOf("}"))
          .replace(/\s/g, "")
          .split(",")
          .filter((el) => el)
          .map((child) => Storage[child]);

        current.child = new (SiblingList as any)();

        while (foundChildren.length) {
          const component: ComponentInterface | undefined = foundChildren.pop();

          if (component) {
            Queue.push(component);
            current.child?.add(component);
          }
        }
      }
    }

    return "parseScript()=> successful";
  } catch (error) {
    console.error("Error inside of Parser.script:", { error });
  }
};

export default parseScript;
