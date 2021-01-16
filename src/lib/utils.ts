import {
  ComponentInterface,
  StorageInterface,
  UtilityInterface,
} from "../lib/types.ts";
import { asrt, colors, sfcCompiler } from "../lib/deps.ts";

// #region memoize
// memoize is used to cache child components that
// have already been "scrubbed" in preorderScrub
// #endregion
export function memoize() {
  // #region memoize cache
  // cache stores the label of the component that was "scrubbed"
  // and its value is the "current" or parent component that
  // it was last attached to.
  // #endregion
  const cache: StorageInterface = {};
  // #region "scrubbed" conditions
  // if the 'label' argument is located in the cache, invoke
  // scrub with the last parent component, and the label as
  // arguments; otherwise, invoke scrub from the root
  // #endregion
  return (label: string, current: ComponentInterface) => {
    if (cache[label]) {
      scrub(cache[label], label);
    } else {
      scrub(Storage.root, label);
    }
    cache[label] = current;
  };
}
// scrub mimics a preorder tree traversal
function scrub(component: ComponentInterface, label: string) {
  if (component.child) component.child.scrub(label);
  if (component.child?.head) scrub(component.child.head, label);
  if (component.sibling) scrub(component.sibling, label);
}
// the Queue is used to sequence child components to be parsed
export const Queue: ComponentInterface[] = [];
// the Storage holds a reference to all components
export const Storage: StorageInterface = {};

// global utility functions
const utils: UtilityInterface = {
  // #region preorderScrub
  // traverses the component tree, and repositions components to a
  // higher place in the tree to secure the component hierarchy
  // #endregion
  preorderScrub: memoize(),

  // prompt is used in the command line to write i/o to users
  async prompt(msg: string = "") {
    const buf = new Uint8Array(1024);
    await Deno.stdout.write(new TextEncoder().encode(`${msg}: `));
    const n = <number> await Deno.stdin.read(buf);
    return new TextDecoder().decode(buf.subarray(0, n)).trim();
  },

  // indexOfRegExp accepts a regex and an array and returns a number;
  indexOfRegExp(regex: RegExp, array: any[]) {
    return array.findIndex((element) => regex.test(element));
  },

  // #region sliceAndTrim
  // sliceAndTrim accepts an array, start index(inclusive), end index(exclusive)
  // optional regular expression to replace with optional string
  // slices an array, joins it as a string, and then replaces characters
  // the default behavior is to remove unnecessary whitespace from strings
  // #endregion
  sliceAndTrim(
    array: any[],
    start: number,
    end: number,
    regex: RegExp = /(\s{2,})/g,
    replaced: string = " ",
  ) {
    return array.slice(start, end).join("").replace(regex, replaced);
  },

  // #region trimAndSplit
  // accepts a string, a start index(inclusive), an end index(exclusive)
  // optional: char to split at, regex char and string
  // default behavior is to slice a string, split it into an array
  // and remove all white space
  // #endregion
  trimAndSplit(
    str: string,
    start: number,
    end: number,
    split: string = ",",
    regex: RegExp = /\s/g,
    replaced: string = "",
  ) {
    return str.slice(start, end).replace(regex, replaced).split(split);
  },
  multilineCommentPattern: /\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\//gm,
  htmlCommentPattern: /<!--([\s\S]*?)-->/gm,
  importPattern: /import(?:["'\s]*([\w*${}\n\r\t, ]+)from\s*)?["'\s]["'\s](.*[@\w_-]+)["'\s].*$/gm,
  urlPattern: /(ftp|http|https|file):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gm,
};

// compile typescript code to string javascrit code
export async function TsCompile(source: string, path: string, cut = true) {
  const temp = `./${Math.random().toString().replace(".", "")}.ts`;
  try {
    const file = await Deno.create(temp);
    const encoder = new TextEncoder();

    await file.write(encoder.encode(source));

    const [, outPut] = await Deno.compile(
      temp,
      undefined,
      { strict: false },
    );

    // filter javascript output
    const [script] = Object.entries(outPut).flat().filter((chunk) =>
      !chunk.includes("file:///")
    );

    await Deno.remove(temp, { recursive: true });

    return cut ? script.substring(3, script.length - 4) : script;
  } catch (error: any) {
    await Deno.remove(temp, { recursive: true });
    throw new Error(
      colors.red(
        `Typescript compilation Error in ${colors.yellow(path)}`,
      ),
    );
  }
}

export async function importResolver(
  source: string,
  path: string,
  script: string,
) {
  const temp = `./${Math.random().toString().replace(".", "")}.ts`;
  try {
    // pack if it is an external call
    if (source.trim() !== "" && utils.importPattern.test(source.trim())) {
      const file = await Deno.create(temp);
      const encoder = new TextEncoder();

      // add component code to bundler detect resource call's
      await file.write(encoder.encode(`${source} ({ ${script} })`));

      const [diagnostic, output] = await Deno.bundle(
        temp,
        undefined,
        { strict: false },
      );

      // show bundler diagnostic
      if (diagnostic?.length) {
        diagnostic.forEach((file) => {
          console.log(
            colors.yellow("[vno warn] => "),
            colors.green(file.messageText ?? ""),
          );
        });
      }

      // remove temp file
      await Deno.remove(temp, { recursive: true });

      // remove component object
      return output.replace(/\(\{((?:.|\r?\n)+?)\}\);/gm, "");
    }

    // ignore if not is a external call 'import ....'
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

// takes all the intermediate code in a component and injects it on top of the components bundle
export async function middleCodeResolver(
  { split, path, script }: ComponentInterface,
) {
  const tagPattern = /<script.*>/gim;

  let endLine = false;
  const chunks: string[] = [];
  const imports: string[] = [];
  for (const chunk of (split as string[])) {
    if ((/export default/gm).test(chunk)) {
      endLine = true;
    }

    // ignore imports like .vue
    if (
      !endLine &&
      !tagPattern.test(chunk) &&
      !chunk.includes(".vue")
    ) {
      if (utils.importPattern.test(chunk)) {
        // TODO: resolve and inject all imports that not is a component .vue or is a import_map.json call
        imports.push(chunk);
      } else {
        chunks.push(chunk);
      }
    }
  }

  const compilerOutPut = await TsCompile(
    chunks.join("\n"),
    path as string,
    false,
  );

  // merge componet code with external and component middlecode
  const output = await importResolver(
    `${imports.join("\n")}\n${compilerOutPut}`,
    path as string,
    script as string,
  );

  // bundler + compiler output
  return output;
}

// replate '\r' with a '\n'
export const removeCarriageReturn = (text: string) =>
  text.split("\r").filter((text) => text !== "\r").join("\n");

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
      // not show the same message twice
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
export default utils;
