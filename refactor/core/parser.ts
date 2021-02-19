import utils, { removeCarriageReturn } from "./lib/utils.ts";
import { App, Factory } from "./lib/types/interfaces.ts";

interface temp {
  (curr: App.Component, ast: any): void;
}

export const template: temp = function (curr, ast) {
  const close = utils.indexOfRegExp(/<\/template>/gi, curr.split as string[]);
  // remove /r & <!-- --> from template
  curr.template = removeCarriageReturn(ast.content)
    .replace(utils.htmlCommentPattern, "");

  curr.split = curr.split.slice(close + 1);
};

interface scr {
  (
    curr: App.Component,
    analysis: any,
    storage: Factory.Storage,
    queue: Factory.Queue,
  ): void;
}

export const script: scr = function (curr, analysis, storage, queue) {
    const open = utils.indexOfRegExp(
      /<script.*>/gi, curr.split
    );
    const close = utils.indexOfRegExp(
      /<\/script>/gi, curr.split
    );

    if (open < 0 || close < 0) {
      console.warn(
        `warn: no found <script> in ${curr.path}`,
      );
    }

    // prevent to cut urls like http://, https://, ftp:// or file://
    let scriptArr: string[] = curr.split
      .slice(open + 1, close)
      .map((line) => {
        if (!utils.urlPattern.test(line)) {
          const comment = line.indexOf("//");
          if (comment > 0) return line.slice(0, comment);
        }
        return line;
      });

    curr.name = setComponentName(scriptArr);
    curr.script = await resolveScript(scriptArr, analysis.lang === "ts")
    curr.middlecode = analysis.attrs?.load
      ? await middleCodeResolver(this) as string
      : null;

    // locate if this component has any children
    const componentsStart = utils.indexOfRegExp(
      /^\s*(components\s*:)/gm,
      scriptArr,
    );
    const children = scriptArr.slice(componentsStart) || false;

    if (children) {
      curr.child = attachChildren(children, storage, queue);
    }
}