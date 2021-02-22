import { Cmpt } from "../dts/factory.d.ts";
import { VueCDN } from "../lib/constants.ts";
import { _, colors, scssCompiler, sfcCompiler } from "../lib/deps.ts";
import { resolver, utils } from "./vno.utils.ts";


export const template: Cmpt.Parser = function (curr) {
  let template = curr.temp_data.content;
  template = utils.removeCarriageReturn(template).replace(
    utils.patterns.htmlComment,
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

export const toJavaScript: Cmpt.Parser = function (curr, storage) {
  if (!storage) {
    throw new TypeError("invalid arguments");
  }
  let instance;
  if (curr.parsed_data) {
    switch (storage.vue) {
      case VueCDN.Vue3:
        if (curr === storage.root) {
          instance = `${curr.middlecode ??
            ""}\nconst app = Vue.createApp({\n  /* html */\n  template: \`${curr.template}\`, ${curr.script}});\n`;
        } else {
          instance = `${curr.middlecode ??
            ""}\n app.component("${curr.name}", {\n  /* html */\n  template: \`${curr.template}\`,\n ${curr.script});\n)`;
        }
        break;
      case VueCDN.Vue2:
        if (curr === storage.root) {
          instance = `${curr.middlecode ??
            ""}\nconst ${curr.label} = new Vue({\n  /* html */\n  template: \`${curr.template}\`, ${curr.script}});\n`;
        } else {
          instance = `${curr.middlecode ??
            ""}\nconst ${curr.label} = Vue.component("${curr.name}", {\n  /* html */\n  template: \`${curr.template}\`,\n ${curr.script});\n`;
        }
        break;
      default:
        throw new Error("missing a valid VUE CDN");
    }
  }

  curr.instance = instance;
  return instance;
};
