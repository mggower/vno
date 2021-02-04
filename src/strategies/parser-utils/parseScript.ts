import Utils, {
  middleCodeResolver,
  Queue,
  Storage,
  TsCompile,
} from "../../lib/utils.ts";
import {
  ComponentInterface,
  ParentInterface,
  ScriptInterface,
  TemplateInterface,
} from "../../lib/types.ts";
import { _ } from "../../lib/deps.ts";
import { saveAsParent } from "../component.ts";
import SiblingList from "../sibling.ts";

// parseScript is responsible for parsing the data inside a files <script> tag
async function parseScript(
  current: TemplateInterface,
  analysis: any,
): Promise<ScriptInterface> {
  let name;
  let script: string;
  let newComponent;
  // isolate the content inside of <script>
  const open: number = Utils.indexOfRegExp(/<script.*>/gi, current.split);
  const close: number = Utils.indexOfRegExp(/<\/script>/gi, current.split);

  if (open < 0 || close < 0) {
    console.warn(
      `warn: no found <script> in ${current.path}`,
    );
  }

  // prevent to cut urls like http://, https://, ftp:// or file://
  let scriptArr: string[] = current.split.slice(open + 1, close).map((line) => {
    if (!Utils.urlPattern.test(line)) {
      const comment = line.indexOf("//");
      if (comment > 0) return line.slice(0, comment);
    }
    return line;
  });
  // identify if a name property is provided
  const nameIndex = Utils.indexOfRegExp(/^\s*(name\s*:)/, scriptArr);
  // if no name property, save the label in kebab-case as the name
  if (nameIndex < 0) {
    name = _.kebabCase(current.label);
  } else {
    name = scriptArr[nameIndex].split(/[`'"]/)[1];
  }
  // isolate the data inside of an export statement
  const exportStart = Utils.indexOfRegExp(/^\s*(export)/, scriptArr);
  const exportEnd = scriptArr.lastIndexOf("}");

  // returns a stringified and trimmed version of our components script
  script = Utils.sliceAndTrim(scriptArr, exportStart + 1, exportEnd);
  let middlecode = null as unknown;
  // load all middle code inside a component
  if (analysis.attrs?.load) {
    middlecode = await middleCodeResolver(current);
  }
  // transform typescript to javascript
  if (analysis.lang === "ts") {
    script = await TsCompile(`({ ${script} })`, current.path) as string;
  }

  // remove comments /* */ in script and style tag's
  script = script.replace(Utils.multilineCommentPattern, "");

  // locate if this component has any children
  const componentsStart = Utils.indexOfRegExp(
    /^\s*(components\s*:)/gm,
    scriptArr,
  );
  const children = scriptArr.slice(componentsStart) || false;

  newComponent = {
    ...current,
    name,
    script,
    middlecode: middlecode || null,
  };
  // if a component's property is identified
  if (children) newComponent = attachChildren(newComponent, children);

  return newComponent;
}

function attachChildren(
  current: ScriptInterface,
  children: string[],
): ParentInterface {
  const componentsEnd = children.findIndex((el: any) => el.includes("}")) + 1;
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
  let parent = saveAsParent(current);

  while (childComponents.length) {
    // iterate through childComponents
    const component = childComponents.pop();

    if (component) {
      // add component to the Queue if it has not been parsed
      if (!component.isParsed) Queue.push(component);
      // iterate through the tree to secure the component dependency tree
      Utils.preorderScrub(component.label, parent);
      // attach the component as a dependency to its parent
      parent.child.add(component);
    }
  }
  return {
    ...current,
    ...parent,
  };
}
export default parseScript;
