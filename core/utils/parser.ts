import * as utils from "./utils.ts";
import * as types from "../lib/types.ts";
import * as resolver from "./resolver.ts";
import { _, colors, scssCompiler, sfcCompiler } from "../lib/deps.ts";

export const template: types.gen = function (curr) {
  let template = curr.temp_data.content;
  template = utils.removeCarriageReturn(template).replace(
    utils.patterns.htmlComment,
    "",
  );
  curr.template = template;
};

export const script: types.scrpt = async function (curr, storage, queue) {
  let script = curr.script_data.content;

  // prevent to cut urls like http://, https://, ftp:// or file://
  const scriptArr: string[] = script
    .split("\n")
    .map((line: string) => {
      if (!utils.patterns.url.test(line)) {
        const comment = line.indexOf("//");
        if (comment > 0) {
          return line.slice(0, comment);
        }
      }
      return line;
    });

  script = await resolver._script(
    scriptArr,
    curr.script_data.lang === "ts",
    curr.path,
  );

  const middlecode = curr.script_data.attrs?.load
    ? await resolver._middlecode(curr, script)
    : null;

  resolver._dependants(curr, scriptArr, storage, queue);
  
  curr.middlecode = middlecode;
  curr.script = script;
};

export const style: types.gen = function (curr) {
  if (!curr.style_data.length) return;
  let styles = curr.style_data[0].content;

  styles = styles.replace(utils.patterns.multilineComment, "");

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

export const stringify: types.str = function (curr, storage) {
  let instance = "none";
  if (curr.parsed_data) {
    if (curr === storage.root) {
      instance = `${curr.parsed_data.middlecode ??
        ""}\nconst ${curr.label} = new Vue({\n  /* html */\n  template: \`${curr.parsed_data.template}\`, ${curr.parsed_data.script}});\n`;
    } else {
      instance = `${curr.parsed_data.middlecode ??
        ""}\nconst ${curr.label} = Vue.component("${curr.name}", {\n  /* html */\n  template: \`${curr.parsed_data.template}\`,\n ${curr.parsed_data.script});\n`;
    }
  }
  curr.instance = instance;
  return instance;
};
