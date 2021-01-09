import { ComponentInterface } from "../../lib/types.ts";
import Utils, { Queue, Storage } from "../../lib/utils.ts";
import { _ } from "../../lib/deps.ts";

import SiblingList from "../sibling.ts";

// parseScript is responsible for parsing the data inside a files <script> tag
export default function parseScript(current: ComponentInterface) {
  try {
    if (current.split) {
      const { split } = current;

      // isolate the content inside of <script>
      const open: number = split.indexOf("<script>");
      const close: number = split.indexOf("</script>");

      if (open < 0 || close < 0) {
        console.warn(
          `warn: no found <script> in ${current.path}`,
        );
      }

      const script = split.slice(open + 1, close).map((line) => {
        const comment = line.indexOf("//");
        if (comment > 0) return line.slice(0, comment);
        return line;
      });

      console.log(`script: (parseScriptln27) ${script}`);

      // identify if a name property is provided
      const nameIndex = Utils.indexOfRegExp(/(name)/, script);
      // if no name property, save the label in kebab-case as the name
      if (nameIndex < 0) {
        current.name = _.kebabCase(current.label);
      } else {
        current.name = script[nameIndex].split(/[`'"]/)[1];
      }
      // isolate the data inside of an export statement
      const exportStart = Utils.indexOfRegExp(/^(export)/, script);
      const exportEnd = script.lastIndexOf("}");
      // returns a stringifed and trimmed version of our components script

      current.script = Utils.sliceAndTrim(script, exportStart + 1, exportEnd);
      // script.slice(exportStart + 1, exportEnd).join("\n")
      // .replace(/(\s{2,})/g, " ");

      // Utils.sliceAndTrim(script, exportStart + 1, exportEnd);

      // locate if this component has any children
      const componentsStart = Utils.indexOfRegExp(/(components:)/, script);
      const children = script.slice(componentsStart) || false;

      // if a component's property is identified
      if (children) {
        const componentsEnd = children.findIndex((el) => el.includes("}")) + 1;
        // componentsStr is stringified and trimmed components property
        const componentsStr = Utils.sliceAndTrim(children, 0, componentsEnd);

        // iter becomes a string[] of any child component's label
        const iter: string[] = _.compact(
          Utils.trimAndSplit(
            componentsStr,
            componentsStr.indexOf("{") + 1,
            componentsStr.indexOf("}"),
          ),
        );
        // childComponents looks in Storage to retrieve an array of all component objects
        const childComponents = iter.map((child: string) => Storage[child]);
        // instantiate a new SiblingList on the current components child property
        current.child = new (SiblingList as any)();

        while (childComponents.length) {
          // iterate through childComponents
          const component = childComponents.pop();

          if (component) {
            // add component to the Queue if it has not been parsed
            if (!component.isParsed) Queue.push(component);
            // iterate through the tree to secure the component dependency tree
            Utils.preorderScrub(component.label, current);
            // attach the component as a dependency to its parent
            current.child?.add(component);
          }
        }
      }
    }
  } catch (error) {
    console.error(
      "Error inside of Parser.script:",
      { error },
    );
  }
}
