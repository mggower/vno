import { Queue, ShowCodeFrame, Storage } from "../lib/utils.ts";
import { colors, sfcCompiler } from "../lib/deps.ts";
import { ParserInterface } from "../lib/types.ts";
import fn from "./parser-utils/_fn.ts";
import Compiler from "./compiler.ts";

/** Parser
    (2/3) in bundling cycle -> Parser invokes Compiler */
class Parser implements ParserInterface {
  constructor() {
    Queue.push(Storage.root);
  }
  /** parse is responsible for invoking all the parser-utils
      functions for each component in the Queue.*/
  public async parse(): Promise<void> {
    // iterate through the Queue while it is populated
    while (Queue.length) {
      let current = Queue.shift();

      // parse component
      const astSource = sfcCompiler.parse(
        current?.sourceRaw,
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
          ShowCodeFrame(astSource.descriptor, astSource.errors);
        } // isolate the parts
        else {
          current = fn.parseTemplate(current, astSource.descriptor.template);
          current = await fn.parseScript(current, astSource.descriptor.script);
          current = fn.parseStyle(current, astSource.descriptor.styles);
          current = fn.componentStringify(current);
          current.isParsed = true;
        }
      }
    }
    // return a new instance of Compiler and run the build method
    return new Compiler().build();
  }
}

export default Parser;
