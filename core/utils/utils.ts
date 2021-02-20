import * as types from "../lib/types.ts";
import { sfcCompiler } from "../lib/deps.ts";
import { colors } from "../lib/deps.ts";

export const indexOfRegExp: types.iore = (
  regex,
  array,
) => (array.findIndex((element) => regex.test(element)));

export const sliceAndTrim: types.sat = (
  array,
  start,
  end,
  regex = /(\s{2,})/g,
  replaced = " ",
) => (array.slice(start, end).join("").replace(regex, replaced));

export const trimAndSplit: types.tas = (
  str,
  start,
  end,
  split = ",",
  regex = /\s/g,
  replaced = "",
) => (str.slice(start, end).replace(regex, replaced).split(split));

function memoize() {
  const cache = {} as types.container;
  return (label: string, current: types.Component, storage: types.Storage) => {
    if (cache[label]) {
      scrub(cache[label], label);
    } else {
      scrub(storage.root, label);
    }
    cache[label] = current;
  };
}

function scrub(component: types.Component, label: string) {
  if (component.dependants) component.dependants.scrub(label);
  if (component.dependants?.head) scrub(component.dependants.head, label);
  if (component.sibling) scrub(component.sibling, label);
}

export const preorderScrub = memoize();

export const patterns = {
  multilineComment: /\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\//gm,
  htmlComment: /<!--([\s\S]*?)-->/gm,
  import:
    /import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*$/gm,
  url:
    /(ftp|http|https|file):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gm,
};

export const removeCarriageReturn: (text: string) => string = (text) => (
  text.split("\r").filter((text) => text !== "\r").join("\n")
);

// compile typescript code to string javascrit code
export const TsCompile: types.tc = async (source, path, cut = true) => {
  const temp = `./${Math.random().toString().replace(".", "")}.ts`;
  try {
    const file = await Deno.create(temp);
    const encoder = new TextEncoder();

    await file.write(encoder.encode(source));

    const { files } = await Deno.emit(temp, {
      bundle: undefined,
      check: true,
      compilerOptions: { strict: false },
    });

    // filter javascript output
    const [script] = Object.entries(files).flat().filter((chunk) =>
      !chunk.includes("file:///")
    );

    await Deno.remove(temp, { recursive: true });

    return (cut ? script.substring(3, script.length - 4) : script);

    // return files;
  } catch (error) {
    await Deno.remove(temp, { recursive: true });
    console.log(error);
    throw new Error(
      colors.red(
        `Typescript compilation Error in ${colors.yellow(path)}`,
      ),
    );
  }
};

export function ShowCodeFrame(content: types.desc, errors?: []) {
  const { filename, source, template } = content;

  const templateAnalysis = sfcCompiler.compileTemplate(
    { source: removeCarriageReturn(template.content), filename },
  );

  // detect if the error is in the template
  if (templateAnalysis.errors.length) {
    console.log(colors.red(`\nTemplate Error in: ${colors.green(filename)}\n`));
    templateAnalysis.errors.forEach((error) => {
      console.log(colors.yellow(`${error.toString()}\n`));
    });
    console.log(
      colors.green(
        sfcCompiler.generateCodeFrame(
          (templateAnalysis.source as string).trimStart(),
        ),
      ),
    );
    // show component error
  } else {
    const messages = new Set();
    console.log(
      colors.red(`\nComponent Error in: ${colors.green(filename)}\n`),
    );
    errors?.forEach((error: string) => {
      // do not show the same message twice
      messages.add(`${error.toString()}`);
    });
    console.log(colors.yellow([...messages].join("\n")));
    console.log(colors.yellow("\n"));
    // show code frame
    console.log(
      colors.green(sfcCompiler.generateCodeFrame(removeCarriageReturn(source))),
    );
  }
}
