import {
  Component,
  SibList,
  Storage
} from "../lib/newtypes.ts";
import SiblingList from "./sibling_list.ts";
import { _, colors, scssCompiler, sfcCompiler } from "../lib/deps.ts";
import Utils, {
  middleCodeResolver,
  removeCarriageReturn,
  ShowCodeFrame,
  TsCompile,
} from "../lib/utils.ts";
export default class Cmpnt implements Component {
  public type: "composite" | "primitive";
  public stage: "init" | "template" | "script" | "styles" | "parsed";
  public isRoot: boolean;
  public label: string;
  public path: string;
  public name: string | null;
  public vue: string | null;
  public sourceRaw: string;
  public split: string[];
  public child: SibList | null;
  public sibling: Component | null;
  public template: string | null;
  public script: string | null;
  public middlecode: string | null;
  public style: string | null;
  public instance: string | null;
  public isParsed: boolean;
  constructor(label: string, path: string) {
    this.label = label;
    this.path = path;
    this.sourceRaw = Deno.readTextFileSync(path);
    this.split = this.sourceRaw.split(/\n/);
    this.type = "primitive";
    this.stage = "init";
    this.name = null;
    this.sibling = null;
    this.template = null;
    this.script = null;
    this.middlecode = null;
    this.style = null;
    this.instance = null;
    this.child = null;
    this.vue = null;
    this.isRoot = false;
    this.isParsed = false;
  }

  public saveAsRoot(vue: string): void {
    this.vue = vue;
    this.isRoot = true;
  }

  public saveAsParent(): void {
    this.type = "composite";
    this.child = new SiblingList();
  }

  public async parseComponent(storage: Storage, queue: Component[]) {
    const astSource = sfcCompiler.parse(this.sourceRaw, {
      filename: `${this.label}.vue`,
      sourceMap: false,
    });

    console.log(
      colors.green(
        `[vno: compiling] => ${colors.yellow(this.path as string)}`,
      ),
    );

    if (astSource.errors.length) {
      ShowCodeFrame(astSource.descriptor, astSource.errors);
    } // isolate the parts
    else {
      this.parseTemplate(astSource.descriptor.template);
      await this.parseScript(
        astSource.descriptor.script,
        storage,
        queue,
      );
      this.parseStyle(astSource.descriptor.styles);
      this.componentStringify();
    }
  }

  public parseTemplate(ast: any) {
    const close = Utils
      .indexOfRegExp(/<\/template>/gi, this.split as string[]);
    // remove /r & <!-- --> from template
    this.template = removeCarriageReturn(ast.content)
      .replace(Utils.htmlCommentPattern, "");

    this.split.slice(close + 1);
  }

  public async parseScript(
    analysis: any,
    storage: Storage,
    queue: Component[],
  ) {
    const open = Utils.indexOfRegExp(/<script.*>/gi, this.split);
    const close = Utils.indexOfRegExp(/<\/script>/gi, this.split);

    if (open < 0 || close < 0) {
      console.warn(
        `warn: no found <script> in ${this.path}`,
      );
    }

    // prevent to cut urls like http://, https://, ftp:// or file://
    let scriptArr: string[] = this.split
      .slice(open + 1, close)
      .map((line) => {
        if (!Utils.urlPattern.test(line)) {
          const comment = line.indexOf("//");
          if (comment > 0) return line.slice(0, comment);
        }
        return line;
      });

    this.setComponentName(scriptArr);

    await this.resolveScript(scriptArr, analysis.lang === "ts");

    this.middlecode = analysis.attrs?.load
      ? await middleCodeResolver(this) as string
      : null;

    // locate if this component has any children
    const componentsStart = Utils.indexOfRegExp(
      /^\s*(components\s*:)/gm,
      scriptArr,
    );
    const children = scriptArr.slice(componentsStart) || false;

    this.stage = "script";

    if (children) {
      this.attachChildren(children, storage, queue);
    }
  }

  public attachChildren(
    children: string[],
    storage: Storage,
    queue: Component[],
  ) {
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
    const childComponents: Component[] = iter.map((child: string) =>
      storage[child]
    );

    this.saveAsParent();

    while (childComponents.length) {
      const component = childComponents.pop() as Component;
      if (component === undefined) continue;

      if (!component.isParsed) queue.push(component);
      Utils.preorderScrub(component.label, this, storage);
      this.child?.add(component);
    }
  }

  public parseStyle(styles: any) {
    const open = Utils.indexOfRegExp(/<style.*>/gi, this.split);
    const close = Utils.indexOfRegExp(/<\/style>/gi, this.split);
    // return if the component has no added styling
    if (open < 0 || close < 0) return;
    // stringify, trim, and save style to component object
    this.style = styles[0].content.replace(
      Utils.multilineCommentPattern,
      "",
    );

    if (styles[0].lang === "scss") {
      try {
        this.style = scssCompiler(this.style as string);
      } // show codeframe of the error
      catch (error: any) {
        console.error(colors.yellow("\n[Scss compiler]:"));
        console.error(colors.red("Syntax error within styles\n"));
        console.log(
          colors.green(
            sfcCompiler.generateCodeFrame(
              removeCarriageReturn(this.style as string),
            ),
          ),
        );
      }
    }

    this.stage = "styles";
    return;
  }

  public componentStringify() {
    if (this.isRoot) {
      this.instance = `${this.middlecode ??
        ""}\nconst ${this.label} = new Vue({template: /* html */\n\`${this.template}\`, ${this.script}});\n`;
    } else {
      this.instance = `${this.middlecode ??
        ""}\nconst ${this.label} = Vue.component("${this.name}", {template: /* html */\n\`${this.template}\`,\n ${this.script}});\n`;
    }

    this.isParsed = true;
    return;
  }

  public setComponentName(data: string[]) {
    const nameIndex = Utils.indexOfRegExp(/^\s*(name\s*:)/, data);
    if (nameIndex < 0) return _.kebabCase(this.label);
    this.name = data[nameIndex].split(/[`'"]/)[1];
  }

  public async resolveScript(data: string[], tsCheck: boolean) {
    const exportStart = Utils.indexOfRegExp(/^\s*(export)/, data);
    const exportEnd = data.lastIndexOf("}");
    // isolate script data from export
    const trimmed = Utils.sliceAndTrim(data, exportStart + 1, exportEnd);

    let script = tsCheck /** transform typescript to javascript */
      ? await TsCompile(`({ ${trimmed} })`, this.path) as string
      : trimmed;

    // remove comments /* */ in script and style tag's
    this.script = script.replace(Utils.multilineCommentPattern, "") as string;
  }
}
