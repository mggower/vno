import { Factory } from './types/interfaces.ts';
import Component from "../factory/Component.ts";
import { colors } from "./deps.ts";
import { Prs } from "./types/interfaces.ts";
import { sfcCompiler } from "../lib/deps.ts";

export function indexOfRegExp(regex: RegExp, array: any[]) {
  return array.findIndex((element) => regex.test(element));
}

interface SaT {
  (
    array: any[],
    start: number,
    end: number,
    regex?: RegExp,
    replaced?: string,
  ): string;
}

export const sliceAndTrim: SaT = function (
  array,
  start,
  end,
  regex = /(\s{2,})/g,
  replaced = " ",
) {
  return array.slice(start, end).join("").replace(regex, replaced);
};

export const trimAndSplit = function (
  str: string,
  start: number,
  end: number,
  split: string = ",",
  regex: RegExp = /\s/g,
  replaced: string = "",
) {
  return str.slice(start, end).replace(regex, replaced).split(split);
};

export function memoize() {
  const cache = {} as Factory.Storage;
  return (label: string, current: Component, storage: Factory.Storage) => {
    if (cache[label]) {
      scrub(cache[label], label);
    } else {
      scrub(storage.root, label);
    }
    cache[label] = current;
  };
}

function scrub(component: Component, label: string) {
  if (component.dependants) component.dependants.scrub(label);
  if (component.dependants?.head) scrub(component.dependants.head, label);
  if (component.sibling) scrub(component.sibling, label);
}

export const preorderScrub = memoize();

export const multilineCommentPattern =
  /\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\//gm;
export const htmlCommentPattern = /<!--([\s\S]*?)-->/gm;
export const importPattern =
  /import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*$/gm;
export const urlPattern =
  /(ftp|http|https|file):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gm;

export const removeCarriageReturn = (text: string) => (
  text.split("\r").filter((text) => text !== "\r").join("\n")
);

interface typeCompile {
  (source: string, path: string, cut?: boolean): Promise<string>;
}
// compile typescript code to string javascrit code
export const TsCompile: typeCompile = async function TsCompile(
  source: string,
  path: string,
  cut = true,
) {
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
  } catch (error: any) {
    await Deno.remove(temp, { recursive: true });
    console.log(error);
    throw new Error(
      colors.red(
        `Typescript compilation Error in ${colors.yellow(path)}`,
      ),
    );
  }
};

export function ShowCodeFrame(content: any, errors?: any) {
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
  } // show component error
  else {
    const messages = new Set();
    console.log(
      colors.red(`\nComponent Error in: ${colors.green(filename)}\n`),
    );
    errors.forEach((error: any) => {
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