import Compiler from "./compiler.ts";

import { ParserInterface } from "../lib/types.ts";
import { Queue, Storage } from "../lib/utils.ts";

import fn from "./parser-utils/_fn.ts";

// #region Parser
// (2/3) in bundling cycle -> Parser invokes Compiler
// #endregion
function Parser(this: ParserInterface) {
  Queue.push(Storage.root);
}

// parse is responsible for invoking all the parser-utils
// functions for each component in the Queue.
Parser.prototype.parse = function () {
  // iterate through the Queue while it is populated
  while (Queue.length) {
    const current = Queue.shift();

    if (current) {
      fn.parseTemplate(current);
      fn.parseScript(current);
      fn.parseStyle(current);
      fn.componentStringify(current);
      current.isParsed = true;
    }
  }
  // return a new instance of Compiler and run the build method
  return new (Compiler as any)().build();
};

export default Parser;
