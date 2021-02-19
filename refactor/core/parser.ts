import * as utils from "./utils/utils.ts";
import { Prs } from "./lib/types/interfaces.ts";
import * as resolver from "./resolver.ts";
import { _, colors, scssCompiler, sfcCompiler } from "./lib/deps.ts";

export const template: Prs.gen = function (curr) {
  let template = curr.temp_data.content;
  template = utils.removeCarriageReturn(template).replace(
    utils.patterns.htmlComment,
    "",
  );
  curr.parsed_data = { ...curr.parsed_data, template };
};

export const script: Prs.scrpt = async function (curr, storage, queue) {
  let script = curr.script_data.content;

  // prevent to cut urls like http://, https://, ftp:// or file://
  let script_arr: string[] = script
    .split("\n")
    .map((line) => {
      if (!utils.patterns.url.test(line)) {
        const comment = line.indexOf("//");
        if (comment > 0) {
          return line.slice(0, comment);
        }
      }
      return line;
    });

  script = await resolver._script(
    script_arr,
    curr.script_data.lang === "ts",
    curr.path,
  );

  let middlecode = curr.script_data.attrs?.load
    ? await resolver._middlecode(curr, script)
    : null;

  resolver._dependants(curr, script_arr, storage, queue);
  curr.parsed_data = { ...curr.parsed_data, script, middlecode };
};

export const style: Prs.gen = function (curr) {
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
  curr.parsed_data = { ...curr.parsed_data, styles };
};

export const stringify: Prs.str = function (curr, storage) {
  let instance = "none";
  if (curr.parsed_data) {
    if (curr === storage.root) {
      instance = `${curr.parsed_data.middlecode ??
        ""}\nconst ${curr.label} = new Vue({\n  /* html */\n  template: \`${curr.parsed_data.template}\`, ${curr.parsed_data.script}});\n`;
    } else {
      instance = `${curr.parsed_data.middlecode ??
        ""}\nconst ${curr.label} = Vue.component("${curr.name}", {\n  /* html */\n  template: \`${curr.parsed_data.template}\`,\n ${curr.parsed_data.script});\n`;
    }
    curr.parsed_data = { ...curr.parsed_data, instance };
  }
  return instance;
};
