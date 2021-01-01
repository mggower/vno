import { ComponentInterface } from "../../lib/types.ts";
import Utils, { Queue, Storage } from "../../lib/utils.ts";

import SiblingList from "../sibling.ts";

const parseScript = function pS(current: ComponentInterface) {
  try {
    if (current.split) {
      const { split } = current;

      const open: number = split.indexOf("<script>");
      const close: number = split.indexOf("</script>");

      if (open < 0 || close < 0) {
        console.warn(
          `warn: no found <script> in ${current.path}`,
        );
      }

      const script = split.slice(open + 1, close);

      const nameIndex = Utils.indexOfRegExp(/(name)/, script);
      if (nameIndex < 0) current.name = Utils.toKebab(current.label);
      else current.name = script[nameIndex].split(/[`'"]/)[1];

      const exportStart = Utils.indexOfRegExp(/^(export)/, script);
      const exportEnd: number = script.lastIndexOf("}");
      current.script = Utils.sliceAndTrim(script, exportStart + 1, exportEnd);

      const componentsStart = Utils.indexOfRegExp(/(components:)/, script);
      const children = componentsStart > 0 && script.slice(componentsStart);

      if (children) {
        const componentsEnd = children.findIndex((element) =>
          element.includes("}")
        );
        const componentsString = Utils.sliceAndTrim(
          children,
          0,
          componentsEnd + 1,
        );

        const foundChildren = componentsString
          .slice(
            componentsString.indexOf("{") + 1,
            componentsString.indexOf("}"),
          )
          .replace(/\s/g, "")
          .split(",")
          .filter((el) => el)
          .map((child) => Storage[child]);

        current.child = new (SiblingList as any)();

        while (foundChildren.length) {
          const component = foundChildren.pop();

          if (component) {
            Queue.push(component);

            Utils.preorderScrub(Storage.root, component.label);
            current.child?.add(component);
          }
        }
      }
    }

    return "parseScript()=> successful";
  } catch (error) {
    console.error(
      "Error inside of Parser.script:",
      { error },
    );
  }
};

export default parseScript;
