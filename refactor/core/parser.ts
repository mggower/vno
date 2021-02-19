import * as utils from "./utils/utils.ts";
import { Prs } from "./lib/types/interfaces.ts";
import { _, colors, scssCompiler, sfcCompiler } from "./lib/deps.ts";
import Component from "./factory/Component.ts";
import DepsList from "./factory/DepsList.ts";
// import { TsCompile } from "../../src/lib/utils.ts";

export const template: Prs.gen = function (curr) {
  let template = curr.temp_data.content;
  template = utils.removeCarriageReturn(template).replace(
    utils.htmlCommentPattern,
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
      if (!utils.urlPattern.test(line)) {
        const comment = line.indexOf("//");
        if (comment > 0) {
          return line.slice(0, comment);
        }
      }
      return line;
    });

  script = await resolveScript(
    script_arr,
    curr.script_data.lang === "ts",
    curr.path,
  );

  let middlecode = curr.script_data.attrs?.load
    ? await middleCodeResolver(curr, script)
    : null;

  curr.parsed_data = { ...curr.parsed_data, script, middlecode };
  checkDependants(curr, script_arr, storage, queue);
};

export const style: Prs.gen = function (curr) {
  if (!curr.style_data.length) return;
  let styles = curr.style_data[0].content;

  styles = styles.replace(utils.multilineCommentPattern, "");

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
  let instance = 'none';
  if (curr.parsed_data) {
    if (curr === storage.root) {
      instance = `${curr.parsed_data.middlecode ??
        ""}\nconst ${curr.label} = new Vue({template: /* html */\n\`${curr.parsed_data.template}\`, ${curr.parsed_data.script}});\n`;
    } else {
      instance = `${curr.parsed_data.middlecode ??
        ""}\nconst ${curr.label} = Vue.component("${curr.name}", {template: /* html */\n\`${curr.parsed_data.template}\`,\n ${curr.parsed_data.script}});\n`;
    }
    curr.parsed_data = { ...curr.parsed_data, instance };
  }
  return instance;
};

const resolveScript: Prs.rS = async function (data, tsCheck, path) {
  const start = utils.indexOfRegExp(/^\s*(export)/, data);
  const end = data.lastIndexOf("}");

  const trimmed = utils.sliceAndTrim(data, start + 1, end);
  let script = tsCheck
    ? await utils.TsCompile(`({ ${trimmed} })`, path)
    : trimmed;

  script = script.replace(utils.multilineCommentPattern, "");

  return script;
};

const checkDependants: Prs.cD = function (curr, arr, storage, queue) {
  // locate if this component has any children
  const start = utils.indexOfRegExp(/^\s*(components\s*:)/gm, arr);
  if (start < 0) return;

  const children = arr.slice(start);

  const end = children.findIndex((el) => el.includes("}")) + 1;
  const components_str = utils.sliceAndTrim(children, 0, end);

  const iter: string[] = _.compact(
    utils.trimAndSplit(
      components_str,
      components_str.indexOf("{") + 1,
      components_str.indexOf("}"),
    ),
  );

  const dependants: Component[] = iter.map((child: string) =>
    storage.app[child]
  );

  curr.dependants = new DepsList();

  while (dependants.length) {
    const component = dependants.pop();

    if (component) {
      if (!component.is_parsed) queue.enqueue(component);
      utils.preorderScrub(component.label, curr, storage);
      curr.dependants.add(component);
    }

  }
};

const middleCodeResolver: Prs.mCR = async function (curr, script) {
  let data = curr.script_data.content.split("\n");
  let endLine = false;

  const tagPattern = /<script.*>/gim;
  const chunks: string[] = [];
  const imports: string[] = [];

  for (const chunk of data) {
    if ((/export default/gm).test(chunk)) {
      endLine = true;
      // break; ???
    }

    if (
      !endLine &&
      !tagPattern.test(chunk) &&
      !chunk.includes(".vue")
    ) {
      if (utils.importPattern.test(chunk)) {
        imports.push(chunk);
        // TODO: resolve and inject all imports that not is a component .vue or is a import_map.json call
      } else {
        chunks.push(chunk);
      }
    }
  }

  const compilerOutPut = await utils
    .TsCompile(chunks.join("\n"), curr.path, false);

  // merge component code with external and component middlecode
  const output = await importResolver(
    `${imports.join("\n")}\n${compilerOutPut}`,
    curr.path,
    script,
  );

  // bundler + compiler output
  return output;
};

export async function importResolver(
  source: string,
  path: string,
  script: string,
) {
  const temp = `./${Math.random().toString().replace(".", "")}.ts`;
  try {
    // saves import statements from external sources
    if (source.trim() !== "" && utils.importPattern.test(source.trim())) {
      const file = await Deno.create(temp);
      const encoder = new TextEncoder();

      // add component code to bundler when external source calls exist
      await file.write(encoder.encode(`${source} ({ ${script} })`));

      const { files, diagnostics } = await Deno.emit(temp, {
        bundle: "esm",
        check: true,
        compilerOptions: { strict: false },
      });

      // show bundler diagnostic
      if (diagnostics?.length) {
        diagnostics.forEach((file) => {
          console.log(
            colors.yellow("[vno warn] => "),
            colors.green(file.messageText ?? ""),
          );
        });
      }

      let out = "";
      for (const script in files) {
        out += files[script];
      }
      // remove temp file
      await Deno.remove(temp, { recursive: true });

      // remove component object
      return out.replace(/\(\{((?:.|\r?\n)+?)\}\);/gm, "");
    }

    // ignore if import statement is not from external source
    return source;
  } catch (error: any) {
    await Deno.remove(temp, { recursive: true });
    throw new Error(
      colors.red(
        `Resolve bundler Error in ${colors.yellow(path)}`,
      ),
    );
  }
}
