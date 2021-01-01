import { ComponentInterface } from "../../../lib/types.ts";
import Utils, { Queue, Root, Storage } from "../../../lib/utils.ts";

import SiblingList from "../../sibling.ts";

function traverseTreePreorder(current: ComponentInterface, label: string) {
  if (current.child) {
    // console.log(`before:${current.child.head}`);
    const test = current.child.scrub(label);
    // console.log(`after:${current.child.head}`);
    console.log("scrub return", test);
  }
  if (current.child?.head) traverseTreePreorder(current.child.head, label);
  if (current.sibling) {
    traverseTreePreorder(current.sibling, label);
  }
}

const parseScript = function pS(current: ComponentInterface) {
  try {
    if (current.split) {
      const { split } = current;

      const open: number = split.indexOf("<script>");
      const close: number = split.indexOf("</script>");

      if (open < 0 || close < 0) {
        console.warn(`warn: no found <script> in ${current.path}`);
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
            console.log(`foundChildren Length: ${foundChildren.length}`);

            Queue.push(component);
            traverseTreePreorder(Root[0], component.label);
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
