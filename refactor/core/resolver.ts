import * as utils from "./utils/utils.ts";
import { App, Rslvr } from "./lib/types/interfaces.ts";
import DepsList from "./factory/DepsList.ts";
import { _, colors } from "./lib/deps.ts";

export const _script: Rslvr.scr = async function (data, tsCheck, path) {
  const start = utils.indexOfRegExp(/^\s*(export)/, data);
  const end = data.lastIndexOf("}");
  
  const trimmed = utils.sliceAndTrim(data, start + 1, end);
  let script = tsCheck
    ? await utils.TsCompile(`({ ${trimmed} })`, path)
    : trimmed;
  
  script = script
    .replace(utils.patterns.multilineComment, "")
    .slice(0, script.lastIndexOf(";"));

  return script;
};

export const _dependants: Rslvr.dep = function (curr, arr, storage, queue) {
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

  const dependants: App.Component[] = iter.map((child: string) =>
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

export const _middlecode: Rslvr.mid = async function (curr, script) {
  let data = curr.script_data.content.split("\n");
  let endLine = false;

  const tagPattern = /<script.*>/gim;
  const chunks: string[] = [];
  const imports: string[] = [];

  for (const chunk of data) {
    if ((/export default/gm).test(chunk)) {
      endLine = true;
    }

    if (
      !endLine &&
      !tagPattern.test(chunk) &&
      !chunk.includes(".vue")
    ) {
      if (utils.patterns.import.test(chunk)) {
        imports.push(chunk);
        // TODO: resolve and inject all imports that not is a component .vue or is a import_map.json call
      } else {
        chunks.push(chunk);
      }
    }
  }

  const compilerOutPut = await utils
    .TsCompile(chunks.join("\n"), curr.path, false);

  const output = await _imports(
    `${imports.join("\n")}\n${compilerOutPut}`,
    curr.path,
    script,
  );

  return output;
};

export const _imports: Rslvr.imp = async function (source, path, script) {
  const temp = `./${Math.random().toString().replace(".", "")}.ts`;
  try {
    // saves import statements from external sources
    if (
      source.trim() !== "" &&
      utils.patterns.import.test(source.trim())
    ) {
      const file = await Deno.create(temp);
      const encoder = new TextEncoder();

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
};
