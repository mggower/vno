import Compiler from "./compiler.ts";

import { ParserInterface } from "../lib/types.ts";
import { Queue, Storage } from "../lib/utils.ts";
import { colors, parse } from "../lib/deps.ts";

import fn from "./parser-utils/_fn.ts";

// #region Parser
// (2/3) in bundling cycle -> Parser invokes Compiler
// #endregion
function Parser(this: ParserInterface) {
  Queue.push(Storage.root);
}

// parse is responsible for invoking all the parser-utils
// functions for each component in the Queue.
Parser.prototype.parse = async function () {
  // iterate through the Queue while it is populated
  while (Queue.length) {
    const current = Queue.shift();
    // normalize source
    const sourceRaw = current?.split
      ?.join("");

    const astSource = parse(
      sourceRaw,
      { filename: `${current?.label}.vue`, sourceMap: false },
    );

    if (current) {
      console.log(
        colors.green(
          `[vno: compiling] => ${colors.yellow(current.path as string)}`,
        ),
      );

      // show static analysis errors
      if (astSource.errors.length) {
        console.log(colors.red("\nstatic analysis Error:"));
        astSource.errors.forEach((error: string) => {
          console.error(error);
        });
      }

      else {
        fn.parseTemplate(current, astSource.descriptor.template);
        await fn.parseScript(current, astSource.descriptor.script);
        fn.parseStyle(current, astSource.descriptor.styles);
        fn.componentStringify(current);
        current.isParsed = true;
      }
    }
  }
  // return a new instance of Compiler and run the build method
  return new (Compiler as any)().build();
};

export default Parser;
