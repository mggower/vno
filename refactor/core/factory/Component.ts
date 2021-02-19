import { App, Factory } from "../lib/types/interfaces.ts";
import { _, colors, scssCompiler, sfcCompiler } from "../lib/deps.ts";
import utils, {
  middleCodeResolver,
  removeCarriageReturn,
  ShowCodeFrame,
  TsCompile,
} from "../lib/utils.ts";
export default class Primitive implements App.Primitive {
  public type: "primitive" | "composite";
  public sourceRaw: string;
  public split: string[];
  public name: string | null;
  public sibling: App.Component | null;
  public template: string | null;
  public script: string | null;
  public middlecode: string | null;
  public style: string | null;
  public instance: string | null;
  public isParsed: boolean;
  constructor(public label: string, public path: string) {
    this.type = "primitive";
    this.label = label;
    this.path = path;
    this.sourceRaw = Deno.readTextFileSync(path);
    this.split = this.sourceRaw.split(/\n/);
    this.name = null;
    this.sibling = null;
    this.template = null;
    this.script = null;
    this.middlecode = null;
    this.style = null;
    this.instance = null;
    this.isParsed = false;
  }

  async parseComponent(
    storage: Factory.Storage,
    queue: Factory.Queue,
  ): Promise<void> {
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
    const close = utils
      .indexOfRegExp(/<\/template>/gi, this.split as string[]);
    // remove /r & <!-- --> from template
    this.template = removeCarriageReturn(ast.content)
      .replace(utils.htmlCommentPattern, "");

    this.split.slice(close + 1);
  }

  public async parseScript(
    analysis: any,
    storage: Factory.Storage,
    queue: Factory.Queue,
  ) {
    const open = utils.indexOfRegExp(/<script.*>/gi, this.split);
    const close = utils.indexOfRegExp(/<\/script>/gi, this.split);

    if (open < 0 || close < 0) {
      console.warn(
        `warn: no found <script> in ${this.path}`,
      );
    }

    // prevent to cut urls like http://, https://, ftp:// or file://
    let scriptArr: string[] = this.split
      .slice(open + 1, close)
      .map((line) => {
        if (!utils.urlPattern.test(line)) {
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
    const componentsStart = utils.indexOfRegExp(
      /^\s*(components\s*:)/gm,
      scriptArr,
    );
    const children = scriptArr.slice(componentsStart) || false;

    this.stage = "script";

    if (children) {
      this.attachChildren(children, storage, queue);
    }
  }
  parseStyle(styles: any): void {
    throw new Error("Method not implemented.");
  }
  componentStringify(): void {
    throw new Error("Method not implemented.");
  }
  setComponentName(data: string[]): void {
    throw new Error("Method not implemented.");
  }
  resolveScript(data: string[], tsCheck: boolean): void {
    throw new Error("Method not implemented.");
  }
}
