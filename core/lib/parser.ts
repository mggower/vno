import type { Cmpt } from "../dts/factory.d.ts";
import * as utils from "../utils/utils.ts";
import * as resolver from "./resolver.ts";
import { patterns } from "./constants.ts";
import { _, colors, scssCompiler, sfcCompiler } from "./deps.ts";

export const template: Cmpt.Parser = function (curr) {
  let template = curr.temp_data.content;
  template = utils.removeCarriageReturn(template).replace(
    patterns.htmlComment,
    "",
  );
  curr.template = template;
};

export const script: Cmpt.Parser = async function (curr, storage, queue) {
  let script = curr.script_data.content;

  // prevent to cut urls like http://, https://, ftp:// or file://
  const scriptArr: string[] = script
    .split("\n")
    .map((line: string) => {
      const comment = line.indexOf("//");
      if (comment !== -1) {
        if (!line.match(patterns.url)) {
          return line.slice(0, comment);
        }
      }
      return line;
    });

  script = await resolver._script(
    scriptArr,
    curr.path,
    curr.script_data.lang === "ts",
  );
  
  const middlecode = curr.script_data.attrs?.load
    ? await resolver._middlecode(curr, script)
    : undefined;

  resolver._dependants(curr, scriptArr, storage, queue);

  if (middlecode) curr.middlecode = middlecode;
  curr.script = script;
};

export const style: Cmpt.Parser = function (curr) {
  if (!curr.style_data.length) return;
  let styles = curr.style_data[0].content;

  styles = styles.replace(patterns.multilineComment, "");

  if (curr.style_data[0].lang === "scss") {
    try {
      styles = scssCompiler(styles);
    } catch (error) {
      console.error(colors.yellow("\n[Scss compiler]:"));
      console.error(colors.red("Syntax error within styles\n"));
      console.log(colors.green(
        sfcCompiler.generateCodeFrame(utils.removeCarriageReturn(styles)),
      ));
    }
  }
  curr.styles = styles;
};
