import { Component, Composite, Parsed, Storage } from "../lib/newtypes.ts";
import { _, colors, scssCompiler, sfcCompiler } from "../lib/deps.ts";
import Utils, {
  middleCodeResolver,
  removeCarriageReturn,
  ShowCodeFrame,
  TsCompile,
} from "../lib/utils.ts";
import { saveAsParent } from "./component.ts";

async function parseApplication(storage: Storage): Promise<Storage> {
  const parsedApp = {} as Storage;

  const queue = [] as Component[];
  queue.push(storage.root);

  while (queue.length) {
    const current = queue.shift();

    if (current === undefined) {
      throw new Error("help");
    }

    if (current.isRoot) {
      parsedApp.root = await parseComponent(current, storage, queue);
    } else {
      parsedApp[current.label] = await parseComponent(current, storage, queue);
    }
  }

  return parsedApp as Storage;
}

async function parseComponent(
  component: Component,
  storage: Storage,
  queue: Component[],
): Promise<Parsed> {
  let current = component;
  
  const astSource = sfcCompiler.parse(current.sourceRaw, {
    filename: `${current?.label}.vue`,
    sourceMap: false,
  });

  console.log(
    colors.green(
      `[vno: compiling] => ${colors.yellow(current.path as string)}`,
    ),
  );

  if (astSource.errors.length) {
    ShowCodeFrame(astSource.descriptor, astSource.errors);
  } // isolate the parts
  else {
    current = parseTemplate(current, astSource.descriptor.template);
    current = await parseScript(
      current,
      astSource.descriptor.script,
      storage,
      queue,
    );
    current = parseStyle(current, astSource.descriptor.styles);
    current = componentStringify(current);
  }
 
  return {
    ...current,
    isParsed: true,
  } as Parsed;
}

// parseTemplate is responsible for parsing template tags
function parseTemplate(current: Component, ast: any): Component {
  if (isValidComponent(current) === false) {
    throw new TypeError("template parser recieved invalid component");
  }

  const close = Utils
    .indexOfRegExp(/<\/template>/gi, current.split as string[]);

  const template = removeCarriageReturn(ast.content)
    .replace(Utils.htmlCommentPattern, ""); // remove /r & <!-- --> from template

  const split = current.split.slice(close + 1);

  return {
    ...current,
    template,
    split,
    stage: "template",
  };
}

// parseScript is responsible for parsing the data inside a files <script> tag
async function parseScript(
  current: Component,
  analysis: any,
  storage: Storage,
  queue: Component[],
): Promise<Component> {
  // isolate the content inside of <script>
  const open = Utils.indexOfRegExp(/<script.*>/gi, current.split);
  const close = Utils.indexOfRegExp(/<\/script>/gi, current.split);

  if (open < 0 || close < 0) {
    console.warn(
      `warn: no found <script> in ${current.path}`,
    );
  }

  // prevent to cut urls like http://, https://, ftp:// or file://
  let scriptArr: string[] = current.split
    .slice(open + 1, close)
    .map((line) => {
      if (!Utils.urlPattern.test(line)) {
        const comment = line.indexOf("//");
        if (comment > 0) return line.slice(0, comment);
      }
      return line;
    });

  const name = setComponentName(current, scriptArr);
  const script = await resolveScript(
    current,
    scriptArr,
    analysis.lang === "ts",
  );
  const middlecode = analysis.attrs?.load
    ? await middleCodeResolver(current) as string
    : null;

  // locate if this component has any children
  const componentsStart = Utils.indexOfRegExp(
    /^\s*(components\s*:)/gm,
    scriptArr,
  );
  const children = scriptArr.slice(componentsStart) || false;

  const newComponent = {
    ...current,
    name,
    script,
    middlecode,
    stage: "script",
  } as Component;

  return (children
    ? attachChildren(newComponent, children, storage, queue)
    : newComponent) as Component;
}

function attachChildren(
  current: Component,
  children: string[],
  storage: Storage,
  queue: Component[],
): Composite {
  // componentsStr is stringified and trimmed components property
  const componentsEnd = children.findIndex((el: any) => el.includes("}")) + 1;
  const componentsStr = Utils.sliceAndTrim(children, 0, componentsEnd);

  // iter becomes a string[] of any child component's label
  const iter: string[] = _.compact(
    Utils.trimAndSplit(
      componentsStr,
      componentsStr.indexOf("{") + 1,
      componentsStr.indexOf("}"),
    ),
  );
  // childComponents retrieves component objects
  const childComponents: Component[] = iter.map((child: string) =>
    storage[child]
  );

  let parent = saveAsParent(current);

  // add component to the queue if it has not been parsed
  // iterate through the tree to secure the component dependency tree
  // attach the component as a dependency to its parent
  while (childComponents.length) {
    const component = childComponents.pop() as Component;
    if (component === undefined) continue;
    if (!component.isParsed) queue.push(component);
    Utils.preorderScrub(component.label, parent, storage);
    parent.child.add(component);
  }

  return {
    ...current,
    ...parent,
  };
}

// parseStyle is responsible for parsing data inside of <style> tags
function parseStyle(current: Component, styles: any): Component {
  // isolate the content inside <style>
  const open = Utils.indexOfRegExp(/<style.*>/gi, current.split);
  const close = Utils.indexOfRegExp(/<\/style>/gi, current.split);
  // return if the component has no added styling
  if (open < 0 || close < 0) {
    return current;
  }
  // stringify, trim, and save style to component object
  let style = styles[0].content.replace(
    Utils.multilineCommentPattern,
    "",
  );

  if (styles[0].lang === "scss") {
    try {
      style = scssCompiler(style as string);
    } // show codeframe of the error
    catch (error: any) {
      console.error(colors.yellow("\n[Scss compiler]:"));
      console.error(colors.red("Syntax error within styles\n"));
      console.log(
        colors.green(
          sfcCompiler.generateCodeFrame(
            removeCarriageReturn(style as string),
          ),
        ),
      );

      return current;
    }
  }

  return {
    ...current,
    style,
    stage: "styles",
  };
}

// #region componentStringify
// is responsible for using a component's parsed data and
// compiling it into a vue "instance" in javascript to be
// written to the build
// #endregion
// application root is written as a new Vue instance
// all children components are registered to the instance

function componentStringify(current: Component): Parsed {
  if (isComponentParsed(current) === false) {
    throw new TypeError("failed to parse component");
  }

  const {
    label,
    name,
    template,
    script,
    middlecode,
  } = current;

  let instance;

  if (current.isRoot) {
    instance = `${middlecode ??
      ""}\nconst ${label} = new Vue({template: /* html */\n\`${template}\`, ${script}});\n`;
  } else {
    instance = `${middlecode ??
      ""}\nconst ${label} = Vue.component("${name}", {template: /* html */\n\`${template}\`,\n ${script}});\n`;
  }

  return {
    ...current,
    instance,
    isParsed: true,
  } as Parsed;
}

// identify if a name property is provided
// if no name property, save the label in kebab-case as the name
function setComponentName(current: Component, data: string[]): string {
  const nameIndex = Utils.indexOfRegExp(/^\s*(name\s*:)/, data);
  if (nameIndex < 0) return _.kebabCase(current.label);
  return data[nameIndex].split(/[`'"]/)[1];
}

// returns a stringified and trimmed version of our components script
async function resolveScript(
  current: Component,
  data: string[],
  tsCheck: boolean,
): Promise<string> {
  const exportStart = Utils.indexOfRegExp(/^\s*(export)/, data);
  const exportEnd = data.lastIndexOf("}");
  // isolate script data from export
  const trimmed = Utils.sliceAndTrim(data, exportStart + 1, exportEnd);

  let script = tsCheck /** transform typescript to javascript */
    ? await TsCompile(`({ ${trimmed} })`, current.path) as string
    : trimmed;

  // remove comments /* */ in script and style tag's
  return script.replace(Utils.multilineCommentPattern, "") as string;
}

function isValidComponent(obj: unknown): obj is Component {
  return obj !== null &&
    typeof (obj as Component).label === "string" &&
    typeof (obj as Component).split === "object";
}

function isComponentParsed(obj: unknown): obj is Component {
  return obj !== null &&
    typeof (obj as Component).name === "string" &&
    typeof (obj as Component).template === "string" &&
    typeof (obj as Component).script === "string" &&
    typeof (obj as Component).style === "string";
}

export default parseApplication;
